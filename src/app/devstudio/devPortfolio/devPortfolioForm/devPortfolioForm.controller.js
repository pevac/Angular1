(function(){
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "serverActService", "serverDataService", "$rootScope"];

    function addDevPortfolioCtrl($scope, serverActService, serverDataService,  $rootScope) {
        var self = this;

        self.clear = function() {
            $scope.project = null;
        };

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month"
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
            var project = $scope.project;
            project.draft = draft;
            if(project.draft ) { project.inTop = false}
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

        $scope.changeTop = function(project){
           serverDataService.getDevProjects().then(function (data) {
                var _isCheckTop = isCheckTop(data);
                
               if(_isCheckTop && !project.inTop || !project.inTop && !_isCheckTop || project.inTop && _isCheckTop){
                    // var newProject = project;
                    // newProject.inTop = !newProject.inTop;
                    // addDevProject(project);
               }else{
                    $scope.project.inTop = false;
                    alert("Кількість проектів з зафарбованою зіркою не більше 4");
               }
            });
           
        };

        function  addDevProject(data){
            serverActService.addDevProject(data).then(function (response) {
                  getProjects();
            });
        };

        function isCheckTop(arg){
            var projects = arg;
            var inTop = true;
            var index=0;
            for(var i = 0; i < projects.length; i++){
                if(!projects[i].draft  && projects[i].inTop) {
                    index++;
                }
                if(index >= 4){
                    inTop = false;
                    // break;
                }
            }

            return inTop;
        }

        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            $rootScope.project = null;
        }

        initForm();
    }
})();





