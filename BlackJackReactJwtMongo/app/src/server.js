const express = require('express');
const cors = require('cors');// need to cors policy
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Game = require('./public/back');
const gameData = require('./dataSchema');
const pushToDB = require('./pushToDB');


// Example function for checking and decoding a token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'MrPresident');
    return decoded;
  } catch (error) {
    // If an error occurs, for example the token is invalid
    console.error('Token verification failed:', error.message);
    return null;
  }
}

// Middleware function for token verification
function verifyTokenMiddleware(req, res, next) {
  const token = req.params.token;
  // Token verification
  const decodedToken = verifyToken(token);
  
  if (decodedToken) {
    req.decodedToken = decodedToken;
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}

const db = 'mongodb+srv://root:Bujhm456@cluster0.vmyeecy.mongodb.net/Black-Jack?retryWrites=true&w=majority'; 

mongoose
  .connect(db)
  .then((res) => {console.log('Connected to DB');})
  .catch((error)=>{console.log(error);});

const app = express();
let gameRooms = [];

app.use(express.static('public'));

// Getting the absolute path to the current directory
const rootPath = path.resolve(__dirname, '..'); // '..' goes to a higher level, to the folder 'BlackJackReact'

app.use(cors());
// Using relative paths from the current directory
app.use(express.static(path.join(rootPath, 'public', 'static')));
app.use(express.static(path.join(rootPath, 'public', 'images')));
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

//api for connecting or creating games
app.get('/createGame', (req, res) => {
  gameRooms.push(new Game());
  const idGame = gameRooms.length-1;
  gameRooms[idGame].numOfplayers++;
  const idPlayer = gameRooms[idGame].numOfplayers;
  pushToDB(idPlayer, idGame , 'Player created game');

  gameRooms[idGame].take2CardsforGamers();

  const token = jwt.sign({ idGame, idPlayer }, 'MrPresident');
  res.json({token, idGame})

});

app.get('/connectGame/:idGame', (req, res, next) => {
  const idGame = req.params.idGame;
  if(gameRooms[idGame]){
    if(gameRooms[idGame].numOfplayers != 4){
      gameRooms[idGame].numOfplayers++;
      const idPlayer = gameRooms[idGame].numOfplayers;
      pushToDB(idPlayer, idGame , 'Player connected to the game');
      const token = jwt.sign({ idGame, idPlayer }, 'MrPresident');
      res.json({token, idGame});
    }else{
      res.status(401).json({ message: 'This game olso has 4 players' });
    }
  }else{
    res.status(401).json({ message: 'This game isn`t exist' });
  }

});


//api with return
app.get('/cards/:playerNumber/:token', verifyTokenMiddleware , (req, res) => {
  const idGame = req.decodedToken.idGame;
  const playerNumber = parseInt(req.params.playerNumber);
  const cards = gameRooms[idGame].getCardsForPlayer(playerNumber);
  res.json({ cards });
});

app.get('/winner/:token', verifyTokenMiddleware , (req, res) => {
  const idGame = req.decodedToken.idGame;
  const winners = gameRooms[idGame].returnWinner();
  pushToDB(req.decodedToken.idPlayer, req.decodedToken.idGame , 'Checking winner');
  res.json({ winners });
});

app.get('/getPlayer/:token', verifyTokenMiddleware , (req, res) => {

  const idGame = req.decodedToken.idGame;
  const player = gameRooms[idGame].player;
  pushToDB(req.decodedToken.idPlayer, req.decodedToken.idGame , 'Getting current player');
  res.json({ player });

});


//api without return
app.get('/addCard/:token', verifyTokenMiddleware , (req, res) => {
  const idGame = req.decodedToken.idGame;
  const player = req.decodedToken.idPlayer;
  if(player == gameRooms[idGame].player+1){//because player is = numOfplayers
    pushToDB(req.decodedToken.idPlayer, req.decodedToken.idGame , 'Adding 1 card to his deck');
    gameRooms[idGame].take1CardforGamer(gameRooms[idGame].player);
  }
  res.end();
});

app.get('/nextPlayer/:token', verifyTokenMiddleware , (req, res) => {
  const idGame = req.decodedToken.idGame;
  const player = req.decodedToken.idPlayer;
  if(player == gameRooms[idGame].player+1){//because player is = numOfplayers
    pushToDB(req.decodedToken.idPlayer, req.decodedToken.idGame , 'Pass his turn');
    gameRooms[idGame].nextPlayer();
  }
  res.end();
});

app.get('/restart/:token', verifyTokenMiddleware , (req, res) => {
  const idGame = req.decodedToken.idGame;
  pushToDB(req.decodedToken.idPlayer, req.decodedToken.idGame , 'Restarts game');
  gameRooms[idGame].restartGame();
  res.end();
});

// Route to send HTML
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const port = 5000;
app.listen(port, () => {
  console.log(`Сервер Express запущен на порту ${port}`);
});
