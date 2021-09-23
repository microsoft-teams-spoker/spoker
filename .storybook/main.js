module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],

  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      use: [
        // Creates `style` nodes from JS strings
        "style-loader",
        // Translates CSS into CommonJS
        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",
      ],
    });

    // Return the altered config
    return config;
  },
  // babel: async (options) => ({
  //   ...options,
  //   // plugins: ["@babel/plugin-proposal-export-namespace-from"],
  //   // any extra options you want to set
  // }),
  // babel: async (options) => ({
  //   ...options,
  //   // any extra options you want to set
  // }),
}
