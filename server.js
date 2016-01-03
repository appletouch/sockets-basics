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

/*contains the userdata
'GUID-KEY':{
    username:'Peter',
    roomname:'Mijn Eigen Room'
    }
*/
var clientInfo={};

//sends current users to provided socket
function sendCurrentUsers(socket){
    var userDataRequested = clientInfo[socket.id];
    var users =[];
    if(typeof userDataRequested==='undefined'){
        return;
    }
    Object.keys(clientInfo).forEach(function (socketId) {
        var userDataFound=clientInfo[socketId];
        if(userDataRequested.roomname===userDataFound.roomname){
            users.push(userDataFound.username)
        }

    })
  socket.emit('messageFromServer',{
      username:'Chatmaster',
      text: 'Current users: ' + users.join(', ')
  })
}

//define a io event to react on
io.on('connection', function (socket) {

    //set of key/value pairs with--> special-key: {username,room}


    socket.on('disconnect', function () {
        var userData =clientInfo[socket.id];
        if(typeof userData!=='undefined'){
            socket.leave(userData.roomname);
            io.to(userData.roomname).emit('messageFromServer',{
                username:'Chatmaster',
                text:userData.username + ' has left the room.'
            });
            delete userData;
        }
    });


    //send message to client on first connect and logs in server console connection.
    socket.emit('messageFromServer',{
        username:'Chatmaster',
        text:"Welcome to Let's Chat",
        timestamp:moment().valueOf()
    });
    console.log('Message from server: user connected via Socket IO');


    //waits for on connection for event ( in this case a user joint room)
    socket.on('joinRoom', function (req) {
        clientInfo[socket.id]=req;
        socket.join(req.roomname);
        socket.broadcast.to(req.roomname).emit('messageFromServer',{
            username:'Chatmaster',
            text: req.username + ' has joined the room.'
        })
    });


    //waits for on connection for event ( in this case a client message)
    socket.on('messageFromClient', function (message) {

        //logs in server console the received message from clients
        console.log('Message received: ' + message.text);
        console.log('Message received: ' + message.username);

        //User sends a COMMAND instead of a message
        // this app can handle he following COMMAND: @currentUsers
        if (message.text ==='@currentUsers'){
            sendCurrentUsers(socket)

        }else{
            //BROADCAST RECEIVED MESSAGE
            io.to(clientInfo[socket.id].roomname).emit('messageFromServer', message);   // broadcasts message to everyone including the sender
            //socket.broadcast.emit('messageFromServer', message)    //broadcasts message to everyone BUT the sender.
        }
    })

});


//**********START APPLICATION***********************

//start server
http.listen(PORT, function () {
    console.log('server started');
});


