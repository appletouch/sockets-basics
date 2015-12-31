/**
 * Created by PKoolwijk on 29-12-2015.
 */

var socket =io();

socket.on("connect", function () {
    console.log("Message from client: connected from FE to Server")
})
