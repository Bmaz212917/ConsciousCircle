const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {getMetroConfig} = require('react-native-svg-transformer');

const defaultConfig = getDefaultConfig(__dirname);

// Add the SVG transformer configuration
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

const config = mergeConfig(defaultConfig, svgConfig);

module.exports = config;
