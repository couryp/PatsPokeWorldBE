let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);
let cors = require('cors')
let bodyParser = require('body-parser')
let PORT = process.env.PORT || 8081

// app.use('/css', express.static(__dirname + '/css'));
// app.use('/js', express.static(__dirname + '/js'));
// app.use('/assets',express.static(__dirname + '/assets'));
app.use(cors())
app.use(bodyParser.json())

// app.get('/', function(req,res) {
//     res.sendFile(__dirname+'/index.html');
// });
//
// app.get('/',function(req,res){
//     res.sendFile(__dirname+'/index.html');
// });


server.listen(PORT, function(){ //8081
    console.log('Listening on '+server.address().port);
});

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player



io.on('connection',function(socket){
  console.log('hi')
    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        socket.emit('allplayers', getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);
        socket.on('cursor',function(data){
            socket.player.frame = data.frame
            socket.player.x = data.x
            socket.player.y = data.y
            socket.player.direction = data.direction
            io.emit('move', getAllPlayers())
        })
        // socket.on('click',function(data){
        //     console.log('click to '+data.x+', '+data.y);
        //     socket.player.x = data.x;
        //     socket.player.y = data.y;
        //     io.emit('move',socket.player);
        // });
        socket.on('disconnect',function(){
                io.emit('remove',socket.player.id)
        })
    });
});

function getAllPlayers(){
    var players = [];
    Object.keys(io.sockets.connected).forEach(function(socketID){
        var player = io.sockets.connected[socketID].player;
        if(player) players.push(player);
    });
    return players;
}

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}