define(['app'], function(app) {
	app.factory('Data', function () {

		var data = {
			name: ''
		};

		return {
			getName: function () {
				return data.name;
			},
			setName: function (name) {
				data.name = name;
			}
		};
	});
});
