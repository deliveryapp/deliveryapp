module.exports = function(grunt) {
  grunt.initConfig({
    distFolder: './',
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      css: {
        files: 'scss/*.scss',
        tasks: ['sass'],
        options: {
          debounceDelay: 250
        }
      },
      cssmin: {
        files: 'css/style.css',
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
          cwd: 'scss',
          src: ['*.scss'],
          dest: './css',
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
          'css/style.min.css': ['css/style.css']
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
          cwd: 'js',
          src: '**/*.js',
          dest: 'minified/js'
        }]
      }
    }
  }); 

  grunt.registerTask('default', ['sass', 'uglify', 'cssmin']);
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  //grunt.loadNpmTasks('grunt-pngmin');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
};