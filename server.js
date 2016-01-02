/**
 * Created by PKoolwijk on 28-12-2015.
 */

//***********SET UP APPLICATION ENVIRONMENT***********************

//use standard port set by HERKU or use 3000 for local development
var PORT =process.env.PORT || 3000;

var moment =require('moment'); //linking in moment module.

//Make express application
var express = require("express");
var app = express();

//Make http server linked to express application
var http = require('http').Server(app);

//Connect Socket IO to http server
var io = require('socket.io')(http);

//let express application use a static folder
app.use(express.static(__dirname+ '/public'));



//**********CONFIG APPLICATION***********************

//define a io event to react on
io.on('connection', function (socket) {

    //send message to client on first connect and logs in server console connection.
    socket.emit('messageFromServer',{
        name:'Webmaster',
        text:'welcome the chat application',
        timestamp:moment().valueOf()
    })
    console.log('Message from server: user connected via Socket IO')

    //waits for on connection for event ( in this case a client message)
    socket.on('messageFromClient', function (message) {

        //logs in server console the received message from clients
        console.log('Message received: ' + message.text);
        console.log('Message received: ' + message.name);

        //BROADCAST RECEIVED MESSAGE
        io.emit('messageFromServer', message)   // broadcasts message to everyone including the sender
        //socket.broadcast.emit('messageFromServer', message)    //broadcasts message to everyone BUT the sender.


    })

});


//**********START APPLICATION***********************

//start server
http.listen(PORT, function () {
    console.log('server started');
});


