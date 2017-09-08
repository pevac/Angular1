var fs = require("fs-extra");
const uniqid = require("uniqid");

module.exports = function(app, filePath){
  app.get("/api/images/:id/\:name/", function(req, res, next) {
    res.json("Succes");
  });

  app.post("/api/images/:id", function(req, res, next) {
    const id = req.params.id;

    for(var i=0; i< 100000;i++) {}
    // fs.outputFile("./data/images/2/img.png", "req.rawBody")
    //   .then(() => {
    //     res.send("Successful Update")
    //   })
    //   .catch(err => {
    //     console.error(err)
    //   })
    // fs.writeFile("./data/images/2/img.png", binaryData,   function(error) {
    //   if (error) { throw error; }

    //   res.send("Successful Update")
    // });
 
    res.send("Successful Update")
   
  });

}




