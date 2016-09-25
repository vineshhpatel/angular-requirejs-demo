define(['app'], function(app) {
	app.controller('AboutCtrl', [ '$scope', 'Data', function($scope, Data) {
			$scope.page = {
				heading: 'About Us'
			};

			$scope.name = Data.getName();
		}
	]);
});