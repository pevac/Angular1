(function(){
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "serverActService", "FileUploader", "$rootScope"];

    function addDevPortfolioCtrl($scope, serverActService, FileUploader, $rootScope) {
        $scope.clear = function() {
            $scope.dt = null;
        };

        

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month",
            formatMonth: "MMMM"
        };

        $scope.formats = ["MMMM yyyy", "yyyy/MM", "dd.MM.yyyy"];
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
                console.log(response);
                $scope.addImage(response.data.id)
            },
            function (response) {
                console.log(response);
            });
        };

         $scope.addImage = function(id){
             var photo = $scope.photo.sitePhoto
            serverActService.addDevImage(photo, id).then(function (response) {
                console.log(response);
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





