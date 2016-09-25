require.config({
	baseUrl: '/scripts',
	paths: {
		'angular': '/bower_components/angular/angular',
		'angular-animate': '/bower_components/angular-animate/angular-animate',
		'angular-bootstrap': '/bower_components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-ui-router': '/bower_components/angular-ui-router/release/angular-ui-router'
	},
	shim: {
		'app': {
			deps: ['angular', 'angular-ui-router', 'angular-animate', 'angular-bootstrap']
		},
		'angular-ui-router': {
			deps: ['angular']
		}
	}
});

require(['app'], function(app) {
	angular.bootstrap(document, ['app']);
});