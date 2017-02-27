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
                    reviews:  function(serverDataService) {
                        return  serverDataService.getReviews();
                    }
                }
            })
            .state("home.reviews.addreview", {
                url: "/add",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html",
                controller: "AddReviewController",
                controllerAs: "vm",
                resolve: {
                    /* @ngInject */
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    /* @ngInject */
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                }
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
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    /* @ngInject */
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                },
                onEnter: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        if($stateParams.data) {
                            $sessionStorage.$default({stateParams: {data: $stateParams.data, previousState: $stateParams.previousState}} );
                        } else {
                            $stateParams.data = $sessionStorage.$default().stateParams.data;
                            $stateParams.previousState = $sessionStorage.$default().stateParams.previousState;
                        }
                }],
                onExit: ["$stateParams", "$sessionStorage", function($stateParams, $sessionStorage) {
                        delete    $sessionStorage.$default().stateParams;
                }]
            })
    }
})();