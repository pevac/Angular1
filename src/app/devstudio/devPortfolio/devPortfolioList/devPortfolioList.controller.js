(function(){
    angular.module('devPortfolioModule',[])
        .controller('devPortfolioListCtrl', devPortfolioListCtrl);

    devPortfolioListCtrl.$inject = ["$scope", "$rootScope", "serverActService", "serverDataService", "$uibModal", "$log", "$document"]
    function devPortfolioListCtrl($scope,  $rootScope, serverActService, serverDataService, $uibModal, $log, $document){
        $scope.goToEdit = function(project) {
            $rootScope.project = project;
        };

        //   $scope.open = function () {
        //     var parentElem =  angular.element($document[0].querySelector('.devportfolio'));
        //     var modalInstance = $uibModal.open({
        //     animation: true,
        //     ariaLabelledBy: 'modal-title',
        //     ariaDescribedBy: 'modal-body',
        //     templateUrl: 'devstudio/devPortfolio/modal/modal.tmpl.html',
        //     controller: 'ModalInstanceCtrl',
        //     appendTo: parentElem,
        //    resolve: {} // empty storage
          

        //     });

        //     modalInstance.result.then(function (selectedItem) {
        //         // console.log(selectedItem)
        //     //   $ctrl.selected = selectedItem;
        //     }, function () {
        //     $log.info('Modal dismissed at: ' + new Date());
        //     });
        // };


        $scope.publish = function(project){
            project.draft = !project.draft;
              serverActService.addDevProject(project).then(function (response) {
                  getProjects();
            },
            function (response) {
                console.log(response);
            });
        };

        $scope.changeTop = function(project){
            project.inTop = !project.inTop;
              serverActService.addDevProject(project).then(function (response) {
                //    $scope.showModal = true;
                // $scope.open();
                  getProjects();
            },
            function (response) {
                console.log(response);
            });
        };

        function getProjects(){
            serverDataService.getDevProjects().then(function (data) {
                $scope.projects = data;
            });
        };

        (function(){
            getProjects();
        })()
    }
})();

