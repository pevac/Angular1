(function(){
    "use strict";
    angular
        .module("serverApi",[])
        .factory("serverDataService", getData)
        .factory("serverActService", setData)
        .constant("serverApiConstant",function(){
            var rootUrl = 'http://128.0.169.5:8888/dev-studio/api/';
            return {
                devProjects: rootUrl +  "projects/",
                intProjects: "projects/",
                vacancies: rootUrl +  "vacancies/",
                workingTimes: rootUrl+ "workingtimes/",
                jobPositions: rootUrl+ "jobpositions/",
                customerRequests:rootUrl + "customerrequests/",
                devImage: rootUrl + "images/",
                review: rootUrl+ "internshipfeedback/"
            }
        }());

    function getData($http, serverApiConstant){
         return{
            getDevProjects: function(){
                return $http({
                        method: "GET",
                        url:serverApiConstant.devProjects
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getIntProjects: function(){
                return  $http({
                        method: "GET",
                        url: serverApiConstant.devProjects
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getVacancies:function(){
                return  $http({
                        method: "GET",
                        url: serverApiConstant.vacancies
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

             getWorkingTimes:function(){
                return  $http({
                        method: "GET",
                        url: serverApiConstant.workingTimes
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },
            
            getJobPositions:function(){
                return    $http({
                        method: "GET",
                        url: serverApiConstant.jobPositions
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getCustomers:function(){
                return    $http({
                        method: "GET",
                        url:  serverApiConstant.customerRequests
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getCustomerItem:function(id){
                return    $http({
                        method: "GET",
                        url: serverApiConstant.customerRequests  +id
                    })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getReviews: function(data){
                return  $http({
                    method: "GET",
                    url: serverApiConstant.review,
                }).then(function(response){
                    return response.data;
                })
            },

            getDevImage:   function(imgName, id){
                var url1 =(serverApiConstant.devImage + id+ '/' + imgName)
                return    $http.get(
                     url1,
                    {responseType: "arraybuffer"}
                )
                .then(function(response){
                    return response;
                })
            },

            getDevImage1:   function(imgName, id){
                return (serverApiConstant.devImage + id+ '/' + imgName)
            }

        }
    }

    function setData($http, serverApiConstant){
        return{
            addVacancy: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.vacancies : 
                    serverApiConstant.vacancies  + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            deleteVacancy: function(data){
                return  $http({
                    method: "DELETE",
                    url: serverApiConstant.vacancies  + data.id
                })
            },
            deleteJobPostion: function(data){
                return  $http({
                    method: "DELETE",
                    url: serverApiConstant.jobPositions  + data.id
                })
            },


             deleteCustomerOrder: function(data){
                return  $http({
                    method: "DELETE",
                    url: serverApiConstant.customerRequests  + data.id
                })
            },
            
            addReview: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.review : 
                    serverApiConstant.review + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            addDevProject: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.devProjects : 
                    serverApiConstant.devProjects + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            deleteProject: function(data){
                  return  $http({
                    method: "DELETE",
                    url:  serverApiConstant.devProjects + data.id
                })
            },

            addIntProject: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.devProjects : 
                    serverApiConstant.devProjects + "/" + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            addDevImage:   function(data, id){
                var method =  "POST";
                var url1 =serverApiConstant.devImage + id
                var fd = new FormData();
                fd.append('file', data);
                return  $http({
                    method: method,
                    url: url1,
                    data: fd,
                    transformRequest:angular.identity,
                    headers: {"Content-Type": undefined}
                })
            }
            
        }
    }
})();

