/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_ENV: "development" | "staging" | "production";
  readonly VITE_APP_URL: string;

  readonly VITE_APPLICATION_FEE_ENABLED: "true" | "false";
  readonly VITE_FIREBASE_MESSAGING_ENABLED: "true" | "false";
  readonly VITE_FIRESTORE_ENABLED: "true" | "false";
  readonly VITE_FIREBASE_AUTH_ENABLED: "true" | "false";
  readonly VITE_FIREBASE_STORAGE_ENABLED: "true" | "false";

  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  readonly VITE_SUPABASE_ANON_KEY?: string;

  readonly VITE_SQUARE_APP_ID?: string;
  readonly VITE_SQUARE_LOCATION_ID?: string;
  readonly VITE_SQUARE_ENVIRONMENT?: "sandbox" | "production";

  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID?: string;
  readonly VITE_FIREBASE_VAPID_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
