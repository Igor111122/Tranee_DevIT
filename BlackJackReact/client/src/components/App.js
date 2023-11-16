import React, { useEffect, useState } from 'react';
import css from '../window.css';
import Front from './front';
import Game from './back.js';
function App() {
  let player = 0;
  const [front, setFront] = useState(new Front());
  const [game, setGame] = useState(new Game());
  const [winnersText, setWinnerstext] = useState('');
  const [nextPlayerturn, setNextPlayerturn] = useState('Now it player 1 turn');

  useEffect(() => {checkWinner(); });

  function checkWinner() {
    const tempWinner = game.returnWinner();//переписать под апп и выводить только победителей
    console.log(game.returnWinner());
    if (tempWinner.length > 1) {
        let winnersText = tempWinner.map(winnerIndex => `Player ${winnerIndex + 1}`).join(' and ');
        return(setWinnerstext(`${winnersText} win`));
    } else if (tempWinner.length === 1) {
        return( setWinnerstext(`Player ${this.tempWinner[0] + 1} win`));
    } else {
        // Handle the situation when there are no winners.
        // This may include displaying a tie message or taking other actions.
    }
  }

  function next (){
    if (player == 3) {
      checkWinner();
      player = -1;
      setNextPlayerturn('Game Over');
    } else {
        player++;
        setNextPlayerturn(`Now it's player ${player + 1} turn`);
    }
  }

  function add (){
    game.take1CardforGamer(player);
    checkWinner();
    next();
  }

  return (
    <div class="container">
        <div class="left">
            <div class="cell-row">
                <div class="cell">
                    <p class="player-name">Player 1</p>
                    <div class="images" id="Player0">
                      {front.displayCards(0)}
                    </div>
                </div>
                <div class="cell">
                    <p class="player-name">Player 2</p>
                    <div class="images" id="Player1">
                      {front.displayCards(1)}
                    </div>
                </div>
            </div>
            <div class="cell-row">
                <div class="cell">
                    <p class="player-name">Player 3</p>
                    <div class="images" id="Player2">
                      {front.displayCards(2)}
                    </div>
                </div>
                <div class="cell">
                    <p class="player-name">Player 4</p>
                    <div class="images" id="Player3">
                      {front.displayCards(3)}
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
        <p class="player-name">{`${winnersText}`}</p>
            <p class="player-name" id="currentPlayer">{nextPlayerturn}</p>
                <div class="buttons" id="3">
                    <button id="addCard" onClick={() => {
                      if(nextPlayerturn!= 'Game Over'){add()}}
                      }>Add Card</button>
                    <button id="skipTurn" onClick={() => {
                      if(nextPlayerturn!= 'Game Over'){next()}}
                      }>Skip Turn</button>
                    <button id="Restart" onClick={() => window.location.reload()}>Restart game</button>
                </div>
        </div>
    </div>
  );
}

export default App;
