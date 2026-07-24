import { z } from 'zod';

export const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  countryCode: z.string().length(3, 'Country code must be 3 characters (e.g. MOZ)'),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm password must match'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const candidateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  headline: z.string().max(120).optional(),
  bio: z.string().max(2000).optional(),
  currentLocation: z.string().min(2, 'Current location is required'),
  preferredLocation: z.string().default('UAE'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
});

export const candidateDocumentUploadSchema = z.object({
  documentType: z.enum(['candidate-cv', 'candidate-identity', 'candidate-certificates']),
  fileName: z.string().min(1),
  mimeType: z.enum(['application/pdf', 'image/jpeg', 'image/png']),
  fileSize: z.number().max(10 * 1024 * 1024, 'File size must be under 10MB'),
});

export const applicationSubmissionSchema = z.object({
  jobId: z.string().uuid('Invalid job identifier'),
  screeningAnswers: z.record(z.any()).optional(),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must provide consent to submit your application' }),
  }),
});
