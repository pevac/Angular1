(function(){
    "use strict"
    
    angular.module("usersModule").controller("UsersController", UsersController);
    UsersController.$inject = ["$scope",  "$state", "users", "Resources"];

    function UsersController($scope, $state, users, Resources){
        var vm = this;
        vm.users = users;
        
        vm.setImage = function(user){
            return  Resources.UserImageURl(user.img, user.id);
        };

        vm.deleteUser= function(user, index){
            var checkDelete = confirm("Видалити користувача")
            if(!checkDelete) return;
            user.$remove(function(){
                vm.users.splice(index, 1);
                $state.reload();
            })
        };

        vm.goToEdit = function(user, stateToGo) {
            $state.go( stateToGo, { previousState : { name : $state.current.name }, data: {user: user} }, {} );
        };

    }
})();