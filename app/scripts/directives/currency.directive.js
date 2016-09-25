define(['app'], function(app) {
	app.directive('currency', [ '$filter', '$timeout', function($filter, $timeout) {
		return {
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {
				var listener = function() {
					var value = $element.val().replace(/[^0-9]/g, '');
					$element.val($filter('currency')(value, '$', 0));
				};

				// This runs when we update the text field
				ngModelCtrl.$parsers.push(function(viewValue) {
					return viewValue.replace(/[^0-9]/g, '');
				});

				// This runs when the model gets updated on the scope directly and keeps our view in sync
				ngModelCtrl.$render = function() {
					$element.val($filter('currency')(ngModelCtrl.$viewValue, '$', 0));
				};

				$element.bind('change', listener);
				$element.bind('keydown', function(event) {
					var key = event.keyCode;
					// If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
					// This lets us support copy and paste too
					if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
						return;
					}
					$timeout(listener, 0);
				});

				$element.bind('paste cut', function() {
					$timeout(listener, 0);
				});
			}
		}
	}]);
});