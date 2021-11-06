//ignorei18n_start

/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'emberapp',
		podModulePrefix: 'emberapp/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',

	contentSecurityPolicy: {
	  'style-src': "* 'unsafe-inline'",
	  'default-src': "*",
	  'child-src':"* 'unsafe-inline' data: blob: filesystem:;",
	  'connect-src': "* 'unsafe-eval'",
	  'script-src' : "* 'unsafe-inline' 'unsafe-eval'"
	},

	'ember-cli-notifications': {
	  icons: 'bootstrap'
	}

  };

	ENV.APP = {};

  if (environment === 'production' /* || environment==='development' */ ) {
  	ENV.APP.rootElement = '#ELAEmberIncluder';
  }

  return ENV;
};

//ignorei18n_end
