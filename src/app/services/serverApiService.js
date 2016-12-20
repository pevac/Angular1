(function(){
    "use strict";
    angular
        .module("serverApi",[])
        .factory("serverDataService", getData)
        .factory("serverActService", setData)
        .constant("serverApiConstant",{
            // url : "http://128.0.169.5:8888/dev-studio/api/",
            url : 'http://192.168.10.91:8080/api/',
            devProjects: "projects",
            intProjects: "projects",
            vacancies: "vacancies",
            workingtimes: "workingtimes",
            jobpositions: "jobpositions",
            customerrequests: "customerrequests"

            // devProjects: "project/",
            // intProjects: "project/",
            // vacancies: "vacancie/",
            // workingTimes: "workingtime/",
            // jobPositions: "jobposition/",
            // customerRequests: "customerrequest/"
        });
       

    function getData($http, serverApiConstant){
        var projects =[{name: "First", company : 'Luxoft', year: '2016', isNew : true, isDraft : false},
            {name: 'second', company: 'Epam',year: '2016',isNew : false, isDraft : false},
            {name: 'second2', company: 'Epam3', year: '2016', isNew : false, isDraft : false},
            {name: 'second3', company: 'Epam4', year: '2016', isNew : false, isDraft : true},
            {name: 'second4', company: 'Epam2', year: '2016', isNew : true, isDraft : false}];
        var vacancies = [{dataRegist: "12/12/12", jobName: "Frontend", projectName: "CRM", showStatus: true,  activeStatus: true },
            {dataRegist: "12/12/12", jobName: "Frontend", projectName: "CRM", showStatus: true,  activeStatus: true },
            {dataRegist: "12/12/12", jobName: "Frontend", projectName: "CRM", showStatus: true,  activeStatus: true },
            {dataRegist: "12/12/12", jobName: "Frontend", projectName: "CRM", showStatus: true,  activeStatus: true }, ]

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
                    url: serverApiConstant.url + serverApiConstant.customerrequests
                })
                    .then(function (response) {
                        return response.data;
                    })
            },

            getCustomerItem:function(id){
                return    $http({
                    method: "GET",
                    url: serverApiConstant.url+serverApiConstant.customerrequests + "/" +id
                })
                    .then(function (response) {
                        return response.data;
                    })
            }
        }
    }

    function setData($http, serverApiConstant){
        return{
            addVacancy: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.vacancies : 
                    serverApiConstant.url+serverApiConstant.vacancies + "/" + data.id;
                console.log(method);
                console.log(url1);

                return  $http({
                    method: method,
                    url: url1,
                    data: data
                })
            },
            
            addReview: function(data){
                var method = (!data.id || data.id === "") ? "POST" : "PUT";
                var url1 = (!data.id || data.id === "") ? 
                    serverApiConstant.url+serverApiConstant.devProjects : 
                    serverApiConstant.url+serverApiConstant.devProjects + "/" + data.id;
                console.log(method);
                console.log(url1);

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
                var url1 ="http://192.168.10.91:8080/api/images/" + id
                var fd = new FormData();
                fd.append('file', data);
                return  $http({
                    method: method,
                    url: url1,
                    data: fd,
                    transformRequest: angular.identity,
                    withCredentials : true,
                    headers: {'Content-Type': 'multipart/form-data'}
                })
            },

        }
    }
})();

