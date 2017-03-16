(function(){
    angular.module("sidebarModule", []).controller("SidebarController", SidebarController);

    SidebarController.$inject = ["$scope","$rootScope", "$state", "AUTH_EVENTS", "AuthService"];
    
    function SidebarController($scope,$rootScope, $state, AUTH_EVENTS, AuthService) {
        var vm = this;

        vm.logout = function(){
            AuthService.logout();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };

        vm.isActive = function(state){
            var active = state.split(".")[1];
            return ($state.current.name.indexOf(active) !== -1);
        };

        vm.goTo = function(state){
          if(state === "" || state === undefined || state === null) return;
          $state.go(state, {}, {});
        }


        vm.menu = [
          {
            "title":"Home",
            "state":"home",
            "class": "icon home-icon",
            "submenu": []
          },
          {
            "title":"Dev Studio",
            "class": "icon dev-studio-icon",
            "submenu": [
              {
                "title":"Портфоліо", 
                "state":"home.devportfolio.list"
              },
              {
                "title":"Заявки клієнтів", 
                "state":"home.ordercustomer.list"
              },
              {
                "title":"Вакансії", 
                "state":"home.vacancies.list"
              },
              {
                "title":"Відгуки на вакансії", 
                "state":"home.feedback"
              }
            ]
          },
          {
            "title":"Internship",
            "class": "icon internship-icon",
            "submenu": [
              {
                "title":"Портфоліо", 
                "state":"home.intportfolio.list"
              },
              {
                "title":"Відгуки", 
                "state":"home.reviews.list"
              }
            ]
          },
          {
            "title":"Users",
            "state":"home.users.list",
            "class": "icon users-icon",
            "submenu": []
          },
          {
            "title":"Dictionaries",
            "state":"home.dictionares",
            "class": "icon dictionares-icon",
            "submenu": []
          },
        ]

    }
})();

