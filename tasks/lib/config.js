/*
 * grunt-wraith
 * https://github.com/jrcryer/wraith
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */
exports.init = function(grunt) {

    /**
     * Raw configuration
     */
    var config = {};

    /**
     * Output directory
     */
    var output = '';

    /**
     * Load the options
     */
    var load = function(options) {

        if (!options.config) {
            grunt.fail.fatal("Please supplied a configuration file.");
        }
        config = grunt.file.readYAML(options.config);
        output = options.output;
    };

    /**
     * Returns widths
     * @return Array
     */
    var widths = function() {
        return config.screen_widths;
    };

    /**
     * Returns the base domain
     * @return String
     */
    var baseLabel = function() {
        return Object.keys(config.domains)[0];
    };

    /**
     * Returns base domain
     * @return String
     */
    var baseDomain = function() {
        return config.domains[baseLabel()];
    };

    /**
     * Returns the comparison label
     * @return String
     */
    var comparisonLabel = function() {
        return Object.keys(config.domains)[1];
    };

    /**
     * Returns comparison domain
     * @return String
     */
    var comparisonDomain = function() {
        return config.domains[comparisonLabel()];
    };

    /**
     * Returns configuration paths
     * @return Array
     */
    var paths = function() {
        return config.paths;
    };

    /**
     * Returns the output directory
     * @return String
     */
    var output = function() {
        return output;
    };

    return {
        load: load,
        widths: widths,
        paths: paths,
        output: output,
        baseLabel: baseLabel,
        baseDomain: baseDomain,
        comparisonLabel: comparisonLabel,
        comparisonDomain: comparisonDomain
    };
};