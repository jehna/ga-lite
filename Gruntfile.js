module.exports = function(grunt) {

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
                    'dest/ga-lite.min.js': ['src/ga-lite.js']
                }
            }
        },
        copy: {
            main: {
                expand: true,
                src: 'ga-lite.js',
                cwd: 'src/',
                dest: 'dest/'
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['build']
        },
        clean: ['dest']
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');

    grunt.registerTask('build', ['clean', 'jshint', 'jscs', 'uglify', 'copy']);
    grunt.registerTask('default', ['build', 'watch']);

};
