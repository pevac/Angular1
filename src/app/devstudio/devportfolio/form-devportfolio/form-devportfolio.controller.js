angular.module('devPortfolioModule')
    .controller('addDevPortfolioCtrl', addDevPortfolioCtrl)

addDevPortfolioCtrl.$inject = ["$scope","$stateParams"];

function addDevPortfolioCtrl($scope, $stateParams ) {
    $scope.clear = function() {
        $scope.dt = null;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2040, 5, 22),
        minDate: new Date(),
        startingDay: 1,
    };

    $scope.open1 = function() {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
        $scope.popup2.opened = true;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[2];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    initForm();

    function initForm() {
        if(!$stateParams.project){ return; }
        $scope.project = JSON.parse($stateParams.project)
    }

}




