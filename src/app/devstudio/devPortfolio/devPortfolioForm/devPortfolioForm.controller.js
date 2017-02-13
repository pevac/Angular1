(function () {
    "use strict";
    angular.module("devPortfolioModule")
        .controller("addDevPortfolioCtrl", addDevPortfolioCtrl)

    addDevPortfolioCtrl.$inject = ["$scope", "$location", "serverActService", "$timeout", "$state", "serverDataService", "$rootScope"];

    function addDevPortfolioCtrl($scope, $location, serverActService, $timeout, $state, serverDataService, $rootScope) {
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
            $rootScope.previewImg = vm.previewImg;
            $state.go( 'home.devportfolio.viewportfolio', { previousState : { name : $state.current.name } }, {} );
        };

        vm.addProject = function (draft) {
            vm.dataLoading =true;
            var project = vm.project;
            project.draft = draft;
            if (project.draft) { project.inTop = false }
            serverActService.addDevProject(vm.project).then(function (response) {
                addFullImage(response.data)
            },
                function (response) {
                    console.log(response);
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

        function addFullImage(data) {
            var previewImg = vm.previewImg;
            var mainImg = vm.mainImg;
            var project = data;

            addImage(previewImg, project,"previewImg");
            addImage(mainImg, project, "mainImg");
            $timeout(function () {
                vm.dataLoading =false;
                $state.go("home.devportfolio.list");
            }, 1000);
        };

        function addImage(image, project, name){
            if(!image && !image.lastModifiedDate) {return;}
            serverActService.addDevImage(image, project.id).then(function (response) {
                project[name] = image.name;
                serverActService.addDevProject(project).then(function (response) {
                    $timeout(function () {
                       $state.go("home.devportfolio.list");
                    }, 1000);
                },
                    function (response) {
                });
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
            vm.previewImg = $rootScope.previewImg;
            isTop = vm.project.inTop;
            if(!vm.previewImg) setImage(vm.project.previewImg, vm.project.id, "previewImg");
            setImage(vm.project.mainImg, vm.project.id, "mainImg");
            vm.project.dateStart = new Date(vm.project.dateStart);
            if (vm.project.dateEnd) vm.project.dateEnd = new Date(vm.project.dateEnd);
        };

        function setImage(img, id, name) {
           serverDataService.getDevImage(img, id).then(function (response) {
                vm[name] =  base64ToFile(response, img); 
            })
        };

        function base64ToFile(response, name){
            var file;
            var blob;
            var arrayBufferView = new Uint8Array(response.data);
            var type = response.headers('content-type') || 'image/WebP';
         
            if (window.navigator && window.navigator.msSaveOrOpenBlob) { 
                blob = new Blob([arrayBufferView], { type: type });
                blob.name = name;
                window.navigator.msSaveOrOpenBlob(blob, name); 
            } else{
               file = new File([arrayBufferView], name, { type: type });
            }

            return file || blob;
        };

    }
})();





