const fs = require("fs-extra");
const jwt    = require("jsonwebtoken");
const moment = require("moment");


module.exports = function(app, filePath){
    app.post("/auth/login", function(req, res) {
        fs.readFile(filePath,  function(err, data){
            let users  = JSON.parse(data);
            
            let user = null;
            for(let i=0; i<users.length; i++) {
                if(users[i].username == req.body.userName){
                    user = users[i];
                }
            }
            if (err) throw err;
            
            if (!user) {
                return res.status(401).send({success: false, message: 'Invalid email and/or password' });
            }

            if (user.password != req.body.password) {
                return res.status(401).send({success: false, message: 'Invalid email and/or password' });
            } else {
                let payload = {
                    sub: user.id,
                    iat: moment().unix(),
                    exp: moment().add(14, "days").unix()
                };

                let token = jwt.sign(payload, app.get("superSecret"), { });
                    
                res.json({
                        user: user,
                        success: true,
                        message: "Enjoy your token!",
                        token: token
                });
            }   
        });
    });
}