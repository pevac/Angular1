(function () {
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "$location", "serverActService", "$state", "serverDataService", "$rootScope"];

    function addDevPortfolioCtrl($scope, $location, serverActService, $state, serverDataService, $rootScope) {
        var vm = this;
        var isTop;
        if (vm.project) {  isTop = vm.project.inTop; }

        vm.dateOptions = {
            datepickerMode: "'month'",
            minMode: "month"
        };

        vm.formats = ["MMMM yyyy", "yyyy-MM-dd", "MMMM-yyyy", "yyyy/MM", "dd.MM.yyyy"];
        vm.format = vm.formats[0];

        vm.popup1 = {
            opened: false
        };

        vm.popup2 = {
            opened: false
        }

        vm.open1 = function () {
            vm.popup1.opened = true;
        };

        vm.open2 = function () {
            vm.popup2.opened = true;
        };

        vm.goToEdit = function () {
            $rootScope.project = vm.project;
        };

        vm.addProject = function (draft) {
            var project = vm.project;
            project.draft = draft;
            if (project.draft) { project.inTop = false }
            serverActService.addDevProject(vm.project).then(function (response) {
                vm.addImage(response.data)
            },
                function (response) {
                    console.log(response);
                });
        };

        vm.addImage = function (data) {
            var previewImg = vm.previewImg;
            var mainImg = vm.mainImg;
            var project = data;
            serverActService.addDevImage(previewImg, project.id).then(function (response) {
                project.previewImg = previewImg.name;
                serverActService.addDevProject(project).then(function (response) {
                    $state.go("home.devportfolio.list");
                },
                    function (response) {
                    });
            });

            serverActService.addDevImage(mainImg, project.id).then(function (response) {
                project.mainImg = mainImg.name;
                serverActService.addDevProject(project).then(function (response) {
                    $state.go("home.devportfolio.list");
                },
                    function (response) {
                    });
            });
        };

        vm.changeTop = function (project) {
            serverDataService.getDevProjects().then(function (data) {
                var _isCheckTop = isCheckTop(data);

                if (project.id && (_isCheckTop && !project.inTop || !project.inTop && !_isCheckTop || project.inTop && _isCheckTop || isTop && project.inTop && !_isCheckTop)) {

                } else {
                    vm.project.inTop = isTop;
                    alert("Кількість проектів з зафарбованою зіркою не більше 4");
                }
            });
        };

        initForm();

        function addDevProject(data) {
            serverActService.addDevProject(data).then(function (response) {
                getProjects();
            });
        };

        function isCheckTop(arg) {
            var projects = arg;
            var inTop = true;
            var index = 0;
            for (var i = 0; i < projects.length; i++) {
                if (!projects[i].draft && projects[i].inTop) {
                    index++;
                }
                if (index >= 4) {
                    inTop = false;
                }
            }

            return inTop;
        };


        function initForm() {
            if ($location.path().indexOf("edit") === -1) { return; }
            vm.project = $rootScope.project;
            isTop = vm.project.inTop;
            setPreviewImage(vm.project.previewImg, vm.project.id);
            setMainImage(vm.project.mainImg, vm.project.id);
            vm.project.dateStart = new Date(vm.project.dateStart);
            if (vm.project.dateEnd) vm.project.dateEnd = new Date(vm.project.dateEnd);
        };

        function setPreviewImage(name, id) {
           serverDataService.getDevImage(name, id).then(function (response) {
                vm.previewImg =  base64ToFile(response, name);                
            })
        };

         function setMainImage(name, id) {
           serverDataService.getDevImage(name, id).then(function (response) {
                vm.mainImg =  base64ToFile(response, name);                
            })
        };

        function base64ToFile(response, name){
            var arrayBufferView = new Uint8Array(response.data);
            var type = response.headers('content-type') || 'image/WebP';
            var file = new File([arrayBufferView], name, { type: type });
            return file;  
        };

    }
})();





