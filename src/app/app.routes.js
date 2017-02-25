(function(){
    "use strict";
    angular.module("appModule").config(function($stateProvider, $urlRouterProvider, USER_ROLES) {

        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("login", {
                url: "/login",
                templateUrl: "login/login.tmpl.html",
                controller: "LoginController",
                controllerAs: "vm",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                }
            })
            .state("home", {
                abstract: false,
                url: "/app",
                templateUrl: "shared/home/home.html",
                controller: "HomeController",
                controllerAs: "vm",
                data: {
                    authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
                },
                resolve: {
                    _auth: function resolveAuthentication(AuthResolver) {
                        return AuthResolver.resolve();
                    }
                }
            })

            .state("home.devportfolio", {
                url: "/devportfolio",
                template:'<div ng-app="devPortfolioModule"  ui-view ></div>'
            })
            .state("home.devportfolio.list", {
                url: "/list",
                controller: "DevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioList/devPortfolioList.tmpl.html",
                resolve: {
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    }
                }
            })
            .state("home.devportfolio.addportfolio", {
                url: "/add",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
            })
            .state("home.devportfolio.editportfolio", {
                url: "/edit",
                controller: "AddDevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioForm/devPortfolioForm.tmpl.html",
                params : {
                    data: null
                }
            })
            .state("home.devportfolio.viewportfolio", {
                url: "/view",
                controller: "ViewDevPortfolioController",
                controllerAs: 'vm',
                templateUrl:"devstudio/devPortfolio/devPortfolioView/devPortfolioView.tmpl.html",
                params : {
                    previousState: null,
                    data: null
                }
            })

            .state("home.ordercustomer", {
                url: "/ordercustomer",
                template:'<div ng-app="orderCustomerModule"  ui-view ></div>'
            })
            .state("home.ordercustomer.list", {
                url: "/list",
                templateUrl:"devstudio/customersOrder/ordersList/ordersList.tmpl.html",
                controller: "orderCustomerController",
                controllerAs: "vm",
                resolve: {
                    _customers:  function(serverDataService) {
                       return  serverDataService.getCustomers();
                    }
                }
                
            })
            .state("home.ordercustomer.view", {
                url: "/view?orderId",
                templateUrl:"devstudio/customersOrder/orderViewer/orderViewer.tpml.html",
                controller: "viewOrderCustomerCtrl"
            })

            .state("home.vacancies", {
                url: "/vacancies",
                template:'<div ng-app="vacancyModule"  ui-view ></div>'
            })
            .state("home.vacancies.list", {
                url: "/list",
                templateUrl:"devstudio/vacancies/vacanciesList/vacanciesList.tmpl.html",
                controller: "VacanciesController",
                controllerAs: 'vm',
                resolve: {
                    vacancies:  function(serverDataService, jobPositions, projects, lodash) {
                        return  serverDataService.getVacancies().then(function(vacancies){
                            lodash.forEach(vacancies, function(vacancy) {
                                var jobIndex = lodash.findIndex(jobPositions, function(job) { return job.id == vacancy.jobPosition.id; });
                                vacancy.jobPosition.name = jobPositions[jobIndex].name;
                                var projectIndex = lodash.findIndex(_projects, function(project) { return project.id == vacancy.project.id; });
                                vacancy.project.name = projects[projectIndex].name;
                            });

                            return vacancies;
                       });
                    },
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    }
                }
            })
            .state("home.vacancies.addvacancy", {
                url: "/add",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "AddVacancyController",
                controllerAs: 'vm',
                params : {
                    previousState: null,
                },
                resolve: {
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                    workingTimes:function(serverDataService) {
                       return  serverDataService.getWorkingTimes();
                    } 
                }
            })
            .state("home.vacancies.edit", {
                url: "/edit",
                templateUrl:"devstudio/vacancies/vacanciesForm/vacanciesForm.tmpl.html",
                controller: "AddVacancyController",
                controllerAs: 'vm',
                params : {
                    previousState: null,
                    data: null
                },
                resolve: {
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                    workingTimes:function(serverDataService) {
                       return  serverDataService.getWorkingTimes();
                    } 
                }
            })
            .state("home.vacancies.review", {
                url: "^/review/list",
                templateUrl:"devstudio/vacancies/reviewVacancies/reviewVacancies.tmpl.html",
                controller: "reviewVacanciesController",
                controllerAs: 'vm',
            })

            .state("home.intportfolio", {
                url: "/internship",
                template:'<div ng-app="intPortfolioModule"  ui-view ></div>'
            })
            .state("home.intportfolio.list", {
                url: "/list",
                controller: 'intPortfolioListCtrl',
                templateUrl:"internship/intPortfolio/intPortfolioList/intPortfolioList.tmpl.html"
            })
            .state("home.intportfolio.addportfolio", {
                url: "/add",
                controller: "addIntPortfolioCtrl",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html"
            })
            .state("home.intportfolio.editportfolio", {
                url: "/edit?project",
                controller: "addIntPortfolioCtrl",
                templateUrl:"internship/intPortfolio/intPortfolioForm/intPortfolioForm.tmpl.html"
            })


            .state("home.reviews", {
                url: "/reviews",
                template:'<div ng-app="reviewsModule"  ui-view ></div>'
            })
            .state("home.reviews.list", {
                url: "/list",
                templateUrl:"internship/reviews/listreview/reviews.html",
                controller: "ReviewController",
                controllerAs: "vm",
                resolve: {
                    reviews:  function(serverDataService, jobPositions, lodash) {
                        return  serverDataService.getReviews().then(function(reviews){
                           lodash.forEach(reviews, function(review) {
                                var jobIndex = lodash.findIndex(jobPositions, function(job) { return job.id == review.jobPosition.id; });
                                review.jobPosition.name = jobPositions[jobIndex].name;
                            });
                            
                            return reviews;
                        });
                    },
                    jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    }
                }
            })
            .state("home.reviews.addreview", {
                url: "/add",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html",
                controller: "addReviewController",
                controllerAs: "vm",
                resolve: {
                    _jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    _projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                }
            })
            .state("home.reviews.editreview", {
                url: "/edit",
                templateUrl:"internship/reviews/reviewForm/reviewForm.tmpl.html",
                controller: "addReviewController",
                controllerAs: "vm",
                params : {
                    previousState: null,
                    data: null
                },
                resolve: {
                    _jobPositions:  function(serverDataService) {
                       return  serverDataService.getJobPositions();
                    },
                    _projects:  function(serverDataService) {
                       return  serverDataService.getDevProjects();
                    },
                }
            })

            .state("home.users", {
                url: "/users",
                template:'<div ng-app="usersModule"  ui-view ></div>',
                 data: {
                    authorizedRoles: [USER_ROLES.superAdmin]
                }
               
            })
            .state("home.users.list", {
                url: "/list",
                templateUrl:"users/list-users/list-users.tmpl.html",
                 
            })
            .state("home.users.add", {
                url: "/add",
                templateUrl:"users/form-users/form-users.tmpl.html"
            })
            .state("home.users.edit", {
                url: "/edit",
                templateUrl:"users/form-users/form-users.tmpl.html"
            })
            .state("home.users.view", {
                url: "/view",
                controller: "viewUserCtrl",
                templateUrl:"users/view-users/view-users.tmpl.html"
            })


                .state("home.works", {
                    url: "/works",
                    templateUrl:"work/work.html"
                })
                
        

            .state("home.training", {
                url: "training",
                templateUrl:"internship/training/training.html"
            })
    });
})();



