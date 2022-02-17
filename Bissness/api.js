const request = require('Common/businessFunction.js');

function api(url){
    this.url = url;
}
var proto = api.prototype;

proto.callExpress = function(number,cb){
    let url = `https://qqlykm.cn/api/kuaidi/search.php?firstname=${number}`
    request.get(url, (err, res) => {
        cb( err ? err : res, url);
    });

}


module.exports = api;