var express = require('express');
var app     = express();

app.use(express.static(__dirname + '/app' ));
app.use('/bower_components', express.static(__dirname + '/bower_components' ));

app.get('/*', function(req,res)
{
    res.sendFile(__dirname + '/app/index.html');
});

var port = process.env.NODE_ENV === 'production'?process.env.PORT:3000;
app.listen(port);

console.log('Server started on port '+ port);
