const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Allow Metro to resolve npm-linked packages (symlinks)
config.watchFolders = [
  path.resolve(__dirname, '../react-zero-skeleton'),
];

// Only resolve node_modules from the app — prevents Metro from picking up
// react-native internals from react-zero-skeleton/node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

// Block react-zero-skeleton's own node_modules from being traversed
const blockList = config.resolver.blockList;
const skeletonNodeModules = /.*\/react-zero-skeleton\/node_modules\/.*/;
config.resolver.blockList = blockList
  ? Array.isArray(blockList)
    ? [...blockList, skeletonNodeModules]
    : [blockList, skeletonNodeModules]
  : skeletonNodeModules;

module.exports = config;
