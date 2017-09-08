const fs = require("fs-extra");
const util = require("./util");

module.exports = function(app, filePath){
  app.get("/api/workingtimes/", function(req, res, next) {
    util.get(filePath)
        .then( (data) => { res.json(data); })
  });

  app.get("/api/workingtimes/:id", function(req, res, next) {
    util.getById(filePath, req.params.id)
        .then( (data) => { res.json(data); })
  });

  app.post("/api/workingtimes/", function(req, res, next) {
    util.post(filePath, req.body)
        .then( (data) => { res.json(data); })
  });

  app.put("/api/workingtimes/:id", function(req, res, next) {
    util.put(filePath, req.body, req.params.id)
        .then( (data) => {  res.json(data); })
  });

  app.delete("/api/workingtimes/:id", function(req, res, next) {
    util.put(filePath,  req.params.id)
    .then( (data) => {  res.send("Successful Delete"); })
  });
}




