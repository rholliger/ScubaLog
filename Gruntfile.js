module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var packageDirectory = "bower_components"

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        concat: {
            packages: {
                src: [
                    packageDirectory+"/jquery/dist/jquery.js",
                    packageDirectory+"/react/react.js",
                    packageDirectory+"/react/react-dom.js",
                    packageDirectory+"/firebase/firebase.js"
                ],
                dest: "www/js/packages.js"
            }
        },
        uglify: {
            packages: {
                files: {
                    "www/js/packages.min.js": "www/js/packages.js"
                }
            }
        },
        browserify: {
            options: {
                browserifyOptions: {
                    transform: ["coffee-reactify", "uglifyify"],
                    extensions: [".coffee"]
                }
            },
            dev: {
                src: ["src/js/*.coffee"],
                dest: "www/js/app.js"
            }
        },
        sass: {
            options: {
                outputStyle: "compressed"
            },
            dist: {
                files: {
                    "www/css/main.css": "src/styles/main.sass"
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "www",
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
                spawn: false
            },
            scripts: {
                files: "src/js/*.coffee",
                tasks: ["browserify"]
            },
            styles: {
                files: "src/styles/*.sass",
                tasks: ["sass"]        
            },
            html: {
                files: "www/index.html"
            }
        }
    });

    grunt.registerTask("default", [
        "concat:packages",
        "uglify:packages",
        "browserify",
        "sass",
        "connect:server",
        "watch"
    ]);
}