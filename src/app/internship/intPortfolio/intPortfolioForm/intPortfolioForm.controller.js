(function(){
    "use strict"

    angular.module("intPortfolioModule").controller("AddIntPortfolioController", AddIntPortfolioController)
    AddIntPortfolioController.$inject = ["$scope", "serverActService", "$timeout", "$state", "serverDataService", "ImageService"];

    function AddIntPortfolioController($scope,  serverActService, $timeout, $state, serverDataService, ImageService) {
        var vm = this;
        vm.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month",
            formatMonth: "MMMM"
        };

        vm.formats = ["MMMM yyyy", "yyyy/MM", "dd.MM.yyyy"];
        vm.format = vm.formats[0];

        vm.popup1 = {
            opened: false
        };

        vm.popup2 = {
            opened: false
        };

        vm.open1 = function() {
            vm.popup1.opened = true;
        };

        vm.open2 = function() {
            vm.popup2.opened = true;
        };

         vm.goToEdit = function () {
           var previewImg;
           ImageService.fileToObject(vm.img).then(function(data){
               previewImg = data;
                    $state.go( 'home.intportfolio.viewportfolio', { previousState : { name : $state.current.name }, data: {project: vm.project, previewImg: previewImg} }, {} );
           });
        };

        vm.addProject = function(visible){
            vm.dataLoading =true;
            var project = angular.copy(vm.project);
            project.visible = visible;
            serverActService.addIntProject(project).then(function (response) {
                addImage(response.data);
            });
        };

        activate();

        function activate() {
            if ($state.params.data && $state.params.data.project) {
                vm.project  = $state.params.data.project;

                vm.img  = $state.params.data.previewImg ? ImageService.base64ToFile($state.params.data.previewImg.data, $state.params.data.previewImg) : null;

                vm.project.dateStart  = new Date(vm.project.dateStart);
                vm.project.dateEnd  = new Date(vm.project.dateEnd);

                if(!vm.img) setImage(vm.project.img, vm.project.id);
            }
        };

        function addImage(data){
            var image = vm.img;
            var project = data;
            if(!image && !image.lastModifiedDate) {return;}
            serverActService.addIntImage(image, project.id).then(function (response) {
                project.img = image.name;
                serverActService.addIntProject(project).then(function (response) {
                    $timeout(function () {
                        vm.dataLoading =false;
                        $state.go("home.intportfolio.list");
                    }, 1000);
                });
            });
        };

        function setImage(img, id) {
           serverDataService.getIntImage(img, id).then(function (response) {
                vm.img=  base64ToFile(response, img); 
            })
        };

        function base64ToFile(response, name){
            var file;
            var blob;
            var arrayBufferView = new Uint8Array(response.data);
            var type = response.headers('content-type') || 'image/WebP';
            blob = new Blob([arrayBufferView], { type: type });
            blob.name = name;

            return  blob;
        };
    }
})();






