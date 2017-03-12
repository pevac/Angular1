(function(){
    "use strict"

    angular.module("intPortfolioModule").controller("AddIntPortfolioController", AddIntPortfolioController)
    AddIntPortfolioController.$inject = ["$scope",  "$state",  "ImageService", "Resources"];

    function AddIntPortfolioController($scope,   $state,  ImageService, Resources) {
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
                    $state.go( "home.intportfolio.viewportfolio", { previousState : { name : $state.current.name }, data: {project: vm.project, previewImg: previewImg} }, {} );
           });
        };

        vm.addProject = function(visible){
            vm.dataLoading =true;
            vm.project.visible = visible;
            saveProject(saveImage);
        };

        function saveProject(succesHandler){
            var action = vm.project.id ? "$update": "$save";
            vm.project[action](function(data){succesHandler(data)});
        }

        activate();

        function activate() {
            vm.project = new Resources.IntProjects();
            
            if ($state.params.data && $state.params.data.project) {
                
                vm.project  = $state.params.data.project;
                vm.img  = $state.params.data.previewImg ? ImageService.base64ToFile($state.params.data.previewImg.data, $state.params.data.previewImg) : null;
                vm.project.dateStart  = new Date(vm.project.dateStart);
                vm.project.dateEnd  = new Date(vm.project.dateEnd);

                if(!vm.img) setImage();
            }
        }

        function saveImage(data){
            var image = vm.img;
            vm.project.id = data.id;
            if(!image && !image.lastModifiedDate) {return;}
            Resources.IntProjectFile.saveFile({data :image, id: vm.project.id},function () {
                vm.project.img = image.name;
                saveProject(function () {
                        vm.dataLoading =false;
                        $state.go("home.intportfolio.list");
                });
            });
        }

        function setImage() {
           Resources.IntProjectFile.getFile({name: vm.project.img, id: vm.project.id},function (response) {
                vm.img=  ImageService.bufferArrayResponceToFile(response, vm.project.img); 
            })
        }

    }
})();






