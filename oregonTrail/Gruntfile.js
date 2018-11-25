module.exports = function(grunt) {
    console.log('Hello, grunt is running');
    // grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            'static': {
                options: {
                    hostname: 'localhost',
                    port: 3000,
                    keepalive : true
                }
            }
        },

    });
    grunt.loadNpmTasks('grunt-contrib-connect');

};