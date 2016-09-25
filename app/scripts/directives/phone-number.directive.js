define(['app'], function(app) {
	app.directive('phoneNumber', [ '$filter', '$timeout', function($filter, $timeout) {
		return {
			require: 'ngModel',
			link: function($scope, $element, $attrs, ngModelCtrl) {
				var formatPhoneNumber = function(tel) {
					if (!tel) { return ''; }

					var value = tel.toString().trim().replace(/^\+/, '');

					if (value.match(/[^0-9]/)) {
						return tel;
					}

					var country, city, number;

					switch (value.length) {
						case 1:
						case 2:
						case 3:
							city = value;
							break;

						default:
							city = value.slice(0, 3);
							number = value.slice(3);
					}

					if(number){
						if(number.length>3){
							number = number.slice(0, 3) + '-' + number.slice(3,7);
						}
						else{
							number = number;
						}

						return ("(" + city + ") " + number).trim();
					}
					else{
						return "(" + city;
					}
				};

				var listener = function() {
					var value = $element.val().replace(/[^0-9]/g, '');
					$element.val(formatPhoneNumber(value, false));
				};

				// This runs when we update the text field
				ngModelCtrl.$parsers.push(function(viewValue) {
					return viewValue.replace(/[^0-9]/g, '').slice(0,10);
				});

				// This runs when the model gets updated on the scope directly and keeps our view in sync
				ngModelCtrl.$render = function() {
					$element.val(formatPhoneNumber(ngModelCtrl.$viewValue));
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