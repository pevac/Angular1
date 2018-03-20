(function(){
    angular.module("bu.validation", [])
        .directive("compareTo", compareTo )
        .directive("messageModel", messageModel);
        

    function messageModel(){
        return {
            restrict: "A",
            scope: {
                messageModel: "="
            },
            link: function(scope, elem, attrs){
                var messageModel = {};
                var valid = ["ngMaxlength", "ngMinlength"]
                for(var i = 0; i< valid.length; i++){
                    if(attrs[valid[i]]){
                        messageModel[valid[i]]= attrs[valid[i]];
                    }
                }

                scope.messageModel = messageModel;
            }
        }
    }

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
                attrs.$observe('compareTo', function () {
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
})();

