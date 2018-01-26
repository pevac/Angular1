(function(){
    "use strict"

    angular.module("usersModule").controller("AddUserController", AddUserController);
    AddUserController.$inject = ["$scope","$stateParams",  "Resources", "ImageService"];

    function AddUserController($scope,  $state,  Resources, ImageService) {
        var vm = this;
        activate();
        
        vm.addUser = function () {
            vm.dataLoading =true;
            saveUser(function (response) {
                uploadImage(response);
            });
        };

        vm.goToEdit = function () {
            var file = ImageService.base64ToFile(vm.croppedDataUrl, vm.photo);   
            
           ImageService.fileToObject(file).then(function(data){
                $state.go( "home.user.view", { previousState : { name : $state.current.name }, data: {user: vm.user, previewImg: data} }, {} );
           });
        };

        function saveUser(succesHandler){
            var action = vm.user.id ? "$update": "$create";
            vm.user[action](function(data){succesHandler(data)});
        }


        function uploadImage(user) {
            var imageBase64 = vm.croppedDataUrl;
            vm.user.id  = user.id;
            var file = ImageService.base64ToFile(imageBase64, vm.photo);   
          
            Resources.UserFile.saveFile({data: file, id: vm.user.id },function () {
                vm.user.img = file.name;
                saveUser(function () {
                    vm.dataLoading =false;
                    $state.go("home.users.list");
                })
            });
        }

        function getUserImage() {
            Resources.UserFile.getFile({name: vm.user.img, id:  vm.user.id},function (response) {
                vm.photo =   ImageService.bufferArrayResponceToFile(response, vm.user.img)
            })
        }
        
        function activate(){
            vm.user = new  Resources.Users();
            if(!$state.params.data) return;
            vm.user = $state.params.data.user;
            vm.photo =  $state.params.data.previewImg ? ImageService.base64ToFile($state.params.data.previewImg.data, $state.params.data.previewImg) : null;

            if(!vm.photo) getUserImage();
        }

    }
})();

