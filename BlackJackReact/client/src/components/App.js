import React, { useEffect, useState } from 'react';
import css from '../window.css';
import Front from './front';
import image from './1.png';
function App() {
  const [front, setFront] = useState(new Front());
/*
  const [html, setHtml] = useState('');
  let i = 10;
  useEffect(() => {
    // Получите HTML с сервера Express
    fetch('http://localhost:5000/getHtml')
      .then((response) => response.text())
      .then((data) => setHtml(data));
  }, []);

  let htmlString= ""
  let front = new Front();
  if(html){
    htmlString = front.giveStartCards(html);
  }

let insertString = "<p>Player4234234</p>";

// Находим позицию, после которой нужно вставить новую строку
let position = htmlString.indexOf(">Player 4</p>");

// Разбиваем строку на две части и вставляем новую строку
let modifiedString = htmlString.slice(0, position + 1) + insertString + htmlString.slice(position + 1);
*/
  
let [nextPlayerturn , setNextPlayerturn] = useState('Now it player 1 turn');
  function next (){
    setNextPlayerturn(()=>front.nextPlayer());
  }

  function add (){
    front.addCard();
    setNextPlayerturn(()=>front.nextPlayer());
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
            {front.checkWinner()}
            <p class="player-name" id="currentPlayer">{nextPlayerturn}</p>
                <div class="buttons" id="3">
                    <button id="addCard"onClick={() => {
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
