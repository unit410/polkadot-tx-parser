const mjsConfig = (nextConfig = {}) =>
  Object.assign({}, nextConfig, {
    // eslint-disable-next-line no-unused-vars
    webpack(config, options) {
      config.module.rules.push({
        type: 'javascript/auto',
        test: /\.mjs$/,
        use: [],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  });

module.exports = mjsConfig; // eslint-disable-line no-undef
