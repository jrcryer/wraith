/*
 * grunt-wraith
 * https://github.com/jrcryer/wraith
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */
var rimraf = require('rimraf');
var child_process = require('child_process');

exports.init = function(grunt, config) {

    /**
     * Script for capturing screenshot of webpage
     */
    var captureScript = 'tasks/lib/snap.js';

    /**
     * Runs wraith
     */
    var run = function() {
        grunt.verbose.writeln('Running...');
        clean();
        save();
        compare();
    };

    /**
     * Cleans the previous images saved
     *
     */
    var clean = function() {
        grunt.verbose.writeln('Cleaning screenshots directory: ' + config.output());
        emptyDirectory(config.output());
    };

    /**
     * Empties the directory
     * @param String filepath
     */
    var emptyDirectory = function(filepath) {
        if (!grunt.file.exists(filepath)) {
            return false;
        }

        // Only delete cwd or outside cwd if --force enabled. Be careful, people!
        if (grunt.file.isPathCwd(filepath)) {
            grunt.verbose.error();
            grunt.fail.warn('Cannot delete the current working directory.');
            return false;
        } else if (!grunt.file.isPathInCwd(filepath)) {
            grunt.verbose.error();
            grunt.fail.warn('Cannot delete files outside the current working directory.');
            return false;
        }

        try {
          rimraf.sync(filepath);
        } catch (e) {
          grunt.log.error();
          grunt.fail.warn('Unable to delete "' + filepath + '" file (' + e.message + ').', e);
        }
    };

    /**
     * Compares the images saved
     *
     */
    var compare = function() {
        grunt.verbose.writeln('Comparing ' + config.baseDomain() + ' to '+ config.comparisonDomain());

        var files = grunt.file.expand({cwd: config.output()}, '**/*.png');

        while (files.length > 0) {
            var base = [config.output(), files.pop()].join('/');
            var compare = [config.output(), files.pop()].join('/');
            grunt.verbose.writeln('Comparing ' + base + ' to '+ compare);

            diffImages(base, compare);
        }
    };

    /**
     * Create a difference between two images
     *
     * @param String baseImage
     * @param String comparisonImage
     */
    var diffImages = function(baseImage, comparisonImage) {
        var output = baseImage.split('.')[0] + '_diff.png';
        var data   = baseImage.split('.')[0] + '_diff.txt';

        child_process.exec(['compare -fuzz 20% -metric AE -highlight-color blue', baseImage, comparisonImage, output, '2>', data].join(' '), function() {

        });
    };

    /**
     * Saves images from each domain
     *
     */
    var save = function() {
        grunt.verbose.writeln('Taking screenshots for ' + config.baseDomain() + ' and '+ config.comparisonDomain());
        Object.keys(config.paths()).forEach(processPath);
    };

    /**
     * Process a single path
     *
     * @param String key
     */
    var processPath = function(key) {
        var path = config.paths()[key];
        var filePath = config.output() + '/' + key + '/';

        grunt.verbose.writeln('Creating directory for: ' + filePath);
        grunt.file.mkdir(filePath);

        config.widths().forEach(function(width) {
            var baseUrl = config.baseDomain() + path;
            var compareUrl = config.comparisonDomain() + path;

            var baseFilename = filePath + width + '_' + config.baseLabel() + '.png';
            var compareFilename = filePath + width + '_' + config.comparisonLabel() + '.png';

            capture(baseUrl, width, baseFilename);
            capture(compareUrl, width, compareFilename);
        });
    };

    /**
     * Capture images for a specific url, at a given width and
     * saving to filename
     *
     * @param String url
     * @param String width
     * @param String filename
     */
    var capture = function(url, width, filename) {
        child_process.exec([config.browser(),captureScript, url, width, filename].join(' '), function() {

        });
    };

    return {
        run: run
    };
};