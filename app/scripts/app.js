define(['services/dependency-resolver'], function(dependencyResolver)
{
    var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

    app.config([
        '$stateProvider',
        '$locationProvider',
        '$controllerProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        '$urlRouterProvider',

        function($stateProvider, $locationProvider, $controllerProvider, $compileProvider, 
            $filterProvider, $provide, $urlRouterProvider) {
	        
            app.controller = $controllerProvider.register;
	        app.directive  = $compileProvider.directive;
	        app.filter     = $filterProvider.register;
	        app.factory    = $provide.factory;
	        app.service    = $provide.service;

            $locationProvider.html5Mode(true);

            // $urlRouterProvider.otherwise('/Home');

            var mainStateResolver = dependencyResolver([
                    'controllers/app.controller', 
                    'controllers/home.controller', 
                    'controllers/about.controller', 
                    'controllers/contact.controller', 
                    'directives/phone-number.directive',
                    'directives/currency.directive',
                    'services/data.service']);
            // // Expose extra parameter to child states
            // mainStateResolver.extra =  function ($stateParams) {
            //     return $stateParams.extra.replace('/','');
            // };
                    
            $stateProvider.state('main', {
                // absolute: true,
                // url: '/?page&extra',
                url: '/{page:(?:Home|About|Contact|)}{extra:(?:/[^/]+)?}',
                templateProvider: function ($timeout, $stateParams, $templateRequest) {
                    var page = $stateParams.page === ''?'Home':$stateParams.page;
                    return $templateRequest('views/' + page + '.html');
                },
                controllerProvider: function($stateParams) {
                    console.log('extra: ', $stateParams.extra);
                    var page = $stateParams.page === ''?'Home':$stateParams.page;
                    var ctrlName = page + "Ctrl";
                    return ctrlName;
                },
                resolve: mainStateResolver
            });

            $stateProvider.state('main.extra', {
                // url: '/extra',
                template: '<h1> The value of extra parameter is <code>{{extra}}</code></h1>',
                controller: function($scope, $stateParams, $state) {
                    console.log('main.extra', $stateParams);
                    $scope.extra = $stateParams.extra.replace('/','');
                }
            });
        }
    ])

    .run(function($rootScope, $state, $timeout, $location) {
        $rootScope.$state = $state;

        // Listen to UI Router navigation changes
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            var containerElement = angular.element(document.getElementById('view-container'));
            var animated = angular.element(document.getElementById('main'));
            animated.removeClass('scrolled');
            var fromPage = fromParams.page;
            var toPage = toParams.page;
            var isForward = false;
            if(fromPage == 'Home' || (fromPage == 'About' && toPage =='Contact')) {
                isForward = true;
            }
            if (isForward) {
                containerElement.removeClass('backward');
                $rootScope.anim = 'scrolled';
            } else {
                containerElement.addClass('backward');
                $rootScope.anim = 'scrolled';
            }
            animated.addClass($rootScope.anim);
        });

        // Quick dirty workaround to get rid of ~2F in url instead of /
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $timeout(function() {
                if(window.location.href.indexOf('~2F') >=0) {
                    event.preventDefault();
                    $location.path($location.path().replace('~2F','/'));
                }
            });
        });
    });

   return app;
});