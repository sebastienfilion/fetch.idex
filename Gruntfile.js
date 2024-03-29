module.exports = function(grunt) {

    var copyrights, banner, footer;

    copyrights = '/*!\n' +
        '* IDeX Fetch: Simple template fetcher v<%= pkg.version %>\n' +
        '* http://idesignexperiences.com/#custom-form-element\n' +
        '*\n' +
        '* Copyright 2013, 2014 Sébastien Filion me@idesignexperiences.com\n' +
        '* Released under the MIT license\n' +
        '*\n' +
        '* Built on: <%= grunt.template.today("yyyy/mm/dd") %>\n' +
        '*\n' +
        '*/\n' +
        '\n';

    banner = copyrights +
        '(function(idex, window, document, undefined) {\n' +
        'idex.render = function(s, o) {\n' +
        '    return window.Mustache.render(s, o); // You can modify the parsing dependency here\n' +
        '};\n\n';

    footer = '}(window.idex = window.idex || {}, window, document));';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                banner: banner,
                footer: footer
            },
            dist: {
                src: ['dependencies/*.js', 'source/*.js'],
                dest: '<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: copyrights
            },
            dist: {
                files: {
                    '<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'source/*.js'],
            options: {
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['dependencies/*.js', 'source/*.js'],
            tasks: ['concat', 'jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};