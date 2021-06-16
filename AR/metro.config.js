/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

 const { getDefaultConfig } = require("metro-config");

 module.exports = (async () => {
   const {
     resolver: { assetExts }
   } = await getDefaultConfig();
 
   return {
     transformer: {
       getTransformOptions: async () => ({
         transform: {
           experimentalImportSupport: false,
           inlineRequires: false,
         },
       }),
     },
     resolver: {
       assetExts: [...assetExts, "obj", "mtl", "JPG","mp3","mp4", "vrx", "hdr", "gltf", "glb", "bin", "arobject", "gif"]
     }
   }
 })();