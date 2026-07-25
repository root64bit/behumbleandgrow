import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRoundCheck, ShieldCheck, Mail, User, Globe, ArrowRight, Loader2 } from 'lucide-react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthInput from '../../components/auth/AuthInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PhoneCountryInput from '../../components/auth/PhoneCountryInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import ConsentGroup from '../../components/auth/ConsentGroup';
import { supabase } from '../../lib/supabase/client';

export default function RegisterPage() {
  const navigate = useNavigate();

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [countryCode, setCountryCode] = useState('+254'); // Default Kenya
  const [nationality, setNationality] = useState('Kenya');
  const [residence, setResidence] = useState('Kenya');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Consent State
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [visaDisclaimerAccepted, setVisaDisclaimerAccepted] = useState(false);
  const [jobAlertsConsent, setJobAlertsConsent] = useState(false);
  const [whatsappConsent, setWhatsappConsent] = useState(true);

  // Status & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify both password fields.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (!visaDisclaimerAccepted) {
      setErrorMessage('Please acknowledge the official UAE visa & employment disclaimer to proceed.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute Real Supabase Auth SignUp
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: `${countryCode}${phone}`,
            nationality,
            residence,
            role: 'candidate',
          },
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      // Automatically seed profile table in PostgreSQL if session or user created
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName,
          email,
          phone: `${countryCode}${phone}`,
          nationality,
          residence,
          status: 'active',
          updated_at: new Date().toISOString(),
        });
      }

      // Navigate to email verification with state
      navigate('/verify-email', { state: { email } });
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeader />

      <div className="text-left space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
          <UserRoundCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Candidate Registration</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Create your candidate account
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Start your UAE opportunity journey by creating a secure account. You can complete your professional profile after registration.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium text-left">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <AuthInput
          label="Full Legal Name"
          required
          icon={User}
          placeholder="e.g. Amina Mabote"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          autoComplete="name"
        />

        {/* Email Address */}
        <AuthInput
          label="Email Address"
          type="email"
          required
          icon={Mail}
          placeholder="amina.mabote@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />

        {/* Mobile Phone */}
        <PhoneCountryInput
          label="Mobile Phone Number"
          required
          phoneValue={phone}
          countryCodeValue={countryCode}
          onPhoneChange={setPhone}
          onCountryCodeChange={setCountryCode}
        />

        {/* WhatsApp Same As Mobile Toggle */}
        <div className="text-left space-y-2">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
            <input
              type="checkbox"
              checked={sameAsMobile}
              onChange={(e) => {
                setSameAsMobile(e.target.checked);
                if (e.target.checked) setWhatsapp('');
              }}
              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
            />
            <span>WhatsApp number is the same as mobile number</span>
          </label>

          {!sameAsMobile && (
            <PhoneCountryInput
              label="WhatsApp Phone Number"
              phoneValue={whatsapp}
              countryCodeValue={countryCode}
              onPhoneChange={setWhatsapp}
              onCountryCodeChange={setCountryCode}
            />
          )}
        </div>

        {/* Nationality & Residence Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Nationality <span className="text-rose-600">*</span>
            </label>
            <select
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 bg-white py-3 px-3 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="Kenya">Kenya 🇰🇪</option>
              <option value="Mozambique">Mozambique 🇲🇿</option>
              <option value="South Africa">South Africa 🇿🇦</option>
              <option value="India">India 🇮🇳</option>
              <option value="Uganda">Uganda 🇺🇬</option>
              <option value="Tanzania">Tanzania 🇹🇿</option>
              <option value="Nigeria">Nigeria 🇳🇬</option>
              <option value="Ghana">Ghana 🇬🇭</option>
              <option value="Other">Other International</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Country of Residence <span className="text-rose-600">*</span>
            </label>
            <select
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              className="w-full text-sm rounded-xl border border-slate-200 bg-white py-3 px-3 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="Kenya">Kenya</option>
              <option value="Mozambique">Mozambique</option>
              <option value="South Africa">South Africa</option>
              <option value="India">India</option>
              <option value="UAE">United Arab Emirates</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Password & Confirm Password */}
        <PasswordInput
          label="Create Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />

        <PasswordStrength password={password} />

        <PasswordInput
          label="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
        />

        {/* Consent Group */}
        <ConsentGroup
          termsAccepted={termsAccepted}
          privacyAccepted={privacyAccepted}
          visaDisclaimerAccepted={visaDisclaimerAccepted}
          jobAlertsConsent={jobAlertsConsent}
          whatsappConsent={whatsappConsent}
          onTermsChange={setTermsAccepted}
          onPrivacyChange={setPrivacyAccepted}
          onVisaDisclaimerChange={setVisaDisclaimerAccepted}
          onJobAlertsChange={setJobAlertsConsent}
          onWhatsappChange={setWhatsappConsent}
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary w-full py-3.5 text-base shadow-md disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Creating Your Account...</span>
            </>
          ) : (
            <>
              <UserRoundCheck className="w-5 h-5" />
              <span>Create My Account</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      </form>

      {/* Login Navigation Link */}
      <div className="pt-2 text-center text-xs text-slate-600">
        <span>Already have a candidate account? </span>
        <Link to="/login" className="font-bold text-emerald-700 hover:underline">
          Log In Here
        </Link>
      </div>

    </div>
  );
}
