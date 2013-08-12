/*
 * grunt-wraith
 * https://github.com/jrcryer/wraith
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */
var rimraf = require('rimraf');

exports.init = function(grunt, config, snap) {

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
    };

    /**
     * Saves images from each domain
     *
     */
    var save = function() {
        grunt.verbose.writeln('Taking screenshots for ' + config.baseDomain() + ' and '+ config.comparisonDomain());

    };

    return {
        run: run
    };
};