const fs = require("fs-extra");
const uniqid = require("uniqid");
const uuidv5 = require('uuid/v5');

exports.get = (filePath) => {
                return fs.readFile(filePath, "utf8").then(
                    (data) => {
                        return JSON.parse(data);
                    });
            };

exports.getById =   (filePath, id) => {
                        return fs.readFile(filePath, "utf8")
                            .then(
                                (data) => {
                                    let content  = JSON.parse(data);
                                    let item = {};
                                    for(let i=0; i<content.length; i++){
                                        if(content[i].id == id){
                                            item = content[i];
                                        }
                                    }
                                    return item;
                            })
                            .catch((error) => { console.log(error); });
                    };

exports.post = (filePath, body) => {
                    return fs.readFile(filePath, "utf8")
                        .then((data) => {
                                let content  = JSON.parse(data);
                                let item  = body;
                                item.id = uuidv5(uuidv5.URL, uuidv5.DNS);
                                content.push(item);
                                return fs.outputFile(filePath, JSON.stringify(content)).then(() => { return item; });
                                
                        })
                        .catch((error) => { console.log(error); });
                };
exports.put = (filePath, body, id) => {
                    return fs.readFile(filePath, "utf8")
                        .then((data) => {
                            let content  = JSON.parse(data);
                            
                            for(let i=0; i<content.length; i++){
                                if(content[i].id === body.id){
                                    content[i] = body;
                                }
                            }
                            
                            return fs.outputFile(filePath, JSON.stringify(content)).then(() => { return body; });
                        })
                        .catch((error) => { console.log(error); });
                };

exports.delete = (filePath, id) => {
                    return fs.readFile(filePath, "utf8")
                        .then((data) => {
                            let content  = JSON.parse(data);
                            
                            for(let i=0; i<content.length; i++){
                                if(content[i].id == id){
                                    content.splice(i, 1);
                                    --i;
                                }
                            }
                            
                            return fs.outputFile(filePath, JSON.stringify(content)).then(() => { return true; });
                        })
                        .catch((error) => { console.log(error); });
                };