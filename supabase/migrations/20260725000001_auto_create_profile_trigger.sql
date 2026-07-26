-- Migration: 20260725000001_auto_create_profile_trigger.sql
-- Description: Automatic profile & candidate record creation trigger on auth.users signups

-- 1. Create handle_new_user trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  cand_role_id UUID;
BEGIN
  -- Insert into public.profiles
  INSERT INTO public.profiles (id, email, full_name, phone, country_code, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'country_code', 'MOZ'),
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone,
    updated_at = NOW();

  -- Insert into public.candidates if role is candidate (or default)
  IF (NEW.raw_user_meta_data->>'role' IS NULL OR NEW.raw_user_meta_data->>'role' = 'candidate') THEN
    INSERT INTO public.candidates (id, stage, verification_status)
    VALUES (NEW.id, 'registered', 'pending')
    ON CONFLICT (id) DO NOTHING;

    -- Assign 'candidate' user role in public.user_roles if role exists
    SELECT id INTO cand_role_id FROM public.roles WHERE name = 'candidate' LIMIT 1;
    IF cand_role_id IS NOT NULL THEN
      INSERT INTO public.user_roles (user_id, role_id)
      VALUES (NEW.id, cand_role_id)
      ON CONFLICT DO NOTHING;
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Bind trigger to auth.users ON INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Add explicit RLS INSERT policy on public.profiles
DO $$ BEGIN
  CREATE POLICY profile_insert_own ON public.profiles
    FOR INSERT TO authenticated
    WITH CHECK (id = auth.uid());
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;
