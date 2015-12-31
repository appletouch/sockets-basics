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
io.on('connection', function (socket) {

    //send message to client on first connect and logs in server console connection.
    socket.emit('messageFromServer',{text:'welcome the chat application'})
    console.log('Message from server: user connected via Socket IO')

    //waits for on connection for event ( in this case a client message)
    socket.on('messageFromClient', function (message) {

        //logs in server console the received message from clients
        console.log('Message received: ' + message.text);

        //BROADCAST RECEIVED MESSAGE
        //io.emit   // broadcasts message to everyone including the sender
        socket.broadcast.emit('messageFromServer', message)    //broadcasts message to everyone BUT the sender.


    })

});

//start server
http.listen(PORT, function () {
    console.log('server started');
});


