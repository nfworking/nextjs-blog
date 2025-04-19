import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  webpack(config: WebpackConfig) {
    config.module?.rules?.forEach((rule) => {
      if (rule && typeof rule === 'object' && 'use' in rule && Array.isArray(rule.use)) {
        rule.use.forEach((u) => {
          if (
            typeof u === 'object' &&
            u?.loader?.includes('postcss-loader')
          ) {
            u.options = {
              ...(typeof u.options === 'object' && u.options !== null ? u.options : {}),
              postcssOptions: {
                config: './postcss.frontend.config.mjs',
              },
            };
          }
        });
      }
    });

    return config;
  },
};

export default nextConfig;
