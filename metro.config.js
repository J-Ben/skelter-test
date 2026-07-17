const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watchman daemon lacks macOS Desktop folder access permission.
// Force Metro to use the node filesystem crawler instead.
config.resolver.useWatchman = false;

// Force Metro to follow symlinks for local dependencies
config.resolver.symlinks = true;

config.resolver.extraNodeModules = {
  'react-zero-skeleton': path.resolve(__dirname, '../react-zero-skeleton'),
  'react': path.resolve(__dirname, 'node_modules/react'),
  'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  'react/compiler-runtime': path.resolve(__dirname, 'node_modules/react/compiler-runtime'),
};

// Force react, react-native and react/compiler-runtime to always resolve
// from the project's node_modules, even when required from the symlinked lib
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'react' ||
    moduleName === 'react-native' ||
    moduleName === 'react/compiler-runtime'
  ) {
    return context.resolveRequest(
      { ...context, originModulePath: __filename },
      moduleName,
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
