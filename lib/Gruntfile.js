module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      js: {
        src: ['../javascripts/main.js'],
        dest: '../dist/app.js'
      }
    },
    jshint: {
      options: {
        predef: ["document", "console"],
        esnext: true,
        strict: "global",
        globals: { $: true },
        browserify: true,
        reporter: require("jshint-stylish")
      },
      files: ["../javascripts/**/*.js"]
    },
    sass: {
      dist: {
        files: {
          "../dist/css/main.css": "../sass/styles.scss"
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 3000,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ["../index.html"]
      },
      javascripts: {
        files: ["../javascripts/**/*.js"],
        tasks: ["jshint", "browserify"]
      },
      sass: {
        files: ["../sass/**/*.scss"],
        tasks: ["sass"]
      },
      browserify: {
        files: ["../javascripts/*.js"],
        tasks: ["browserify"]
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ["jshint", "sass", "browserify", "connect", "watch"]);
};
