//ignorei18n_start
/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	 var app = new EmberApp(defaults, {
		    // Add options here
		    minifyJS: {
		      options: {
		        compress: { screw_ie8: false },
		        mangle:   { screw_ie8: false },
		        output:   { screw_ie8: false }
		      }
		    },
      tests: false, 
		  fingerprint: {
		    customHash: "ela"
		  }
		  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
	//css imports
	//third party js imports
    app.import('vendor/js/bootstrap-select.js');
    app.import('vendor/js/bootstrap-toggle.js');
    app.import('vendor/js/bootstrap.js');
    app.import('vendor/js/daterangepicker.js');
    app.import('vendor/js/icheck.min.js');
    app.import('vendor/js/jquery-ui-1.9.2.custom.js');
    app.import('vendor/js/jquery.caret-1.5.2.js');
    app.import('vendor/js/jquery.cookie.js');
    app.import('vendor/js/jquery.mCustomScrollbar.js');
    app.import('vendor/js/jquery.mjs.nestedSortable.js');
    app.import('vendor/js/jquery.navgoco.min.js');
    app.import('vendor/js/jstree.js');
    app.import('vendor/js/moment.min.js');
    app.import('vendor/js/notify.min.js');
    app.import('vendor/js/placeholder.js');
    app.import('vendor/js/tag-it.min.js');
    app.import('vendor/js/toggles.min.js');

    app.import('vendor/css/bootstrap.css');


  return app.toTree();
};
//ignorei18n_end
