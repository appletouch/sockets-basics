/**
 * Created by PKoolwijk on 29-12-2015.
 */

var socket =io();
var userName= getQueryVariable('username')||'Anonymous';
var roomName= getQueryVariable('roomname')||'Lobby';
console.log(userName+ ' wants to join '+ roomName);

//update H1 tag wit room name
jQuery(".room-title" ).text(roomName);


//Write messeage in console of the browser to confirm connection with server
// send the username and the room which is being joined
socket.on("connect", function () {
    console.log("Message from client: connected from FE to Server");
    socket.emit('joinRoom', {
        username:userName,
        roomname:roomName
    })
});

//Listen to broadcast send by the server and act on it.
socket.on("messageFromServer", function (message) {
    timeToShowInWelcome=moment();
    console.log(timeToShowInWelcome.format('MMMM Do YYYY, HH:mm:ss') +': '+  message.text );  //log message from serverin console of browser

    var $chatMessages=jQuery('.messages');
    //Selector # =target bij id, .= target by class or use name of the tag
    $chatMessages.append('<p><strong>'+ message.name + ' '+  getDateTime('s')+'</strong></p>');  //name field added to message when send
    $chatMessages.append('<p>'+ message.text + '</p>');  //adds content to exsiting mark-up



});

//handles submitting of new Messaged
var $form = jQuery('#message-form');
$form.on('submit', function (event) {

    event.preventDefault(); //prevents default postback
    var messageFieldInForm = $form.find('input[name=txtMessageFromClient]'); //find textfield in form
   if((messageFieldInForm.val()).trim().length>0)
   {
           socket.emit('messageFromClient',{
               name:userName,
               text:messageFieldInForm.val()
           });
           messageFieldInForm.val('');
   }

});


function getDateTime(fullOrShort) {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        month = '0'+month;
    }
    if(day.toString().length == 1) {
        day = '0'+day;
    }
    if(hour.toString().length == 1) {
        hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        second = '0'+second;
    }

    if(fullOrShort==='f'){
        var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
    }else{
        var dateTime =+hour+':'+minute;
    }

    return dateTime;
}
