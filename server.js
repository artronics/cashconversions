var app = require('express')();
var express = require('express');

var http = require('http').Server(app);
var io = require('socket.io')(http);

var cc = require('./src/main');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/' + 'index.html');
})

app.get('/settings', function (req, res) {
    res.sendFile(__dirname + '/public/' + 'settings.html');
    // res.send("kir")
})
io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('currencies',cc.currencies);
    socket.on('change currency',function (msg) {
        cc.currencies = msg;
        console.log("cc "+msg)
        io.emit("currencies",msg);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});