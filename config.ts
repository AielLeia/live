import env from '@/env-loader';

export const config = {
  CLERK_PUBLISHABLE_KEY: env('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  CLERK_SECRET_KEY: env('CLERK_SECRET_KEY'),

  CLERK_SIGN_IN_URL: env('NEXT_PUBLIC_CLERK_SIGN_IN_URL'),
  CLERK_SIGN_UP_URL: env('NEXT_PUBLIC_CLERK_SIGN_UP_URL'),
  CLERK_AFTER_SIGN_IN_URL: env('NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL'),
  CLERK_AFTER_SIGN_UP_URL: env('NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL'),

  CLERK_AFTER_SIGN_OUT_URL: '/',
};
