(function(){
    angular.module("imageService", [])
        .factory("ImageService", ImageService);

        ImageService.$inject = ["$q"];
        function ImageService($q){
            var imageService = {
                bufferArrayResponceToFile: bufferArrayResponceToFile,
                fileToObject: fileToObject,
                base64ToFile:base64ToFile,
                fileRead:fileRead
            }

            return imageService;

            function bufferArrayResponceToFile(response, name){
                var blob;
                var arrayBufferView = new Uint8Array(response.data);
                var type = response.headers('content-type') || 'image/WebP';
                blob = new Blob([arrayBufferView], { type: type });
                blob.name = name;
                return  blob;
            };

            function base64ToBlob(base64, file){
                var base64ImageContent = base64.replace(/^data:image\/(png|jpg);base64,/, "");
                var mime = file.type || '';
                var sliceSize = file.size || 1024;
                var byteChars = window.atob(base64ImageContent);
                var byteArrays = [];

                for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                    var slice = byteChars.slice(offset, offset + sliceSize);

                    var byteNumbers = new Array(slice.length);
                    for (var i = 0; i < slice.length; i++) {
                        byteNumbers[i] = slice.charCodeAt(i);
                    }

                    byteArrays.push(new Uint8Array(byteNumbers));
                }

                var blob = new Blob(byteArrays,  {type:mime});
                blob.name = file.name;
                return blob;
            }

            function base64ToFile(base64, file){
                var blob = base64ToBlob(base64, file);
                
                var file =  new File([blob], file.name, {type: file.type});
                return file;
            }

            function fileToObject(file){
                var reader = new FileReader();
                var newfile = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    $ngfBlobUrl: file.$ngfBlobUrl,
                    $ngfName: file.$ngfName
                }
                return fileRead(file).then(function(data){
                    newfile.data = data;
                    return newfile;
                })                
            };

            function fileRead(file) {
                var deferred = $q.defer();

                var reader = new FileReader();

                reader.onload = function() {
                    deferred.resolve(reader.result);
                };

                reader.readAsDataURL(file);

                return deferred.promise;
            };
        }

})();