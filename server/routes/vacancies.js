const fs = require("fs-extra");
const util = require("./util");

module.exports = function(app, filePath){
  app.get("/api/vacancies/", function(req, res, next) {
    util.get(filePath)
        .then( (vacancies) => { 
          return util.get("./data/json/projects.json")
          .then( (projects) => {
            vacancies.map((item)=>{
              var project = projects.find((element)=>{
                return element.id ===item.projectId
              });
              delete item.projectId;
              item.project = project;
              return item;
            });
            return req.json(vacancies);
          });
        })
  });

  app.get("/api/vacancies/:id", function(req, res, next) {
    util.getById(filePath, req.params.id)
        .then( (data) => { res.json(data); })
  });

  app.post("/api/vacancies/", function(req, res, next) {
    var body = {
      description: req.body.description,
      open: req.body.open,
      date: req.body.date,
      info: req.body.info,
      workingTimeId: req.body.workingTime.id,
      jobPositionId: req.body.jobPosition.id,
      projectId: req.body.project.id,
    }
    util.post(filePath, body)
        .then( (data) => { 
          res.json(data); 
        })
  });

  app.put("/api/vacancies/:id", function(req, res, next) {
    util.put(filePath, req.body, req.params.id)
        .then( (data) => {  res.json(data); })
  });

  app.delete("/api/vacancies/:id", function(req, res, next) {
    util.put(filePath,  req.params.id)
    .then( (data) => {  res.send("Successful Delete"); })
  });
}




