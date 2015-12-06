module.exports = function(grunt) {
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
        uglify: {
            main: {
                options: {
                },
                files: {
                    'dist/ga-lite.min.js': ['src/ga-lite.js']
                }
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
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['build']
        },
        clean: ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('build', ['clean', 'jshint', 'jscs', 'uglify', 'copy', 'express']);
    grunt.registerTask('default', ['build', 'watch']);

};
