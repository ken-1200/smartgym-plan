import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/smartgym-plan' : undefined,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
