(function () {
    "use strict";
    angular.module("resourceModule",[]);

     angular.module("resourceModule")
        .config(resourceProvider)
        .factory("Resources", Resources)
        .constant("serverResourcesConstant",function(){
            // var rootUrl = "http://www.edu.bionic-university.com:2101/dev-studio/";
            
            var rootUrl = "/dev-studio/";
            return {
                devProjects: rootUrl +  "api/projects/:id/",
                intProjects: rootUrl +  "api/internshipprojects/:id/",
                vacancies: rootUrl +  "api/vacancies/:id/",
                workingTimes: rootUrl+ "api/workingtimes/:id/",
                jobPositions: rootUrl+ "api/jobpositions/:id/",
                customerRequests:rootUrl + "api/customerrequests/:id/",
                devImage: rootUrl + "api/images/:id/\:name/",
                intImage: rootUrl + "api/images/:id/\:name/",
                reviewImage: rootUrl + "api/images/:id/\:name/",
                review: rootUrl+ "api/internshipfeedbacks/:id/",
                users: rootUrl+ "api/internshipfeedbacks/:id/",
                userImage: rootUrl + "api/images/:id/\:name/"
            }
        }());

    resourceProvider.$inject = ["$resourceProvider"];
    function resourceProvider($resourceProvider){
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }

    Resources.$inject = [ "$resource", "serverResourcesConstant"];
    function Resources($resource, serverResourcesConstant){
        var fileConfig =  { 
            getFile:    {
                method: "GET", 
                cache:false,
                responseType:'arraybuffer', 
                transformResponse: function(data, headersGetter) {
                    return { data : data, headers: headersGetter };
                }
            },
            saveFile: {
                method: "POST",
                transformRequest: function(request) {
                    var fd = new FormData();
                    fd.append("file", request.data);
                    return fd;
                },
                headers: {"Content-Type":undefined}
            }
        };
        var fileParams = {id: "@id", name: "@name"};

        var mainConfig = { update: {  method: "PUT" }};
        var mainParams = {id: "@id"};

        var  DevProjects =  $resource(serverResourcesConstant.devProjects, mainParams, mainConfig);
        var  DevProjectFile =  $resource(serverResourcesConstant.devImage, fileParams, fileConfig);

        var  Customers =  $resource(serverResourcesConstant.customerRequests, mainParams, mainConfig);
        var  JobPositions =  $resource(serverResourcesConstant.jobPositions, mainParams, mainConfig);
        var  WorkingTimes =  $resource(serverResourcesConstant.workingTimes, mainParams, mainConfig);
        var  Vacancies =  $resource(serverResourcesConstant.vacancies, mainParams, mainConfig);

        var  IntProjects =  $resource(serverResourcesConstant.intProjects, mainParams, mainConfig);
        var  IntProjectFile =  $resource(serverResourcesConstant.intImage, fileParams, fileConfig);

        var  Reviews =  $resource(serverResourcesConstant.review, mainParams, mainConfig);
        var  ReviewFile =  $resource(serverResourcesConstant.reviewImage, fileParams, fileConfig);
        var  ReviewImageURl =  function(imgName, id){
                 return serverResourcesConstant.reviewImage.replace(":id/\:name/", id + "/" + imgName);
        };

        var  Users =  $resource(serverResourcesConstant.users, mainParams, mainConfig);
        var  UsersFile =  $resource(serverResourcesConstant.userImage, fileParams, fileConfig);
        var  UserImageURl =  function(imgName, id){
                 return serverResourcesConstant.userImage.replace(":id/\:name/", id + "/" + imgName);
        };
        
        return {
            DevProjects:  DevProjects,
            DevProjectFile: DevProjectFile,
            Customers:  Customers,
            Vacancies:  Vacancies,
            JobPositions:  JobPositions,
            WorkingTimes:  WorkingTimes,
            IntProjects:  IntProjects,
            IntProjectFile: IntProjectFile,
            Reviews:  Reviews,
            ReviewFile: ReviewFile,
            ReviewImageURl: ReviewImageURl,
            Users:  Users,
            UsersFile: UsersFile,
            UserImageURl: UserImageURl
        };
    }

}());