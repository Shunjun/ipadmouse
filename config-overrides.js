const { override, addPostcssPlugins } = require("customize-cra");
const path = require("path");

const postcssPlugins = [
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer"),
];

const resolve = (dir) => {
  return path.resolve(__dirname, dir);
};

const addCustomize = () => (config) => {
  // config.module.rules.push();

  config.resolve.alias = {
    ...config.resolve.alias,
    "@": resolve("src"),
    "@components": resolve("src/components"),
    "@page": resolve("src/page"),
  };

  config.output.publicPath = "/ipadmouse/";

  return config;
};

module.exports = override(addCustomize());
