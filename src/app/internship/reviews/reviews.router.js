(function(){
    "use strict";

    angular.module("reviewsModule").config(ReviewsRouterConfig);
    ReviewsRouterConfig.$inject = ["$stateProvider"];

    function ReviewsRouterConfig($stateProvider){

        $stateProvider
            .state("home.reviews", {
                url: "/reviews",
                template:"<div ui-view ></div>",
                abstract: true
            })
            .state("home.reviews.list", {
                url: "/list",
                templateUrl:"internship/reviews/listreview/reviews.html",
                controller: "ReviewListController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    reviews:  function(Resources) {
                        return  Resources.Reviews.query().$promise;
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
                       return  Resources.JobPositions.query().$promise;
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
                    data: null
                },
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(Resources) {
                       return  Resources.JobPositions.query().$promise;
                    }
                },
                onEnter: saveSessionStorage,
                onExit: clearSessionStorage
            })
            .state("home.reviews.view", {
                url: "/view",
                templateUrl:"internship/reviews/review/review.tmpl.html",
                controller: "ReviewController",
                controllerAs: "vm",
                params : {
                    previousState: null,
                    data: null
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
                var stateParams;
                if(!$sessionStorage.stateParams){
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.$default({stateParams: stateParams} );
                } 
                if($stateParams.data) {
                    stateParams = angular.copy($stateParams);
                    $sessionStorage.stateParams = stateParams;
                } else {
                    for(var key in $sessionStorage.$default().stateParams){
                        $stateParams[key] = $sessionStorage.$default().stateParams[key];
                    }
                }
            }
    }
})();