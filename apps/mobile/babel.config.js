module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Transform import.meta.env references (zustand v5 devtools uses them)
      function importMetaEnvPlugin() {
        return {
          visitor: {
            MetaProperty(path) {
              // Replace import.meta.env with process.env
              if (
                path.node.meta.name === 'import' &&
                path.node.property.name === 'meta'
              ) {
                const parent = path.parentPath;
                if (
                  parent.isMemberExpression() &&
                  parent.node.property.name === 'env'
                ) {
                  parent.replaceWithSourceString('process.env');
                }
              }
            },
          },
        };
      },
    ],
  };
};
