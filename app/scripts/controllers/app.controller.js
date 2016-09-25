define(['app'], function(app) {
	app.controller('AppCtrl', [ '$scope', function($scope, Data) {
			// Listen to UI Router navigation changes
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {

				var animated = $element.find('ui-view');
				animated.removeClass('scrolled');
				animated.removeClass('modal');
				var isForward = toState.name > fromState.name;
				if (isForward) {
					$element.removeClass('backward');
					this.anim = forwardAnim[toState.name];
				} else {
					$element.addClass('backward');
					this.anim = backwardAnim[toState.name];
				}
				animated.addClass(this.anim);
			});
		}
	]);
});