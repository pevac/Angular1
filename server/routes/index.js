const projects = require("./projects");
const customerrequests = require("./customerrequests");
const workingtimes = require("./workingtimes");
const jobpositions = require("./jobpositions");
const auth = require("./auth");
const images = require("./images");

module.exports = function(app) {
  projects(app, "./data/json/projects.json");
  auth(app, "./data/json/user.json");
  images(app, "./data/images");
  customerrequests(app, "./data/json/customerrequests.json");
  workingtimes(app, "./data/json/workingtimes.json");
  jobpositions(app, "./data/json/jobpositions.json")
};


