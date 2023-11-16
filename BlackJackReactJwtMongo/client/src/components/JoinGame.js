import React , {useState} from 'react';
import { useNavigate } from "react-router-dom";
function JoinGame() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState('');

  const createGame = async () => {
      try {
        const response = await fetch('http://localhost:5000/createGame');
        const data = await response.json();
  
        // Retrieving a token from a response
        const token = data.token;

        // Saving a token in the browser's local storage
        localStorage.setItem('gameToken', token);
        localStorage.setItem('idGame', data.idGame);
  
        // Redirecting the user to the desired route
        navigate("/about");
      } catch (error) {
        console.error('Error creating game:', error);
      }
    };

  const connectGame = async () => {
    try {
      const response = await fetch(`http://localhost:5000/connectGame/${gameId}`);
      const data = await response.json();
      if(data.message){
        throw new Error(`${data.message}`);
      }else{

        // Retrieving a token from a response
        const token = data.token;
          
        console.log(token);
        // Saving a token in the browser's local storage
        localStorage.setItem('gameToken', token);
        localStorage.setItem('idGame', data.idGame);

        // Redirecting the user to the desired route
        navigate("/about");
      }
    } catch (error) {
      console.error('Error connecting to the game:', error.message);
      alert(`Error connecting to the game: ${error.message}`);
    }
  };

  return (
    <div style={{paddingTop:'17%'}}>
        <div style={{float: 'left', width: '45%', padding: '20px', backgroundColor: '#f0f0f0',paddingLeft:'7%'}}>
            <h2>New game</h2>
            <button onClick={createGame}>Create game</button>
        </div>
        <div style={{float: 'right', width: '45%', padding: '20px', backgroundColor: '#e0e0e0',}}>
            <h2>Connect game</h2>
            <p>Enter ID game, to connect.</p>
            <form>
                <label for="gameID">ID game:</label>
                <input type="text" id="gameID" name="gameID" required value={gameId} onChange={(e) => setGameId(e.target.value)}></input>
                <button type="button" onClick={connectGame}>Enter game</button>
            </form>
        </div>
    </div>
  );
}

export default JoinGame;