module.exports = function(grunt) {
  const esbuild = require('esbuild');

  grunt.initConfig({
    copy: {
      chrome: {
        files: [
          // Copy all source files except manifests and background.js
          {expand: true, cwd: 'src/', src: ['**', '!manifest.*.json', '!background.js'], dest: 'dist/chrome/'},
          // Copy Chrome manifest
          {src: 'src/manifest.chrome.json', dest: 'dist/chrome/manifest.json'},
          // Copy icons
          {expand: true, cwd: 'icons/', src: ['**'], dest: 'dist/chrome/icons/'},
          // Copy background.js as-is for Chrome (ESM)
          {src: 'src/background.js', dest: 'dist/chrome/background.js'}
        ]
      },
      firefox: {
        files: [
          // Copy all source files except manifests and background.js
          {expand: true, cwd: 'src/', src: ['**', '!manifest.*.json', '!background.js'], dest: 'dist/firefox/'},
          // Copy Firefox manifest
          {src: 'src/manifest.firefox.json', dest: 'dist/firefox/manifest.json'},
          // Copy icons
          {expand: true, cwd: 'icons/', src: ['**'], dest: 'dist/firefox/icons/'}
          // background.js will be bundled by esbuild
        ]
      }
    },
    clean: {
      build: ['dist/chrome', 'dist/firefox']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Esbuild task for Firefox background.js
  grunt.registerTask('esbuild:firefox', 'Bundle background.js for Firefox', function() {
    const done = this.async();
    esbuild.build({
      entryPoints: ['src/background.js'],
      bundle: true,
      outfile: 'dist/firefox/background.js',
      format: 'iife', // Firefox background scripts must not be modules
      platform: 'browser',
      target: ['chrome58', 'firefox57'],
      // external: [], // add if you want to exclude some deps
    }).then(() => done(), err => done(err));
  });

  // Build tasks
  grunt.registerTask('build:chrome', ['clean', 'copy:chrome']);
  grunt.registerTask('build:firefox', ['clean', 'copy:firefox', 'esbuild:firefox']);
  grunt.registerTask('build', ['clean', 'copy:chrome', 'copy:firefox', 'esbuild:firefox']);
};