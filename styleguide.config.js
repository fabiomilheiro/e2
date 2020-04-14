const path = require("path");

module.exports = {
  webpackConfig: require("./config/webpack.config.js"),
  components: "src/components/**/[A-Z]*.jsx",
  //   assetsDir: path.join(__dirname, "static"),
  require: [path.join(__dirname, "src/styles/themes/default/_index.scss")],
};
