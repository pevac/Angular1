(function(){
    angular.module('devPortfolioModule')
    .controller('viewDevPortfolioCtrl', viewDevPortfolioCtrl);

    viewDevPortfolioCtrl.$inject = ["$scope","$stateParams"];

    function viewDevPortfolioCtrl($scope, $stateParams ) {

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[2];

        initForm();

        function initForm() {
            
            if(!$stateParams.project){ return; }
            $scope.project = JSON.parse($stateParams.project)
            console.log($scope.project);
        }
    }
})();