module.exports = {
  navigateFallback: 'index.html',
  stripPrefix: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/css/*.*css',
    'dist/assets/*.*',
    'dist/assets/avatars/*.*',
    'dist/manifest.json'
  ]
};
