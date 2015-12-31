/**
 * Created by PKoolwijk on 28-12-2015.
 */


//use standard port set by HERKU or use 3000 for local development
var PORT =process.env.PORT || 3000;

//Make express application
var express = require("express");
var app = express();

//Make http server
var http = require('http').Server(app);

//Connect Socket IO to http server
var io = require('socket.io')(http);

//let express use a static folder
app.use(express.static(__dirname+ '/public'));

//define a io event to react on
io.on('connection', function () {
    console.log('Message from server: user connected via Socket IO')
})

//start server
http.listen(PORT, function () {
    console.log('server started');
});


