const { merge } = require("webpack-merge");
const globalConfig = require("./webpack.config.js");

// printing warning details to catch where throw it
process.traceDeprecation = true;

module.exports = (env) =>
  merge(globalConfig(env), {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      static: {
        directory: "./dist",
      },

      historyApiFallback: true,
    },
  });
