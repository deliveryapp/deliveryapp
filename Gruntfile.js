module.exports = function (grunt) {
    grunt.initConfig({
        distFolder: './',
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: 'app/public/scss/*.css',
                tasks: ['postcss', 'autoprefixer'],
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
                    {
                        expand: true,
                        src: ['node_modules/backbone-virtual-collection/backbone.virtual-collection.js','node_modules/moment/moment.js','node_modules/backbone.radio/build/backbone.radio.js'],
                        dest: 'app/public/lib/vendor/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        postcss: {
            dist: {
                src: 'app/public/scss/style.css',
                dest: 'app/public/css/style.css'
            },
            options: {
                map: true,
                processors: [

                    require('precss')(),
                    require('postcss-bem')({
                        defaultNamespace: 'b', // default namespace to use, none by default
                        style: 'bem', // suit or bem, suit by default,
                        separators: {
                            namespace: "-",
                            descendent: "__",
                            modifier: "_"
                        }
                    }),
                    require('lost')(),
                    require('postcss-css-variables')(),
                    require('postcss-color-function')(),
                    require('postcss-nested')(),


                    require('cssnext')()

                    /*require('postcss-nested')(),
                     require('postcss-use')({ modules: ['precss', 'lost', 'cssnext','postcss-bem','postcss-nested']})*/

                    /*,
                     require('postcss-use')({ modules: ['precss', 'autoprefixer', 'cssnext']})*/

                ]
            }
        },
        autoprefixer: {
            single_file: {
                src: 'app/public/css/style.css',
                dest: 'app/public/css/style.css'
            }
        }
    });

    grunt.registerTask('default', ['sass', 'uglify', 'cssmin']);
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-postcss');

    grunt.registerTask('build', ['copy', 'sass', 'concat', 'watch']);
};