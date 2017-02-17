(function(){
    angular.module("bu.validation", [])
        .directive("compareTo",compareTo )

function compareTo (){
  return {
    restrict: 'A', // only activate on element attribute
    require: '?ngModel', // get a hold of NgModelController
    link: function(scope, elem, attrs, ngModel) {
      if(!ngModel) return; // do nothing if no ng-model

      // watch own value and re-validate on change
      scope.$watch(attrs.ngModel, function() {
        validate();
      });

      // observe the other value and re-validate on change
      attrs.$observe('compareTo', function (val) {
        validate();
      });

      var validate = function() {
        if(attrs.compareFrom && attrs.compareTo){
            var date1 = new Date(JSON.parse(attrs.compareFrom));
            var date2 = new Date(JSON.parse(attrs.compareTo));
            var parsedate1 = date1.getTime() ;
            var parsedate2= date2.getTime();
            var equil = parsedate1 >= parsedate2;
            ngModel.$setValidity('compareTo', equil);
        }else{
            ngModel.$setValidity('compareTo', true);
        }
     
      
      };
    }
    };
}
    // function validFile(){
    //     return {
    //         restrict: "A",
    //         require: "ngModel",
    //         scope: {
    //             // array of valid file types e.g ['image/jpeg','image/gif']
    //             fileTypes: "=validFileType",
    //             // maximum file size in bytes
    //             fileSize: "=validFileSize",
    //             // number of files integer
    //         },
    //         link:function(scope,el,attrs,ctrl){
    //             var validType = true;
    //             var validSize = true;

    //             ctrl.$setValidity("validFile", el.val() != '');

    //             //change event is fired when file is selected
    //             el.bind("change",function(){
    //                 validate(el[0].files);
    //                 scope.$apply(function(){
    //                     ctrl.$setViewValue(el.val());
    //                     ctrl.$render();
    //                 });
    //             });

    //             function validate(files) {
    //                 var validType = true;
    //                 var validSize = true;
    //                 var validNumber = true;

    //                 // if file type attribute exists check it.
    //                 if (angular.isUndefined(scope.fileTypes)) {
    //                     scope.fileTypes = [];
    //                 }

    //                 // if file number is not defined set it to one.
    //                 if (angular.isDefined(scope.fileNumber) && files.length > scope.fileNumber) {
    //                     validNumber = false;
    //                 }

    //                 for (var i = 0; i < files.length; i++) {
    //                     var file = files[i];
    //                     // Check file type and size of each file
    //                     if (scope.fileTypes.indexOf(file.type) === -1 && scope.fileTypes.length > 0) {
    //                         validType = false;
    //                     }
    //                     if (angular.isNumber(scope.fileSize) && file.size > scope.fileSize) {
    //                         validSize = false;
    //                     }
    //                     if (!validType || !validSize) {
    //                         break;
    //                     }
    //                 }

    //                 ctrl.$setValidity("validFileType", validType);
    //                 ctrl.$setValidity("validFileSize", validSize);
    //                 ctrl.$setValidity("validFile", el.val() != "");
    //             }
    //         }
    //     }
    // }
})();

