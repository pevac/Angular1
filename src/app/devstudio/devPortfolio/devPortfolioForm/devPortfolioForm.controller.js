(function(){
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "serverActService", "$rootScope"];

    function addDevPortfolioCtrl($scope, serverActService,  $rootScope) {
        var self = this;

        self.clear = function() {
            $scope.project = null;
        };

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month",
            initDate:  new Date('2015-06-22'),
        };

        $scope.formats = ["MMMM yyyy", "MMMM-yyyy", "yyyy/MM", "dd.MM.yyyy"];
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

        $scope.goToEdit = function() {
            $rootScope.project = $scope.project;
        };

        $scope.addProject = function(draft){
            $scope.project.draft = draft;
            console.log($scope.project);
            serverActService.addDevProject($scope.project).then(function (response) {
                    self.addImage(response.data.id)
            },
            function (response) {
                console.log(response);
            });
        };

         self.addImage = function(id){
             var photo = $scope.photo.sitePhoto;
             var mainImg = $scope.photo.pagePhoto;
             serverActService.addDevImage(photo, id).then(function (response) {
                // $scope.project = null;
                $scope.project.previewImg = photo.name;
                serverActService.addDevProject($scope.project).then(function (response) {
                    // console.log(response);
                },
                function (response) {
                    // console.log(response);
                });
            });

            serverActService.addDevImage(mainImg, id).then(function (response) {
                // $scope.project = null;
                $scope.project.mainImg = mainImg.name;
                serverActService.addDevProject($scope.project).then(function (response) {
                },
                function (response) {
                    // console.log(response);
                });
                
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





