(function(){
    angular.module("resize", []);

    angular.module("resize").directive("resizeTextArea", resizeTextArea);

    function resizeTextArea(){
        return {
            restrict: "A",
            link: function(scope,el,attrs,ctrl){

                el.on("keyup change past cut keydown blur",  resize);

                function resize(){
                    var vm = el[0];
                    vm.style.height = "auto";
                    vm.style.height = vm.scrollHeight+"px";
                }

            }
        }
    }
    
})();