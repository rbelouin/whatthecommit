var http = require('http');

exports.options = {
    host: 'www.whatthecommit.com'
};

exports.getCommit = function(callback) {
    var htmlResponse = '';
    var commit = '';
    callback = (typeof(callback) === 'function') ? callback : function() {};

    http.get(this.options, function(res) {
        res.on('data', function(d) {
            htmlResponse += d;
        });

        res.on('end', function() {
            var commit = htmlResponse   .replace(/\n/g, '')
                                        .replace(/^.*<div id="content"><p>(.*)<\/p><p class="permalink">.*/, function() {
                                            return arguments[1];
                                        });
            callback(commit);
        });
    });
};
