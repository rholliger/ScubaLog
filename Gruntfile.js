module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    var rewrite = require( "connect-modrewrite" );

    var packageDirectory = "bower_components"

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

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
        concat: {
            packages: {
                src: [
                    packageDirectory+"/jquery/dist/jquery.js",
                    packageDirectory+"/lodash/lodash.js",
                    packageDirectory+"/react/react-with-addons.js",
                    packageDirectory+"/react/react-dom.js",
                    packageDirectory+"/page/page.js"
                ],
                dest: "www/js/packages.js"
            },
            css: {
                src: [ "src/vendor/css/*.css" ],
                dest: "www/css/packages.css"
            }
        },
        uglify: {
            packages: {
                files: {
                    "www/js/packages.min.js": "www/js/packages.js"
                }
            }
        },
        cssmin: {
            target: {
                src: "www/css/packages.css",
                dest: "www/css/packages.css"
            }
        },
        browserify: {
            coffee: {
                options: {
                    browserifyOptions: {
                        transform: ["coffee-reactify", "react-templatify", "uglifyify"],
                        extensions: [".coffee", ".rt"],
                        debug: true
                    }
                },
                src: ["src/js/*.coffee"],
                dest: "www/js/app.js"
            }
        },
        connect: {
            options: {  
                middleware: function ( connect, options, middlewares ) {
                    middlewares.unshift(rewrite(["!\\.html|\\.js|\\.css|\\.svg|\\.jp(e?)g|\\.png|\\.gif$ /index.html"]));
                    return middlewares;
                }
            },
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
                files: ["src/js/**/*.coffee", "src/js/**/*.rt"],
                tasks: ["browserify:coffee"]
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
        "sass",
        "concat:css",
        "cssmin",
        "browserify:coffee",
        "connect:server",
        "watch"
    ]);
}