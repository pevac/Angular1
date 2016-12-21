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
            datepickerMode: "'month'",
            minMode: "month",
        };

        $scope.formats = ["MMMM-yyyy", "yyyy/MM", "dd.MM.yyyy", "shortDate"];
        $scope.format = $scope.formats[0];

        $scope.popup1 = {
            opened: false
        };

        $scope.popup2 = {
            opened: false
        }

        $scope.open1 = function() {
            $scope.popup1.opened = true;
        };

        $scope.open2 = function() {
            $scope.popup2.opened = true;
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





