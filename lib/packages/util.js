var fs = require('fs-extra');
var path = require('path');
var _ = require('underscore');
var glob = require('glob');

module.exports = (function () {
  'use strict';

  return function (grunt, options, platform, source, destination) {
    source = path.join(options.projectRoot, 'platforms', platform, source);
    destination = path.join(options.dist || 'dist', platform);

    var local = {};

    return {
      mkdirpSync: function () {
        return fs.mkdirpSync(this.destination.resolve.apply(this.destination, arguments));
      },
      copySync: function (src, dest) {
        var source = this.source.resolve(src);
        var destination = this.destination.resolve(dest);

        this.log('Copy to ' + destination + '.');
        return fs.copySync(source, destination);
      },
      globSync: function (pattern, options) {
        options = _.defaults(options || {}, {
          cwd: source
        });
        return glob.sync(pattern, options);
      },
      source: {
        resolve: function () {
          return path.join.apply(path, [source].concat(_.toArray(arguments)));
        }
      },
      destination: {
        resolve: function () {
          return path.join.apply(path, [destination].concat(_.toArray(arguments)));
        }
      },
      log: _.bind(grunt.log.writeln, grunt.log)
    };
  };
})();