const { composePlugins, withNx, ProvidePlugin } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    'crypto-browserify': require.resolve('crypto-browserify'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    fs: require.resolve('browserify-fs'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
  };

  config.plugins.push(
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  );
  return config;
});
