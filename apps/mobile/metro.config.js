const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force babel to transform zustand's middleware (contains import.meta.env)
// By default, Metro skips node_modules from babel transforms.
// We need zustand/middleware to be transformed so import.meta gets replaced.
const originalGetTransformOptions = config.transformer?.getTransformOptions;
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
  getTransformOptions: async (...args) => {
    const opts = originalGetTransformOptions ? await originalGetTransformOptions(...args) : {};
    return {
      ...opts,
      transform: {
        ...opts?.transform,
        experimentalImportSupport: true,
      },
    };
  },
};

module.exports = config;
