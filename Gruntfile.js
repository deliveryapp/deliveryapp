module.exports = function(grunt) {
  grunt.initConfig({
    distFolder: './',
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      css: {
        files: 'app/public/scss/*.scss',
        tasks: ['sass'],
        options: {
          debounceDelay: 250
        }
      },
      cssmin: {
        files: 'app/public/css/style.css',
        tasks: ['cssmin'],
        options: {
          debounceDelay: 250
        }
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/public/scss',
          src: ['*.scss'],
          dest: './app/public/css',
          ext: '.css'
        }]
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'app/public/css/style.min.css': ['app/public/css/style.css']
        }
      }
    },
    //pngmin: {
    //  compile: {
    //    options: {
    //      ext: '.png',
    //      force: true
    //    },
    //    files: [
    //      {
    //        src: 'images/*.png',
    //        dest: 'images/min'
    //      }
    //    ]
    //  }
    //},
    //imagemin: {
    //
    //  dynamic: {
    //    files: [{
    //      expand: true,
    //      cwd: 'images/',
    //      src: ['**/*.{png,jpg,gif}'],
    //      dest: 'imagemin/'
    //    }]
    //  }
    //},
    uglify: {
      options: {
        mangle: true
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'app/public/js',
          src: '**/*.js',
          dest: 'app/public/minified/js'
        }]
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['node_modules/backbone-virtual-collection/backbone.virtual-collection.js'], dest: 'app/public/lib/vendor/', filter: 'isFile'}
        ]
      }
    },
    postcss: {
      dist: {
        src: 'src/*.css',
        dest: 'dest/style.css'
      },
      options: {
        processors: [
          require('autoprefixer')(),
          require('cssnext')(),
          require('precss')(),
          require('use')()
        ]
      }
    }
  });

  grunt.registerTask('default', ['sass', 'uglify', 'cssmin']);
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-postcss');

  grunt.registerTask('build', ['copy','sass','concat','watch']);
};