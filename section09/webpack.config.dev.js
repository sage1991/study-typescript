const path = require("path");

module.exports = {
  mode: "development",  // or "production"

  // entry point of application
  entry: "./src/app.ts",

  // configuration for bundled file
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },

  // source map option
  devtool: "inline-source-map",

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
};
