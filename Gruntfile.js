module.exports = function(grunt) {

    require('google-closure-compiler').grunt(grunt);

    var path = require('path');

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
            }
        },
        jscs: {
            src: ['<%= jshint.files %>'],
            options: {
                config: '.jscsrc'
            }
        },
        copy: {
            main: {
                expand: true,
                src: 'ga-lite.js',
                cwd: 'src/',
                dest: 'dist/'
            }
        },
        express: {
            fileServer: {
                options: {
                    port: 9001,
                    bases: ['dist', 'test']
                }
            },
            testServer: {
                options: {
                    server: path.resolve('./test/server'),
                    port: 9002
                }
            }
        },
        'closure-compiler': {
            dist: {
                files: {
                    'dist/ga-lite.min2.js': ['src/ga-lite.js']
                },
                options: {
                    'compilation_level': 'SIMPLE_OPTIMIZATIONS',
                    'language_in': 'ECMASCRIPT5_STRICT'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['build']
        },
        clean: ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('build', ['clean', 'jshint', 'jscs', 'closure-compiler', 'copy', 'express']);
    grunt.registerTask('default', ['build', 'watch']);

};
