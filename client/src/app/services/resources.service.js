(function () {
    "use strict";
    angular.module("resourceModule",[]);

     angular.module("resourceModule")
        .config(resourceProvider)
        .factory("Resources", Resources)
        .constant("serverResourcesConstant",function(){
            // var rootUrl = "http://www.edu.bionic-university.com:2101/dev-studio/";
            
            var rootUrl = "/dev-studio";
            return {
                devProjects: rootUrl +  "/api/projects/:id/",
                intProjects: rootUrl +  "/api/internshipprojects/:id/",
                vacancies: rootUrl +  "/api/vacancies/:id/",
                workingTimes: rootUrl+ "/api/workingtimes/:id/",
                jobPositions: rootUrl+ "/api/jobpositions/:id/",
                customerRequests:rootUrl + "/api/customerrequests/:id/",
                devImage: rootUrl + "/api/images/:id/\:name/",
                intImage: rootUrl + "/api/images/:id/\:name/",
                reviewImage: rootUrl + "/api/images/:id/\:name/",
                review: rootUrl+ "/api/internshipfeedbacks/:id/",
                users: rootUrl+ "/api/internshipfeedbacks/:id/",
                userImage: rootUrl + "/api/images/:id/\:name/"
            }
        }());

    resourceProvider.$inject = ["$resourceProvider"];
    function resourceProvider($resourceProvider){
        $resourceProvider.defaults.stripTrailingSlashes = false;
        $resourceProvider.defaults.actions = {
            get: { method: 'GET' },
            create: { method: 'POST' },
            query: { method: 'GET', isArray: true },
            remove: { method: 'DELETE' },
            delete: { method: 'DELETE' },
            update: { method: 'PUT' },
            getFile: {
                method: "GET",
                cache: false,
                responseType: 'arraybuffer',
                transformResponse: function (data, headersGetter) {
                    return { data: data, headers: headersGetter };
                } 
            },
            saveFile: {
                method: "POST",
                transformRequest: function (request) {
                    var fd = new FormData();
                    fd.append("file", request.data);
                    return fd;
                },
                headers: { "Content-Type": undefined }
            }
        }

    }

    Resources.$inject = [ "$resource", "serverResourcesConstant"];
    function Resources($resource, serverResourcesConstant){
        var fileParams = {id: "@id", name: "@name"};
        var mainParams = {id: "@id"};

        var  DevProjects =  $resource(serverResourcesConstant.devProjects, mainParams);
        var  DevProjectFile =  $resource(serverResourcesConstant.devImage, fileParams);

        var  Customers =  $resource(serverResourcesConstant.customerRequests, mainParams);
        var  JobPositions =  $resource(serverResourcesConstant.jobPositions, mainParams);
        var  WorkingTimes =  $resource(serverResourcesConstant.workingTimes, mainParams);
        var  Vacancies =  $resource(serverResourcesConstant.vacancies, mainParams);

        var  IntProjects =  $resource(serverResourcesConstant.intProjects, mainParams);
        var  IntProjectFile =  $resource(serverResourcesConstant.intImage, fileParams);

        var  Reviews =  $resource(serverResourcesConstant.review, mainParams);
        var  ReviewFile =  $resource(serverResourcesConstant.reviewImage, fileParams);
        var  ReviewImageURl =  function(imgName, id){
                 return serverResourcesConstant.reviewImage.replace(":id/\:name/", id + "/" + imgName);
        };

        var  Users =  $resource(serverResourcesConstant.users, mainParams);
        var  UsersFile =  $resource(serverResourcesConstant.userImage, fileParams);
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