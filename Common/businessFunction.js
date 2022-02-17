
var log4js = require('log4js');
var request = require('request');

var log = log4js.getLogger('SendRequest');
log.level = 'debug';

exports.get = function (url, headers, bodyObject, cb) {
    call('GET', url, headers, bodyObject, cb);
};

exports.delete = function (url, headers, bodyObject, cb) {
    call('DELETE', url, headers, bodyObject, cb);
}

exports.post = function (url, headers, bodyObject, cb) {
    call('POST', url, headers, bodyObject, cb);
};

exports.put = function (url, headers, bodyObject, cb) {
    call('PUT', url, headers, bodyObject, cb);
};

const call = function (method, url, headers, body, cb) {

    let options = {
        url: url,
        method: method,
        headers: headers,
        //encoding: null
    };
    if (body) options.body = body;
    console.log(options);
    request(options, function (error, response, resBodyText) {
        if (!error) {
            log.info('response', response.statusCode, response.body);
            cb(response);
            return;
        } else {
            log.error('response', error);
            cb(error);
            return;
        }
        cb(response);
    });
};
