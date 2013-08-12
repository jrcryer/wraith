/*
 * grunt-wraith
 * https://github.com/jrcryer/wraith
 *
 * Copyright (c) 2013 James Cryer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var config = require('./lib/config').init(grunt);
  //var snap   = require('./lib/snap');
  var wraith = require('./lib/wraith');

  grunt.registerMultiTask('wraith', 'BBC Responsive News\' Wraith... Gruntified', function() {

    var options = this.options({
      output: './shots'
    });
    config.load(options);
    wraith.init(grunt, config, null).run();
    grunt.log.writeln('Done!');
  });

};
