var http = require('http');

var options = {
    host: 'www.whatthecommit.com'
};

var htmlResponse = '';

http.get(options, function (res) {
    res.on('data', function(d) {
        htmlResponse += d;
    });

    res.on('end', function() {
        htmlResponse = htmlResponse.replace(/\n/g, '');
        htmlResponse.replace(/<div id="content"><p>(.*)<\/p><p class="permalink">/, function() {
            console.log(arguments[1]);
            return '';
        });
    });
});
