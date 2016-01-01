/**
 * Created by PKoolwijk on 29-12-2015.
 */

var socket =io();


//Write messeage in console of the browser to confirm connection with server
socket.on("connect", function () {
    console.log("Message from client: connected from FE to Server")
});

//Listen to broadcast send by the server and act on it.
socket.on("messageFromServer", function (message) {
    console.log('new Message: '+ message.text)  //log message from serverin console of browser
})

//handles submitting of new Messaged
var $form = jQuery('#message-form');
$form.on('submit', function (event) {
    event.preventDefault(); //prevents default postback
    var messageFieldInForm = $form.find('input[name=txtMessageFromClient]'); //find textfield in form
    socket.emit('messageFromClient',{
        text:messageFieldInForm.val()
    })
    messageFieldInForm.val('');


})