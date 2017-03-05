(function(){
    "use strict";

    angular.module("reviewsModule").config(ReviewsRouterConfig);
    ReviewsRouterConfig.$inject = ["$stateProvider", "$urlRouterProvider","USER_ROLES"];

    function ReviewsRouterConfig($stateProvider, $urlRouterProvider, USER_ROLES){

        $stateProvider
            .state("home.reviews", {
                url: "/reviews",
                template:'<div ui-view ></div>',
                abstract: true
            })
            .state("home.reviews.list", {
                url: "/list",
                templateUrl:"internship/reviews/listreview/reviews.html",
                controller: "ReviewController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    reviews:  function(Resources) {
                        return  Resources.Reviews.getAll();
                    }
                }
            })
            .state("home.reviews.addreview", {
                url: "/add",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html",
                controller: "AddReviewController",
                controllerAs: "vm",
                params : {
                    data: null
                },
                resolve: {
                  /* @ngInject */
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.getAll();
                    }
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.reviews.editreview", {
                url: "/edit",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html",
                controller: "AddReviewController",
                controllerAs: "vm",
                params : {
                    previousState: null,
                    data: null
                },
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.getAll();
                    }
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            });

            clearSessionStorage.$inject = [ "$sessionStorage"];
            function clearSessionStorage($sessionStorage){
                delete    $sessionStorage.stateParams;
            }

            saveSessionStorage.$inject = [ "$stateParams", "$sessionStorage"];
            function saveSessionStorage($stateParams, $sessionStorage){
                if(!$sessionStorage.stateParams){
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    var stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    $stateParams.data = $sessionStorage.$default().stateParams.data;
                }
            }
    }
})();