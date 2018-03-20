const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt    = require("jsonwebtoken");
const moment = require("moment");
const timeout = require("connect-timeout");
const config = require("./config.js");
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();
app.use(timeout("5s"))

app.use(logger("dev"));
app.use(haltOnTimedout);
app.use(bodyParser.json());
app.use(haltOnTimedout)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(haltOnTimedout)
app.use(methodOverride());
app.use(express.query());
app.use(cors({
    origin: '*',
}));
app.disable('x-powered-by');
app.use(cookieParser());
app.use(haltOnTimedout)
// app.use(express.static(path.join(__dirname, "./server/data/images")));
app.use(haltOnTimedout);

app.use(function(req, res, next) {
  if (req.url.indexOf("images") == -1) {
    next();
    return;
  }
  var data="";
  req.setEncoding("utf8");
  req.on("data", function(chunk) {
    data += chunk;
  });
  req.on("end", function() {
    req.rawBody= data;
    next();
  });
});

app.set("superSecret", config.TOKEN_SECRET);

function haltOnTimedout (req, res, next) {
  if (!req.timedout) next()
}


app.use(function(req, res, next) {
  if (req.url.indexOf("auth") != -1) {
    next();
    return;
  }
      
  if (!req.header("Authorization")) {
    return res.status(403).send({ 
      success: false, 
      message: "No token provided." 
    });
  }

  let token =req.header("Authorization").split(" ")[1];

  jwt.verify(token, app.get("superSecret"), function(err, decoded) { 
    if (err) {
      return res.status(401).send({ success: false, message: "Failed to authenticate token." });    
    } 

    if (decoded.exp <= moment().unix()) {
      return res.status(401).send({ success: false, message: "Token has expired" });
    }

    req.decoded = decoded;    
    next();
  });
});


require("./routes")(app);

app.use(function(req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
