"use strict";

module.exports =  (options, $) => {
    return (done) => {
        return new Promise(function(resolve, reject) {
            $.protractor[options.webdriver];
            resolve();
          });
    }
}