/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const watchFolders = [path.join(__dirname, '/..')]

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  watchFolders,
}
