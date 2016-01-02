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

    console.log(getDateTime('f')+': '+ message.text)  //log message from serverin console of browser

    //Selector # =target bij id, .= target by class or use name of the tag
    jQuery('.messages').append('<p>' + getDateTime('s')+': '+ message.text + '</p>')  //adds content to exsiting mark-up



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


function getDateTime(fullOrShort) {
    var now     = new Date();
    var year    = now.getFullYear();
    var month   = now.getMonth()+1;
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds();
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }

    if(fullOrShort==='f'){
        var dateTime = day+'/'+month+'/'+year+' '+hour+':'+minute+':'+second;
    }else{
        var dateTime =+hour+':'+minute+':'+second;
    }

    return dateTime;
}
