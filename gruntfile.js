const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

module.exports = function (grunt) {
  // Helper: Bump version string
  function bumpVersion(version, type) {
    let [major, minor, patch] = version.split('.').map(Number);
    if (type === 'major') {
      major += 1; minor = 0; patch = 0;
    } else if (type === 'minor') {
      minor += 1; patch = 0;
    } else {
      patch += 1;
    }
    return [major, minor, patch].join('.');
  }

  // Helper: Update manifest version
  function updateManifest(manifestPath, newVersion) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    manifest.version = newVersion;
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  }

  // Helper: Update CHANGELOG.md
  function updateChangelog(newVersion) {
    const changelogPath = path.join(__dirname, 'CHANGELOG.md');
    const date = new Date().toISOString().slice(0, 10);
    let changelog = '';
    if (fs.existsSync(changelogPath)) {
      changelog = fs.readFileSync(changelogPath, 'utf8');
    }
    const newEntry = `## [${newVersion}] - ${date}\n- No details provided.\n\n`;
    fs.writeFileSync(changelogPath, newEntry + changelog);
  }

  grunt.initConfig({
    copy: {
      chrome: {
        files: [
          { expand: true, cwd: 'src/', src: ['**', '!manifest.*.json', '!background.js'], dest: 'dist/chrome/' },
          { src: 'src/manifest.chrome.json', dest: 'dist/chrome/manifest.json' },
          { expand: true, cwd: 'icons/', src: ['**'], dest: 'dist/chrome/icons/' },
          { src: 'src/background.js', dest: 'dist/chrome/background.js' }
        ]
      },
      firefox: {
        files: [
          { expand: true, cwd: 'src/', src: ['**', '!manifest.*.json', '!background.js'], dest: 'dist/firefox/' },
          { src: 'src/manifest.firefox.json', dest: 'dist/firefox/manifest.json' },
          { expand: true, cwd: 'icons/', src: ['**'], dest: 'dist/firefox/icons/' }
        ]
      }
    },
    clean: {
      build: ['dist/chrome', 'dist/firefox']
    },
    zip: {
      chrome: {
        cwd: 'dist/chrome/',
        src: ['dist/chrome/**'],
        dest: 'dist/4chan-batch-downloader-chrome.zip'
      },
      firefox: {
        cwd: 'dist/firefox/',
        src: ['dist/firefox/**'],
        dest: 'dist/4chan-batch-downloader-firefox.zip',
        compression: 'DEFLATE'
      },
      firefox_xpi: {
        cwd: 'dist/firefox/',
        src: ['dist/firefox/**'],
        dest: 'dist/4chan-batch-downloader-firefox.xpi',
        compression: 'DEFLATE'
      }
    }
  });

  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Esbuild task for Firefox background.js
  grunt.registerTask('esbuild:firefox', 'Bundle background.js for Firefox', function () {
    const done = this.async();
    esbuild.build({
      entryPoints: ['src/background.js'],
      bundle: true,
      outfile: 'dist/firefox/background.js',
      format: 'iife', // Firefox background scripts must not be modules
      platform: 'browser',
      target: ['chrome88', 'firefox109'],
    }).then(() => done(), err => done(err));
  });

  // Version bump task
  grunt.registerTask('bump-version', 'Bump version and update CHANGELOG.md', function (type) {
    const manifestChromePath = path.join(__dirname, 'src/manifest.chrome.json');
    const manifestFirefoxPath = path.join(__dirname, 'src/manifest.firefox.json');
    const manifest = JSON.parse(fs.readFileSync(manifestChromePath, 'utf8'));
    const currentVersion = manifest.version;
    const bumpType = type || 'patch';
    const newVersion = bumpVersion(currentVersion, bumpType);

    grunt.log.writeln(`Bumping version: ${currentVersion} -> ${newVersion}`);

    updateManifest(manifestChromePath, newVersion);
    updateManifest(manifestFirefoxPath, newVersion);

    // Update CHANGELOG.md
    updateChangelog(newVersion);
  });

  // Build tasks
  grunt.registerTask('build:chrome', ['clean', 'copy:chrome']);
  grunt.registerTask('build:firefox', ['clean', 'copy:firefox', 'esbuild:firefox']);
  grunt.registerTask('build', ['clean', 'copy:chrome', 'copy:firefox', 'esbuild:firefox']);
  grunt.registerTask('pack:chrome', ['build:chrome', 'zip:chrome']);
  grunt.registerTask('pack:firefox', ['build:firefox', 'zip:firefox']);
  grunt.registerTask('pack:firefox:xpi', ['build:firefox', 'zip:firefox_xpi']);
  grunt.registerTask('pack', ['build', 'zip:chrome', 'zip:firefox', 'zip:firefox_xpi']); // Builds and zips both, including .xpi

  // Version bump aliases
  grunt.registerTask('patch', ['bump-version:patch']);
  grunt.registerTask('minor', ['bump-version:minor']);
  grunt.registerTask('major', ['bump-version:major']);
};