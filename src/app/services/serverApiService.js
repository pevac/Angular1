angular
    .module('serverApi',[])
    .factory('serverDataService', getData)
    .factory('serverActService', setData)
    .constant('serverApiConstant',{
        url : '/js/api'
    });


function getData($http, serverApiConstant){
    return{
        getProjects: function(successFunction){
                $http({
                    method: "GET",
                    url: serverApiConstant.url+"/stat"
                })
                    .success(function (response) {
                        var data = [
                            response.stat[0].onlineUsers,
                            (response.stat[0].totalUsers-response.stat[0].onlineUsers)
                        ];
                        successFunction(response.stat[0].totalUsers,
                                        response.stat[0].onlineUsers,
                                        response.stat[0].clusterName,
                                        response.stat[0].totalNodes,
                                        data)

                    });
            },
        getVacansies:function(successFunction){
                $http({
                    method: "GET",
                    url: serverApiConstant.url+"/users"
                })
                    .success(function (response) {
                        successFunction(response.users);
                    });

            }
    }
};

function setData($http, serverApiConstant){
    return{
        addVacancy: function(id, successFunction){
            $http({
                method: "GET",
                url: serverApiConstant.url+'/del_user?id='+id
            })
                .success(function () {
                    console.log('deleted id='+ id);
                    successFunction();
                });
        }
    }
}