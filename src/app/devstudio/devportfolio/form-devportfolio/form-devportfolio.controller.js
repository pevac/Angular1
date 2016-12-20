(function(){
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope","$stateParams", "serverActService", "$rootScope"];

    function addDevPortfolioCtrl($scope, $stateParams ,  serverActService, $rootScope) {
        $scope.clear = function() {
            $scope.dt = null;
        };

        $scope.dateOptions = {
            formatYear: "yy",
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

        $scope.formats = ["dd-MMMM-yyyy", "yyyy/MM/dd", "dd.MM.yyyy", "shortDate"];
        $scope.format = $scope.formats[2];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        };

        $scope.addProject = function(){
            serverActService.addDevProject($scope.project).then(function (response) {
                $scope.addImage(response.data.id)
                console.log(response);
            },
            function (response) {
                console.log(response);
            });
        };

         $scope.addImage = function(id){
             console.log($scope.photo.sitePhoto);
             console.log(id);
            serverActService.addDevImage($scope.photo.sitePhoto, id).then(function (response) {
            },

            function (response) {
                console.log(response);
            });
        };

        initForm();

        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            $rootScope.project = null;
        }
    }
})();





