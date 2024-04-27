module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
  };
};

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ["module:react-native-dotenv", {
//       "envName": "APP_ENV",
//       "moduleName": "@env",
//       "path": ".env",
      
//     }]
//   ]
// };
// module.exports = {
//   resolver: {
//     sourceExts: ['jsx', 'js', 'json', 'ts', 'tsx', 'env'],
//   },
// };
