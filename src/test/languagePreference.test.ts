import { describe, it, expect } from 'vitest';
import {
  resolveLanguageCode,
  getLanguageLabel,
  SUPPORTED_LANGUAGES,
} from '../lib/candidate/languagePreference';

describe('Language Preference Unit Test Suite', () => {
  it('1. Resolves supported language codes accurately', () => {
    expect(resolveLanguageCode('en')).toBe('en');
    expect(resolveLanguageCode('pt')).toBe('pt');
    expect(resolveLanguageCode('PT')).toBe('pt');
  });

  it('2. Falls back to English for null, empty, or unsupported language inputs', () => {
    expect(resolveLanguageCode(null)).toBe('en');
    expect(resolveLanguageCode('')).toBe('en');
    expect(resolveLanguageCode('fr')).toBe('en');
    expect(resolveLanguageCode('es')).toBe('en');
  });

  it('3. Formats human-readable native language labels correctly', () => {
    expect(getLanguageLabel('en')).toBe(SUPPORTED_LANGUAGES.en.nativeLabel);
    expect(getLanguageLabel('pt')).toBe(SUPPORTED_LANGUAGES.pt.nativeLabel);
  });
});
