import React, { useState, useEffect } from 'react';

// Method to display cards using API
export default function displayCards(playerNumber) {
    const [playerCards, setPlayerCards] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/cards/${playerNumber}/${localStorage.getItem('gameToken')}`)
            .then(response => response.json())
            .then(data => {
                setPlayerCards(data.cards);
            })
            .catch(error => {
                console.error('Error fetching player cards:', error);
            });

    }, [playerNumber]);

    return(
        <div class="cell">
            <p class="player-name">Player {playerNumber+1}</p>
            <div class="images" id="Player0">
                {playerCards.map((card, index) => ( <img key={index} src={`${card.value}_${card.suit}.png`} alt={`Player${playerNumber}_Card${index}`} /> ))}
            </div>
        </div>
    )
    
}

/*
// Define the Front class.
export default class Front extends Component {
    constructor() {
        super();
        this.winner = 0;
    }

    // Method to display cards using API
    displayCards(playerNumber) {


        useEffect(() => {
            const fetchPlayerCards = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/cards/${playerNumber}/${localStorage.getItem('gameToken')}`);
                    const data = await response.json();
                    setPlayerCards(data.cards);
                } catch (error) {
                    console.error('Error fetching player cards:', error);
                }
            };

            fetchPlayerCards();
        }, [playerNumber]);

        return playerCards.map((card, index) => (
            <img
                key={index}
                src={`${card.value}_${card.suit}.png`}
                alt={`Player${playerNumber}_Card${index}`}
            />
        ));
    }
    

    // Method to check the winner of the game.
    checkWinner() {
        const [tempWinner, setTempWinner] = useState([]);

        useEffect(() => {
            const fetchCheckWinner = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/winner/${localStorage.getItem('gameToken')}`);
                    const data = await response.json();
                    setTempWinner(data.winners);
                } catch (error) {
                    console.error('Error fetching player cards:', error);
                }
            };

            fetchCheckWinner();
        }, []);


        if (tempWinner.length > 1) {
            let winnersText = tempWinner.map(winnerIndex => `Player ${winnerIndex + 1}`).join(' and ');
            this.winner = tempWinner;
            return (
                <p class="player-name">{`${winnersText} win`}</p>
            );
        } else if (tempWinner.length === 1) {
            this.winner = tempWinner[0];
            return (
                <p class="player-name">{`Player ${tempWinner[0] + 1} win`}</p>
            );
        } else {
            <p class="player-name">{`win`}</p>
        }
        
    }

    restart() { 
        
    }

    nextPlayer() {
        
    }

    addCard() { 
        
    }

}
*/