import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY,
  },
  devIndicators: false,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
};

const withNextIntl = createNextIntlPlugin('./src/shared/configs/i18n/configs/index.ts');
export default withNextIntl(nextConfig);
