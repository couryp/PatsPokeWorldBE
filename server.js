let express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io').listen(server);
let cors = require('cors')
let bodyParser = require('body-parser')
let PORT = process.env.PORT || 8081
let PORT2 = process.env.PORT || 3000
let redSonic = require('./main.js')
let usermodel = require('./models/user.js')

app.use(cors())
app.use(bodyParser.json())

app.get('/pokemon', (req ,res, next) => {
  redSonic.getPokemonByID(req.query.id)
    .then((data) => {
      res.send(data)
    })
})

app.get('/users/:id/squads', (req, res, next) => {
  console.log(req.params.id)
  usermodel.getUserSquads(req.params.id)
    .then((data) => {
      console.log(data)
      res.send(data)
    })
    .catch(error => next(error))
})

app.post('/users', (req, res, next) => {
  usermodel.createUser(req.body.name)
    .then((user) => {
      debugger
      res.json({userId: user[0], valid: true})
    })
    .catch(error => next(error))
})

app.get('/squads', (req, res, next) => {
  usermodel.getAllSquads()
    .then((squad) => {
      res.json({squad})
    })
    .catch(error => next(error))
})

app.post('/squads', (req, res, next) => {
  usermodel.createSquad(req.body)
    .then((squad) => {
      res.json({squad, valid: true})
    })
    .catch(error => next(error))
})

app.post('/pokemon', (req, res, next) => {
  usermodel.createPokemon(req.body.masterArray)
    .then((pokemon) => {
      res.json({pokemon})
    })
    .catch(error => next(error))
})

app.delete('/squads/:id', (req, res, next) => {
  usermodel.deleteSquad(req.params.id)
    .then((deleted) => {
      res.json({deleted})
    })
    .catch(error => next(error))
})


app.use((err, req, res, next) => {
  const status = err.status || 500
  console.log(err)
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' } })
})

app.listen(PORT2, () => {
  console.log(`Listening on PORT:${PORT2}`)
})

server.lastPlayderID = 0; // Keep track of the last id assigned to a new player

server.listen(PORT, function(){ //8081
  console.log('wild pokemon on '+server.address().port);
});


io.on('connection',function(socket){

    socket.on('newplayer',function(){
        socket.player = {
            id: server.lastPlayderID++,
            x: randomInt(100,400),
            y: randomInt(100,400)
        };
        socket.emit('allplayers',getAllPlayers());
        socket.broadcast.emit('newplayer',socket.player);

        socket.on('click',function(data){
            console.log('click to '+data.x+', '+data.y);
            socket.player.x = data.x;
            socket.player.y = data.y;
            io.emit('move',socket.player);
        });

        socket.on('disconnect',function(){
            io.emit('remove',socket.player.id);
        });
    });

    socket.on('test',function(){
        console.log('test received');
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

// socket.on('cursor',function(data){
//     socket.player.frame = data.frame
//     socket.player.x = data.x
//     socket.player.y = data.y
//     socket.player.direction = data.direction
//     io.emit('move', getAllPlayers())
// })
