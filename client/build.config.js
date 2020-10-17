/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * The `build_dir` folder is where our projects are compiled during
   * development and the `compile_dir` folder is where our app resides once it's
   * completely built.
   */
  build_dir: 'build',
  compile_dir: 'bin',
  public_dir: '../public',

  /**
   * This is a collection of file patterns that refer to our app code (the
   * stuff in `src/`). These file paths are used in the configuration of
   * build tasks. `js` is all project javascript, less tests. `ctpl` contains
   * our reusable components' (`src/common`) template HTML files, while
   * `atpl` contains the same, but for our app's code. `html` is just our
   * main HTML file, `less` is our main stylesheet, and `unit` contains our
   * app's unit tests.
   */
  app_files: {
    js: [ 'src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js' ],
    jsunit: [ 'src/**/*.spec.js' ],

    atpl: [ 'src/app/**/*.tpl.html' ],
    ctpl: [ 'src/common/**/*.tpl.html' ],

    html: [ 'src/index.html' ],
    less: 'src/less/main.less'
  },

  /**
   * This is a collection of files used during testing only.
   */
  test_files: {
    js: [
      'vendor/angular-mocks/angular-mocks.js'
    ]
  },

  /**
   * This is the same as `app_files`, except it contains patterns that
   * reference vendor code (`vendor/`) that we need to place into the build
   * process somewhere. While the `app_files` property ensures all
   * standardized files are collected for compilation, it is the user's job
   * to ensure non-standardized (i.e. vendor-related) files are handled
   * appropriately in `vendor_files.js`.
   *
   * The `vendor_files.js` property holds files to be automatically
   * concatenated and minified with our project source files.
   *
   * The `vendor_files.css` property holds any CSS files to be automatically
   * included in our app.
   *
   * The `vendor_files.assets` property holds any assets to be copied along
   * with our app's assets. This structure is flattened, so it is not
   * recommended that you use wildcards.
   */
  vendor_files: {
    js: [
      'vendor/jquery/dist/jquery.min.js',
      'vendor/bootstrap/dist/js/bootstrap.min.js',
      'vendor/selectize/dist/js/standalone/selectize.min.js',
      'vendor/angular/angular.min.js',
      'vendor/angular-messages/angular-messages.min.js',
      'vendor/angular-bootstrap/ui-bootstrap.min.js',
      'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
      'vendor/placeholders/angular-placeholders-0.0.1-SNAPSHOT.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/angular-toastr/dist/angular-toastr.min.js',
      'vendor/angular-toastr/dist/angular-toastr.tpls.min.js',
      'vendor/checklist-model/checklist-model.js',
      'vendor/ekko-lightbox/dist/ekko-lightbox.min.js',
      'vendor/microplugin/src/microplugin.js',
      'vendor/angular-selectize2/dist/selectize.js',
      'vendor/sifter/sifter.min.js',
      'vendor/trNgGrid/release/src/js/trNgGrid.min.js',
      'vendor/xml2json/xml2json.js',
      'vendor/phoneformat.js/dist/phone-format.min.js',
      'vendor/angular-ui-select/dist/select.min.js',
      'vendor/angulartics/dist/angulartics.min.js',
      'vendor/angulartics-google-analytics/dist/angulartics-google-analytics.min.js',
      'vendor/angulartics-facebook-pixel/dist/angulartics-facebook-pixel.min.js',
      'vendor/rangy/rangy-core.js',
      'vendor/rangy/rangy-selectionsaverestore.js',
      'vendor/textAngular/dist/textAngular.js',
      'vendor/textAngular/dist/textAngularSetup.js',
      'vendor/textAngular/dist/textAngular-sanitize.js',
      'vendor/angular-intercom/angular-intercom.min.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/angular-aside/dist/js/angular-aside.min.js',
      'vendor/angular-ui-mask/dist/mask.min.js',
      'vendor/papaparse/papaparse.min.js',
      'vendor/angular-papa-promise/dist/angular-papa-promise.min.js',
      'vendor/moment/min/moment.min.js',
      'vendor/fullcalendar/dist/fullcalendar.min.js',
      'vendor/angular-ui-calendar/src/calendar.js',
      'node_modules/angular-filter/dist/angular-filter.min.js',
    ],
    css: [
      'vendor/angular-toastr/dist/angular-toastr.min.css',
      'vendor/ekko-lightbox/dist/ekko-lightbox.min.css',
      'vendor/trNgGrid/release/src/css/trNgGrid.min.css',
      'vendor/angular-ui-select/dist/select.min.css',
      'vendor/textAngular/dist/textAngular.css',
      'vendor/angular-aside/dist/css/angular-aside.min.css',
      'vendor/fullcalendar/dist/fullcalendar.min.css'
    ],
    assets: []
  },
};
