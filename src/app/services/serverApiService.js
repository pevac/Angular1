angular
    .module('serverApi',[])
    .factory('serverDataService', getData)
    .factory('serverActService', setData)
    .constant('serverApiConstant',{
        url : '/js/api'
    });


function getData($http, serverApiConstant){
    var projects =[{name: "First", company : 'Luxoft', year: '2016', isNew : true, isDraft : false},
        {name: 'second', company: 'Epam',year: '2016',isNew : false, isDraft : false},
        {name: 'second2', company: 'Epam3', year: '2016', isNew : false, isDraft : false},
        {name: 'second3', company: 'Epam4', year: '2016', isNew : false, isDraft : true},
        {name: 'second4', company: 'Epam2', year: '2016', isNew : true, isDraft : false}];

    return{
        getDevProjects: function(){
            console.log('here');
            return projects;
            },
        getIntProjects: function(){
            console.log('here');
            return projects;
        },
        getVacancies:function(successFunction){
                $http({
                    method: "GET",
                    url: serverApiConstant.url+"/vacancies"
                })
                    .success(function (response) {
                        successFunction();
                    })

            }
    }
};

function setData($http, serverApiConstant){
    return{
        addVacancy: function(data, successFunction){
            $http({
                method: "POST",
                url: serverApiConstant.url+'',
                data:''
            })
                .success(function () {
                    successFunction();
                });
        }
    }
}