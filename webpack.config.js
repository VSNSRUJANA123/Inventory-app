const path = require("path");

module.exports = {
  // Other Webpack configurations...
  resolve: {
    fallback: {
      assert: require.resolve("assert/"),
      url: require.resolve("url/"),
    },
  },
  // Other configurations...
};
