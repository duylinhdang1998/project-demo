const rewireWebpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = function override(config, env) {
  // ...

  if (env === 'production') {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    });
  }

  config.plugins = [...config.plugins, new AntdDayjsWebpackPlugin()];

  return config;
};
