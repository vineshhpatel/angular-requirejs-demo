define(['app'], function(app) {
	app.controller('HomeCtrl', [ '$scope', '$state', '$filter', 'Data', function($scope, $state, $filter, Data) {
		$scope.page = {
			heading: 'Welcome'
		};

		$scope.submitData = function(name) {
			console.log(name);
			if(name) {
				Data.setName(name);
				$state.go('main', { page: 'About' });
			} else {
				$scope.nameRequired = 'Please fill in your name to proceed.';
			}
		};

		$scope.persons = [];
		for (var i = 49; i >= 0; i--) {
			$scope.persons.push({
				codeName: String.fromCharCode(Math.floor((Math.random() * 25) + 65)) + String.fromCharCode(Math.floor((Math.random() * 25) + 65)) + String.fromCharCode(Math.floor((Math.random() * 25) + 65)),
				age: Math.floor((Math.random() * 10) + 20),
				noOfCars: Math.floor((Math.random() * 5) + 1)
			})
		}

		$scope.orderBy = [];
		$scope.orderByModel = {};

		$scope.$watchCollection('orderByModel', function () {
			$scope.orderBy = [];
			angular.forEach($scope.orderByModel, function (value, key) {
				if (value) {
					$scope.orderBy.push(key);
				}
			});
		});

		$scope.seven = {
			number1: 0,
			number2: 0,
			number3: 0,
			total: 0
		};

		$scope.totalChanged = function() {
			$scope.seven.number1 = Math.floor($scope.seven.total/2);
			$scope.seven.number2 = Math.ceil($scope.seven.number1/2);
			$scope.seven.number3 = $scope.seven.total - $scope.seven.number1 - $scope.seven.number2;
		};

		$scope.eight = { };

		var inputChanged = function(inputIndex) {
			if(inputIndex === 0 && $scope.eight.input0 && $scope.eight.input0.length >= 5) {
				$scope.eight.input0 = $scope.eight.input0.slice(0,5);
				document.getElementById('custom-input-1').focus();
			} else if(inputIndex === 1 && $scope.eight.input1 && $scope.eight.input1.length >= 5) {
				$scope.eight.input1 = $scope.eight.input1.slice(0,5);
				document.getElementById('custom-input-2').focus();
			} else if(inputIndex === 1 && $scope.eight.input1 == '') {
				document.getElementById('custom-input-0').focus();
			} else if(inputIndex === 2 && $scope.eight.input2 && $scope.eight.input2.length > 5) {
				$scope.eight.input2 = $scope.eight.input2.slice(0,5);
			} else if(inputIndex === 2 && $scope.eight.input2 == '') {
				document.getElementById('custom-input-1').focus();
			}
		};

		$scope.$watch('eight.input0', function() {
			inputChanged(0);
		});
		$scope.$watch('eight.input1', function() {
			inputChanged(1);
		});
		$scope.$watch('eight.input2', function() {
			inputChanged(2);
		});
	}]);
});