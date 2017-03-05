(function(){
    "use strict"

    angular.module("intPortfolioModule").controller("AddIntPortfolioController", AddIntPortfolioController)
    AddIntPortfolioController.$inject = ["$scope",  "$timeout", "$state",  "ImageService", "Resources"];

    function AddIntPortfolioController($scope,   $timeout, $state,  ImageService, Resources) {
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
            Resources.IntProjects.save(project).then(function (response) {
                addImage(response);
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
            Resources.IntProjects.saveFile(image, project.id).then(function (response) {
                project.img = image.name;
                Resources.IntProjects.save(project).then(function (response) {
                    $timeout(function () {
                        vm.dataLoading =false;
                        $state.go("home.intportfolio.list");
                    }, 1000);
                });
            });
        };

        function setImage(img, id) {
           Resources.IntProjects.getFileById(img, id).then(function (response) {
                vm.img=  ImageService.bufferArrayResponceToFile(response, img); 
            })
        };

    }
})();






