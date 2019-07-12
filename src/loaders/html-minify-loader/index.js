var Minimize = require('minimize');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
 //   console.log(source)
    var callback = this.async();
    if (this.cacheable) {
        this.cacheable();
    }

    var opts = (this.options &&  loaderUtils.getOptions(this) || {});
    console.log("-------"+ JSON.stringify(opts)+"-------");
    minimize = new Minimize(opts);
    minimize.parse(source, callback);
};