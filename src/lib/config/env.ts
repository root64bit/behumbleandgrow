import { z } from "zod";

const booleanString = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

const envSchema = z.object({
  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  VITE_APP_URL: z.string().url().default("http://localhost:5173"),

  VITE_SUPABASE_URL: z.string().url().default("https://acfjjrupcigwjbqcbonw.supabase.co"),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(10).default("sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI"),

  VITE_APPLICATION_FEE_ENABLED: booleanString.default("false"),
  VITE_FIREBASE_MESSAGING_ENABLED: booleanString.default("true"),

  VITE_SQUARE_APP_ID: z.string().optional(),
  VITE_SQUARE_LOCATION_ID: z.string().optional(),
  VITE_SQUARE_ENVIRONMENT: z.enum(["sandbox", "production"]).optional().default("sandbox"),

  VITE_FIREBASE_API_KEY: z.string().optional(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string().optional(),
  VITE_FIREBASE_PROJECT_ID: z.string().optional(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string().optional(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string().optional(),
  VITE_FIREBASE_APP_ID: z.string().optional(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  VITE_FIREBASE_VAPID_KEY: z.string().optional(),
});

const result = envSchema.safeParse(import.meta.env);

if (!result.success) {
  console.error("Invalid application environment configuration.");
  if (import.meta.env.DEV) {
    console.error(result.error.flatten().fieldErrors);
  }
}

export const env = result.success ? result.data : {
  VITE_APP_ENV: "development",
  VITE_APP_URL: "http://localhost:5173",
  VITE_SUPABASE_URL: "https://acfjjrupcigwjbqcbonw.supabase.co",
  VITE_SUPABASE_PUBLISHABLE_KEY: "sb_publishable_mowxTxhcUduTcIiNs0DyNw_e4Z3-QqI",
  VITE_APPLICATION_FEE_ENABLED: false,
  VITE_FIREBASE_MESSAGING_ENABLED: true,
  VITE_SQUARE_ENVIRONMENT: "sandbox" as const,
};
