(function(){
    angular.module('usersModule')
        .controller('addUsersCtrl', addUsersCtrl)

    addUsersCtrl.$inject = ["$scope","$stateParams",  "serverActService"];

    function addUsersCtrl($scope,  $stateParams,   serverActService) {
        $scope.upload = function (dataUrl, foto) {
            var image = dataUrl;
            var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
            var blob = base64ToBlob(base64ImageContent, foto);   
                console.log(blob);

            serverActService.addDevImage(foto, 2).then(function (response) {
                            console.log(response);
            });

            function base64ToBlob(base64, foto){
                mime = foto.type || '';
                var sliceSize = foto.size || 1024;
                var byteChars = window.atob(base64);
                var byteArrays = [];

                for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                    var slice = byteChars.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    var byteArray = new Uint8Array(byteNumbers);

                    byteArrays.push(byteArray);
                }

                var blob = new Blob(byteArrays, {type: mime});
                blob.name = foto.name;
                
                return blob;
            }

        }

    }
})();

