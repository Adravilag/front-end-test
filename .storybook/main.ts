import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const { default: postcssNested } = await import('postcss-nested');
    
    return {
      ...config,
      css: {
        postcss: {
          plugins: [postcssNested()],
        },
      },
    };
  },
};
export default config;