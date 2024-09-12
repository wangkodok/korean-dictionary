const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/search.do?", {
      target: `https://stdict.korean.go.kr`,
      changeOrigin: true,
    })
  );
};
