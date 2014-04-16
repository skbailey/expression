module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    clean: ['public/javascripts/templates/compiled/*'],

    handlebars: {
      all: {
        files: {
          'public/javascripts/templates/compiled/compiled.handlebars.js' : 'public/javascripts/templates/source/*.handlebars'
        },
        options: {
          exportAMD: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-handlebars-compiler');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['clean', 'handlebars']);
};