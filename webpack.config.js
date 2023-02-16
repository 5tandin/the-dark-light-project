const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { Template } = require("webpack");
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);

module.exports = (env, argv) => {
  const devMode = argv.mode === `development`;

  return {
    entry: path.resolve(__dirname, `src`, "index.js"),
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "main.js",
      clean: true,
    },
    devServer: {
      static: `./dist`,
      watchFiles: [`./src/**/**`],
      open: true,
      hot: true,
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: `index.html`,
        template: `src/pages/index.html`,
      }),
    ].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: [
            devMode ? `style-loader` : MiniCssExtractPlugin.loader,
            `css-loader`,
            `sass-loader`,
          ],
        },
      ],
    },
  };
};
