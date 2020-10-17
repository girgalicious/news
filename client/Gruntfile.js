require('dotenv').config();

module.exports = function(grunt) {

    /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-remove');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-cdn');
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-eslint');

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON("package.json"),

        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * <%= pkg.homepage %>\n' +
                ' *\n' +
                ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
                ' */\n'
        },

        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },

        ngconstant: {
            options: {
                space: ' ',
                name: 'news',
                wrap: '(function() {"use strict";\n\n {%= __ngModule %}\n\n})();',
                serializerOptions: {
                    quote: '"',
                    no_trailing_comma: true
                },
                template: grunt.file.read("constant.tpl.ejs"),
                dest: 'src/app/appConstant.js',
                constants: function() {
                    return {
                        constants: {
                            "apiKey": process.env.API_KEY,
                            "apiUrl": process.env.API_URL
                        }
                    };
                }
            },
            build: {}
        },

        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    "package.json"
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    "package.json"
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            build: ['<%= build_dir %>', '<%= public_dir %>/'],
            compile: ['<%= compile_dir %>', '<%= public_dir %>/'],
            publicFolder: ["<%= public_dir %>/"],
            options: {
                force: true
            }
        },

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build_app_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets',
                    expand: true
                }]
            },
            build_app_fonts: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'vendor/bootstrap/fonts',
                    expand: true
                }, {
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'vendor/font-awesome/fonts',
                    expand: true
                }, {
                    src: ['**'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: 'src/assets/fonts',
                    expand: true
                }]
            },
            build_app_images: {
                files: [{
                    src: ['**'],
                    dest: '<%= build_dir %>/img/',
                    cwd: 'src/assets/img',
                    expand: true
                }]
            },
            build_vendor_assets: {
                files: [{
                    src: ['<%= vendor_files.assets %>'],
                    dest: '<%= build_dir %>/assets/',
                    cwd: '.',
                    expand: true,
                    flatten: true
                }]
            },
            build_appjs: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorjs: {
                files: [{
                    src: ['<%= vendor_files.js %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_vendorcss: {
                files: [{
                    src: ['<%= vendor_files.css %>'],
                    dest: '<%= build_dir %>/',
                    cwd: '.',
                    expand: true
                }]
            },
            build_favicons: {
                files: [{
                    src: ['*.png'],
                    dest: '<%= build_dir %>/',
                    cwd: 'src/',
                    expand: true
                }]
            },
            build_static: {
                files: []
            },
            build_copy: {
                files: [{
                    src: ['**'],
                    dest: '<%= public_dir %>/',
                    cwd: '<%= build_dir %>',
                    expand: true
                }]
            },
            compile_assets: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    cwd: '<%= build_dir %>/assets',
                    expand: true
                }]
            },
            compile_fonts: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/assets/',
                    cwd: '<%= build_dir %>/assets',
                    expand: true
                }]
            },
            compile_images: {
                files: [{
                    src: ['**'],
                    dest: '<%= compile_dir %>/img/',
                    cwd: '<%= build_dir %>/img',
                    expand: true
                }]
            },
            compile_favicons: {
                files: [{
                    src: ['*.png'],
                    dest: '<%= compile_dir %>/',
                    cwd: '<%= build_dir %>/',
                    expand: true
                }]
            },
            compile_static: {
                files: []
            },
            compile_copy: {
                files: [{
                    src: ['**'],
                    dest: '<%= public_dir %>/',
                    cwd: '<%= compile_dir %>',
                    expand: true
                }]
            }
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            build_css: {
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>.css'
                ],
                dest: '<%= build_dir %>/assets/<%= pkg.name %>.css'
            },

            compile_css: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>.css'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>.css'
            },

            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compile_js: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                src: [
                    '<%= vendor_files.js %>',
                    'module.prefix',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>.js'
            }
        },

        /**
         * `ngAnnotate` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        ngAnnotate: {
            compile: {
                files: [{
                    src: ['<%= app_files.js %>'],
                    cwd: '<%= build_dir %>',
                    dest: '<%= build_dir %>',
                    expand: true
                }]
            }
        },

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    '<%= concat.compile_js.dest %>': '<%= concat.compile_js.dest %>'
                }
            }
        },

        /**
         * `grunt-contrib-less` handles our LESS compilation and uglification automatically.
         * Only our `main.less` file is included in compilation; all other files
         * must be imported from this file.
         */
        less: {
            build: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.less %>'
                }
            },
            compile: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>.css': '<%= app_files.less %>'
                },
                options: {
                    cleancss: true,
                    compress: true
                }
            }
        },

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },

            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= app_files.ctpl %>'],
                dest: '<%= build_dir %>/templates-common.js'
            }
        },

        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: '<%= build_dir %>/karma-unit.js'
            },
            unit: {
                port: 9019,
                background: true
            },
            continuous: {
                singleRun: true,
                preprocessors: {
                    'src/**/*.js': ['coverage']
                }
            },
            single: {
                singleRun: true,
                frameworks: ['jasmine'],
                browsers: [
                    'PhantomJS'
                ]
            },
            coverage: {
                singleRun: true,
                frameworks: ['jasmine'],
                browsers: [
                    'PhantomJS'
                ],
                preprocessors: {
                    'src/**/*.js': ['coverage']
                }
            }
        },

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {

            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= vendor_files.css %>',
                    '<%= build_dir %>/assets/<%= pkg.name %>.css'
                ]
            },

            /**
             * When it is time to have a completely compiled application, we can
             * alter the above to include only a single JavaScript and a single CSS
             * file. Now we're back!
             */
            compile: {
                dir: '<%= compile_dir %>',
                src: [
                    '<%= concat.compile_js.dest %>',
                    '<%= concat.compile_css.dest %>'
                ]
            }
        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },

        connect: {
            local: {
                options: {
                    port: 8082,
                    base: 'build',
                    src: "https://localhost:3001/livereload.js?snipver=1",
                    middleware: function(connect, options, middlewares) {
                        var injectLiveReload = require('connect-livereload');
                        var history = require('connect-history-api-fallback');
                        middlewares.unshift(history());
                        middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                        middlewares.unshift(injectLiveReload({
                            src: options.src
                        }));
                        return middlewares;
                    }
                },
                proxies: [{
                    context: '/v1',
                    host: "0.0.0.0",
                    port: process.env.API_PORT,
                    https: false,
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }]
            }
        },


        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: 8081
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['eslint']
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: ['eslint', 'copy:build_appjs']
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*'
                ],
                tasks: ['copy:build_app_assets', 'copy:build_app_images', 'copy:build_favicons', 'copy:build_static', 'copy:build_vendor_assets']
            },

            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: ['index:build']
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.atpl %>',
                    '<%= app_files.ctpl %>'
                ],
                tasks: ['html2js']
            },

            /**
             * When the CSS files change, we need to compile and minify them.
             */
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:build']
            },

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
            jsunit: {
                files: [
                    '<%= app_files.jsunit %>'
                ],
                tasks: ['eslint']
            }
        },

        remove: {
            options: {
                trace: true
            },
            fileList: ['<%= public_dir %>/src/**/*'],
            dirList: ['<%= public_dir %>/src']
        },

        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: '<%= build_dir %>/img',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: '<%= compile_dir %>/img'
                }]
            }
        },

        cdn: {
            options: {
                /** @required - root URL of your CDN (may contains sub-paths as shown below) */
                cdn: process.env.CLOUDFRONT_URL,
                /** @optional  - if provided both absolute and relative paths will be converted */
                flatten: true,
                /** @optional  - if provided will be added to the default supporting types */
                supportedTypes: { 'phtml': 'html' }
            },
            dist: {
                /** @required  - gets sources here, may be same as dest  */
                cwd: '<%= compile_dir %>',
                /** @required  - puts results here with respect to relative paths  */
                dest: '<%= compile_dir %>',
                /** @required  - files to process */
                src: ['index.html', '*.css', '{,*/}*.html', '{,**/}*.html']
            }
        },

        cacheBust: {
            options: {
                assets: ['<%= compile_dir %>/assets/**/*.{js,css}'], //, '<%= compile_dir %>/fonts/**/*', '<%= compile_dir %>/img/**/*'],
                baseDir: './',
                deleteOriginals: true
            },
            taskName: {
                files: [{
                    expand: true,
                    cwd: '<%= compile_dir %>',
                    src: ['index.html', '*.css', '{,*/}*.html', '{,**/}*.html']
                }]
            }
        },

        eslint: {
            options: {
                fix: true,
                configFile: '.eslintrc.js'
            },
            target: ['<%= app_files.js %>', '<%= app_files.jsunit %>']
        }
    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build', 'delta']);
    grunt.registerTask('watch-c9', ['build-c9', 'delta']);
    //to run livereload run grunt server
    grunt.registerTask('server', ['configureProxies:local', 'connect:local', 'watch']);

    //to run livereload run grunt server on cloud9
    grunt.registerTask('c9-server', ['configureProxies:c9', 'connect:c9', 'watch-c9']);

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build', 'compile', 'copy:compile_copy']);

    grunt.registerTask('deploy', ['build-production', 'compile', 'cacheBust', 'cdnify', 'clean:publicFolder', 'copy:compile_copy']);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', ['ngconstant',
        'copy:build_app_images', 'copy:build_app_fonts', 'copy:build_favicons', 'copy:build_static',
        'copy:build_vendor_assets', 'copy:build_appjs', 'copy:build_vendorjs', 'copy:build_vendorcss',
        'index:build'
    ]);

    /**
     * The 'copyBuild' task copies the output of a build to the public folder for testing
     */
    grunt.registerTask('copyBuild', ['copy:build_copy']);

    /**
     * Runs the unit tests
     */
    grunt.registerTask('test', ['karmaconfig', 'karma:continuous']);
    grunt.registerTask('test-local', ['karmaconfig', 'karma:single']);
    grunt.registerTask('test-coverage', ['karmaconfig', 'karma:coverage']);

    /**
     * Runs the linting and tests in CI/CD server
     */
    grunt.registerTask("ci", ["eslint", "html2js", "test"]);

    grunt.registerTask("cdnify", "checks whether cdn grunt task should run", function() {
        if (process.env.CLOUDFRONT_URL) {
            grunt.task.run("cdn");
        }
    });

    /**
     * The 'debug' task does a build and copies the output to the public folder for testing
     */
    grunt.registerTask('debug', ['build-c9', 'copyBuild']);

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compile', [
        'less:compile', 'copy:compile_assets', 'imagemin', 'copy:compile_fonts', 'copy:compile_favicons', 'copy:compile_static',
        'ngAnnotate', 'concat:compile_js', 'concat:compile_css', 'uglify', 'index:compile'
    ]);

    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }


    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function() {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });

};
