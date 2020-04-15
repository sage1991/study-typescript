const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",  // or "production"

  // entry point of application
  entry: "./src/app.ts",

  // configuration for bundled file
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },

  // source map option
  devtool: "none",

  // module option
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },

  // extention of import statement
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  plugins: [
    new CleanPlugin.CleanWebpackPlugin()  // clean output dir when build
  ]
};
