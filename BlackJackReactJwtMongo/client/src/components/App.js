import React, { useEffect, useState, useReducer } from 'react';
import css from '../window.css';
import { useNavigate } from "react-router-dom";
import displayCards from './displayCards';


function App() {

  const [nextPlayerturn , setNextPlayerturn] = useState('');
  const [gameID , setGameID] = useState(localStorage.getItem('idGame'));
  const [tempWinner, setTempWinner] = useState('');


  useEffect(() => {
    // API call to get player data
    const token = localStorage.getItem('gameToken');

    fetch(`http://localhost:5000/getPlayer/${token}`)
      .then(response => response.json())
      .then(data => {
        // Setting the player number to the component state
        if(data.player==4){
          setNextPlayerturn(`Game Over`);
        }else{
          setNextPlayerturn(`Now it's player ${data.player+1} turn`);
        }
        
      })
      .catch(error => {
        console.error('Ошибка при получении данных игрока:', error);
      });

    // Call API for take winner data
    fetch(`http://localhost:5000/winner/${localStorage.getItem('gameToken')}`)
      .then(response => response.json())
      .then(data => {
        if (data.winners.length > 1) {
          let winnersText = data.winners.map(winnerIndex => `Player ${winnerIndex + 1}`).join(' and ');
          setTempWinner(`${winnersText} win`);
          } else if (data.winners.length === 1) {
            setTempWinner(`Player ${data.winners[0] + 1} win`);
          } else {}
      })
      .catch(error => {
        console.error('Ошибка при получении про победителя:', error);
      });

  }, []);

  function next (){
    fetch(`http://localhost:5000/nextPlayer/${localStorage.getItem('gameToken')}`)
      .then(() => {window.location.reload(); })
      .catch(error => {
        console.error('Ошибка при получении про победителя:', error);
      });
    
  }

  function add (){
    fetch(`http://localhost:5000/addCard/${localStorage.getItem('gameToken')}`)
      .then(() => {next();
        window.location.reload(); })
      .catch(error => {
        console.error('Ошибка при получении про победителя:', error);
      });
    
  }

  function restart(){
    fetch(`http://localhost:5000/restart/${localStorage.getItem('gameToken')}`)
    .then(() => {window.location.reload(); })
      .catch(error => {
        console.error('Ошибка при получении про победителя:', error);
      });
  };

  return (
    <div class="container">
        <div class="left">
            <div class="cell-row">
                {displayCards(0)}
                {displayCards(1)}
            </div>
            <div class="cell-row">
                {displayCards(2)}
                {displayCards(3)}
            </div>
        </div>
        <div class="right">
            <p class="player-name">{`Game Id = ${gameID}`}</p>
            <p class="player-name">{tempWinner}</p>
            <p class="player-name" id="currentPlayer">{nextPlayerturn}</p>
                <div class="buttons" id="3">
                    <button id="addCard"onClick={() => {
                      if(nextPlayerturn!= 'Game Over'){add()}}
                      }>Add Card</button>
                    <button id="skipTurn" onClick={() => {
                      if(nextPlayerturn!= 'Game Over'){next()}}
                      }>Skip Turn</button>
                    <button id="Restart" onClick={() => {restart();}}>Restart game</button>
                </div>
        </div>
    </div>
  );
}

export default App;
