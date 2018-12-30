 // Dependecies
 const http = require('http');
 const url = require('url');
 const StringDecoder = require('string_decoder').StringDecoder;
require('./apphamdone')

let handlers = {};

handlers.home = function (data, callback) {
  callback(200, {'location':'home'});
};

handlers.users = function (data, callback) {
    let methodes=['get','post','delete','put'];
    if(methodes.indexOf(data.method)>-1){

        handlers._users[data.method](data,callback);

    }
    else{

        callback(400)
    }
 // callback(200, {'location':'users'});
};

handlers.pink = function (data, callback) {
    callback(200, {'location':'pink'});
  };


handlers.notFound = function (data, callback) {
    callback(404);
  };


