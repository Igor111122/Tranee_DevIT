// Import the Game class from the 'back.js' module.
import Game from './back.js';
import React, { Component } from 'react';

// Define the Front class.
export default class Front extends Component {
    constructor() {
        super();
        // Initialize the game object.
        this.game = new Game();
        this.game.take2CardsforGamers();
        this.winner = 0;
        this.tempWinner = false;
        this.player = 0;
    }

    // Method to distribute starting cards to players.
    displayCards(playerNumber) {
        const playerCards = this.game.gamers[playerNumber];

        return playerCards.map((card, index) => (//добавить компонент 
            <img
                key={index}
                src={`${card.value}_${card.suit}.png`}
                alt={`Player${playerNumber}_Card${index}`}
            />
        ));
    }
    

    // Method to check the winner of the game.
    checkWinner() {
        this.tempWinner = this.game.returnWinner();//переписать под апп и выводить только победителей
        if (this.tempWinner.length > 1) {
            let winnersText = this.tempWinner.map(winnerIndex => `Player ${winnerIndex + 1}`).join(' and ');
            this.winner = this.tempWinner;
            return(
                <p class="player-name">{`${winnersText} win`}</p>
            );
        } else if (this.tempWinner.length === 1) {
            this.winner = this.tempWinner[0];
            return(
                <p class="player-name">{`Player ${this.tempWinner[0] + 1} win`}</p>
            );
        } else {
            // Handle the situation when there are no winners.
            // This may include displaying a tie message or taking other actions.
        }
    }

    // Method to switch to the next player's turn.
    nextPlayer() {
        if (this.player == 3) {
            this.checkWinner();
            this.player = -1;
            return('Game Over');
        } else {
            this.player++;
            return(`Now it's player ${this.player + 1} turn`);
        }
    }
    // Method to add a card to the current player's hand.
    addCard() {
        let card = this.game.take1CardforGamer(this.player);
    }

}