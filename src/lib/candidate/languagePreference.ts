export type SupportedLanguageCode = 'en' | 'pt';

export interface LanguageOption {
  code: SupportedLanguageCode;
  label: string;
  nativeLabel: string;
  flagEmoji: string;
}

export const SUPPORTED_LANGUAGES: Record<SupportedLanguageCode, LanguageOption> = {
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English (UK / UAE)',
    flagEmoji: '🇬🇧',
  },
  pt: {
    code: 'pt',
    label: 'Portuguese',
    nativeLabel: 'Português (Moçambique)',
    flagEmoji: '🇲🇿',
  },
};

export function resolveLanguageCode(code?: string | null): SupportedLanguageCode {
  if (!code) return 'en';
  const norm = code.toLowerCase().trim();
  if (norm in SUPPORTED_LANGUAGES) {
    return norm as SupportedLanguageCode;
  }
  return 'en';
}

export function getLanguageLabel(code?: string | null): string {
  const resolved = resolveLanguageCode(code);
  return SUPPORTED_LANGUAGES[resolved].nativeLabel;
}
