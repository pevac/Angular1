(function(){
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "serverActService", "$state", "$q", "serverDataService", "$rootScope"];

    function addDevPortfolioCtrl($scope, serverActService, $state, $q,  serverDataService,  $rootScope) {
        var self = this;
        // var isTop;
        if($scope.project) { var isTop = $scope.project.inTop;}

        self.clear = function() {
            $scope.project = null;
        };

        // console.log(date);

        $scope.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month"
        };

        $scope.formats = ["MMMM yyyy","yyyy-MM-dd", "MMMM-yyyy", "yyyy/MM", "dd.MM.yyyy"];
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
             var previewImg = $scope.photo.previewImg;
             var mainImg = $scope.photo.mainImg;
             serverActService.addDevImage(previewImg, id).then(function (response) {
                // $scope.project = null;
                $scope.project.previewImg = previewImg.name;
                serverActService.addDevProject($scope.project).then(function (response) {
                   $state.go("home.devportfolio.list");
                },
                function (response) {
                });
            });

            serverActService.addDevImage(mainImg, id).then(function (response) {
                // $scope.project = null;
                $scope.project.mainImg = mainImg.name;
                serverActService.addDevProject($scope.project).then(function (response) {
                    $state.go("home.devportfolio.list");
                },
                function (response) {
                });
                
            });
        };

       
        $scope.changeTop = function(project){
            console.log($scope.photo.previewImg);
            
           serverDataService.getDevProjects().then(function (data) {
                var _isCheckTop = isCheckTop(data);
                console.log(isTop);
                
               if(project.id && (_isCheckTop && !project.inTop || !project.inTop && !_isCheckTop || project.inTop && _isCheckTop || isTop && project.inTop && !_isCheckTop  )){
                
               }else{
                    $scope.project.inTop = isTop;
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

        $scope.initPriveiwImage = function (){
            var url = serverDataService.getDevImage1($scope.project.mainImg, $scope.project.id);
            // console.log(url);
            
            var input = document.getElementById("inputSitePhoto");
            input.value = url;
            console.log(input.value);
            // return a;
        }


        function initForm() {
            if(!$rootScope.project){ return; }
            $scope.project = $rootScope.project;
            isTop = $scope.project.inTop;
            // $scope.initPriveiwImage();
            
            $scope.project.dateStart = new Date($scope.project.dateStart);
            if($scope.project.dateEnd) $scope.project.dateEnd = new Date($scope.project.dateEnd);
        //   setImageUrl($scope.project.previewImg, $scope.project.id );
            $rootScope.project = null;

        }

        function setImageUrl(name, id){
            
            serverDataService.getDevImage(name, id).then(function(response){
            var arrayBufferView = new Uint8Array( response.data );
            var type = response.headers('content-type') || 'image/WebP';
            var file = new File( [ arrayBufferView ], name, { type: type } );
            var input = document.getElementById("inputSitePhoto");
            input.files[0] = file;
            console.log( input.files[0]);


          })
           
        }

        initForm();
    }
})();





