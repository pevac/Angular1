(function(){
    "use strict";
    angular
        .module("serverApi",[])
        .factory("serverDataService", getData)
        .factory("serverActService", setData)
        .constant("serverApiConstant",{
            url : 'http://128.0.169.5:8888/dev-studio/api/',
            // url : 'http://192.168.10.168:8080/api/',
            
            devProjects: "projects/",
            intProjects: "projects/",
            vacancies: "vacancies/",
            workingTimes: "workingtimes/",
            jobPositions: "jobpositions/",
            customerRequests: "customerrequests/",
            devImage: "images/",
            review: "internshipfeedback/"
        });

     
       

    function getData($http, serverApiConstant){
         return{
            getDevProjects: function(){
                return    $http({
                    method: "GET",
                    url:serverApiConstant.url + serverApiConstant.devProjects
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getIntProjects: function(){
                return    $http({
                    method: "GET",
                    url:serverApiConstant.url + serverApiConstant.devProjects
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getVacancies:function(){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url + serverApiConstant.vacancies
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

             getWorkingTimes:function(){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url+serverApiConstant.workingTimes
                })
                    .then(function (response) {
                        return response.data;
                    })
            },
            
            getJobPositions:function(){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url+serverApiConstant.jobPositions
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getCustomers:function(){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url + serverApiConstant.customerRequests
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getCustomerItem:function(id){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url+serverApiConstant.customerRequests  +id
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

              getReviews: function(data){
                return  $http({
                    method: "GET",
                    url: serverApiConstant.url+serverApiConstant.review,
                }).then(function(response){
                    return response.data;
                })
            },

             getDevImage:   function(imgName, id){
                var url1 =(serverApiConstant.url +serverApiConstant.devImage + id+ '/' + imgName)
                 return    $http.get(
                     url1,
                    {responseType: "arraybuffer"}
                )
                .then(function(response){
                    return response;
                })
            },

               getDevImage1:   function(imgName, id){
                return (serverApiConstant.url +serverApiConstant.devImage + id+ '/' + imgName)
            }

        }
    }

    function setData($http, serverApiConstant){
        return{
            addVacancy: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.vacancies : 
                    serverApiConstant.url+serverApiConstant.vacancies  + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },
            
            addReview: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.review : 
                    serverApiConstant.url+serverApiConstant.review + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            addDevProject: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.devProjects : 
                    serverApiConstant.url+serverApiConstant.devProjects + "/" + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            addIntProject: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.devProjects : 
                    serverApiConstant.url+serverApiConstant.devProjects + "/" + data.id;

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },

            addDevImage:   function(data, id){
                var method =  "POST";
                var url1 =serverApiConstant.url+ serverApiConstant.devImage + id
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

