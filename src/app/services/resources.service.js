(function () {
    "use strict";
    angular.module('resourceModule',[]);

     angular.module("resourceModule")
        .config(resourceProvider)
        .run(resourceRun)
        .service("Resources", Resources)
        .constant("serverResourcesConstant",function(){
            var rootUrl = "http://62.80.173.67:8888/dev-studio/api/";
            return {
                devProjects: rootUrl +  "projects/:id/",
                intProjects: rootUrl +  "internshipprojects/:id/",
                vacancies: rootUrl +  "vacancies/:id",
                workingTimes: rootUrl+ "workingtimes/:id/",
                jobPositions: rootUrl+ "jobpositions/:id/",
                customerRequests:rootUrl + "customerrequests/:id/",
                devImage: rootUrl + "images/:id/\:name/",
                intImage: rootUrl + "images/:id/\:name/",
                reviewImage: rootUrl + "images/:id/\:name/",
                review: rootUrl+ "internshipfeedbacks/:id/"
            }
        }())

   

    Resources.$inject = ["$q", "$resource", "serverResourcesConstant"];
    function Resources($q, $resource, serverResourcesConstant){
        var fileConfig =  { 
            get:    {
                method: "GET", 
                cache:false,
                responseType:'arraybuffer', 
                transformResponse: function(data, headersGetter) {
                    return { data : data, headers: headersGetter };
                }
            },
            save: {
                method: "POST",
                transformRequest: function(request) {
                    var fd = new FormData();
                    fd.append("file", request.data);
                    return fd;
                },
                headers: {'Content-Type':undefined}
            }
        };
        var fileParams = {id: "@id", name: "@name"};

        var mainConfig = { update: {  method: "PUT" }};
        var mainParams = {id: "@id"};

        function defer(){
            return $q.defer();
        }

        function execQuery(method, data, resource){
            var d = defer();

            resource[method]( 
                data,
                function(response){ 
                    d.resolve(response);
                },
                function (response){ 
                     d.reject(response);
                }
            );

            return d.promise;
        }

        function createResource(url, params, config){
            return $resource(url, params || mainParams, config || mainConfig);
        }

        function BaseManager(url){
            this.sources = {
                main: createResource(url),
            };
        }

        BaseManager.prototype.getById = function(id){
            return execQuery('get', {id: id}, this.sources.main);
        };

        BaseManager.prototype.getAll = function(){
            return execQuery('query', {}, this.sources.main);
        };

        BaseManager.prototype.remove = function(id){
            return execQuery('remove', {id: id}, this.sources.main);
        };

        BaseManager.prototype.save = function(item){
            var method = item.hasOwnProperty('id') ? 'update' : 'save';
            return execQuery(method, item, this.sources.main);
        };

        function FileBaseManager(itemUrl, fileUrl){
            BaseManager.apply(this, [itemUrl]);
            this.sources.file = createResource(fileUrl, fileParams, fileConfig);
        }
        
        FileBaseManager.prototype = Object.create(BaseManager.prototype);
        FileBaseManager.prototype.constructor = FileBaseManager;

        FileBaseManager.prototype.getFileById = function(name, id){
            return execQuery('get', {name: name, id: id}, this.sources.file);
        };
        FileBaseManager.prototype.saveFile = function(data, id){
            return execQuery('save', {id: id, data: data}, this.sources.file);
        };
        FileBaseManager.prototype.getImageUrl = function(imgName, id){
            return serverResourcesConstant.reviewImage.replace(":id/\:name/", id + "/" + imgName)
        };

        function DevProjects(){
            FileBaseManager.apply(this, [serverResourcesConstant.devProjects, serverResourcesConstant.devImage]);
        }
        DevProjects.prototype = Object.create(FileBaseManager.prototype);
        DevProjects.prototype.constructor = DevProjects;

        function Customers(){
            BaseManager.apply(this, [serverResourcesConstant.customerRequests]);
        }
        Customers.prototype = Object.create(BaseManager.prototype);
        Customers.prototype.constructor = Customers;

        function Vacancies(){
            BaseManager.apply(this, [serverResourcesConstant.vacancies]);
        }
        Vacancies.prototype = Object.create(BaseManager.prototype);
        Vacancies.prototype.constructor = Vacancies;

        function JobPositions(){
            BaseManager.apply(this, [serverResourcesConstant.jobPositions]);
        }
        JobPositions.prototype = Object.create(BaseManager.prototype);
        JobPositions.prototype.constructor = JobPositions;

        function WorkingTimes(){
            BaseManager.apply(this, [serverResourcesConstant.workingTimes]);
        }
        WorkingTimes.prototype = Object.create(BaseManager.prototype);
        WorkingTimes.prototype.constructor = WorkingTimes;

        function IntProjects(){
            FileBaseManager.apply(this, [serverResourcesConstant.intProjects, serverResourcesConstant.intImage]);
        }
        IntProjects.prototype = Object.create(FileBaseManager.prototype);
        IntProjects.prototype.constructor = IntProjects;

        function Reviews(){
            FileBaseManager.apply(this, [serverResourcesConstant.review, serverResourcesConstant.reviewImage]);
        }
        Reviews.prototype = Object.create(FileBaseManager.prototype);
        Reviews.prototype.constructor = Reviews;
            
        return {
            DevProjects: new DevProjects(),
            Customers: new Customers(),
            Vacancies: new Vacancies(),
            JobPositions: new JobPositions(),
            WorkingTimes: new WorkingTimes(),
            IntProjects: new IntProjects(),
            Reviews: new Reviews()
        };
    };



    resourceRun.$inject = ["$http", "$sessionStorage"];
    function resourceRun($http, $sessionStorage){
        $http.defaults.headers.post["X-CSRFToken"] = $sessionStorage.$default().csrftoken;
        $http.defaults.headers.common["X-CSRFToken"] = $sessionStorage.$default().csrftoken;
    };

    resourceProvider.$inject = ["$resourceProvider"];
    function resourceProvider($resourceProvider){
        $resourceProvider.defaults.stripTrailingSlashes = false;
    };

}());