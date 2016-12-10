angular
    .module('serverApi',[])
    .factory('serverDataService', getData)
    .factory('serverActService', setData)
    .constant('serverApiConstant',{
        url : 'http://128.0.169.5:8888/dev-studio/api/'
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
                url:serverApiConstant.url + "project/"
            })
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
            },
        getIntProjects: function(){
            console.log('here');
            return projects;
        },


        getVacancies:function(){
            return    $http({
                method: "GET",
                url: serverApiConstant.url+"vacancies/"
            })
                .then(function (response) {
                    return response.data;
                })
        },
        getJobPositions:function(){
              return    $http({
                method: "GET",
                url: serverApiConstant.url+"jobpositions/"
            })
                .then(function (response) {
                    return response.data;
                })
        },
        getCustomers:function(){
              return    $http({
                method: "GET",
                url: serverApiConstant.url+"/customerrequest/"
            })
                .then(function (response) {
                    return response.data;
                })
        }


    }


};

function setData($http, serverApiConstant){
    return{
        addVacancy: function(data){
          return  $http({
                method: "POST",
                url: serverApiConstant.url+'addvacancy',
                data: data
            })

        },
        addReview: function(data){
            return  $http({
                method: "POST",
                url: serverApiConstant.url+'addreview',
                data: data
            })
        }


    }
}