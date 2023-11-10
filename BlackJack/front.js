// Import the Game class from the 'back.js' module.
import Game from './back.js';

// Define the Front class.
class Front {
    constructor() {
        // Initialize the game object.
        this.game = new Game();
        this.winner = 0;
        this.tempWinner = false;
        this.player = 0;
    }

    // Method to distribute starting cards to players.
    giveStartCards() {
        this.game.take2CardsforGamers();
        for (let c = 0; c < 4; c++) {
            this.game.gamers[c].forEach((card) => {
                let div = document.getElementById("Player" + c);
                let img = document.createElement("img");
                img.src = 'Carts/' + card.value + '_' + card.suit + '.png';
                // Append the new element to the <div>.
                div.appendChild(img);
            });
        }
    }

    // Method to check the winner of the game.
    checkWinner() {
        this.tempWinner = this.game.returnWinner();
        if (this.tempWinner.length > 1) {
            let p = document.getElementById("winPlayer");
            let winnersText = this.tempWinner.map(winnerIndex => `Player ${winnerIndex + 1}`).join(' and ');
            this.winner = this.tempWinner;
            p.textContent = `${winnersText} win`;
        } else if (this.tempWinner.length === 1) {
            let p = document.getElementById("winPlayer");
            this.winner = this.tempWinner[0];
            p.textContent = `Player ${this.tempWinner[0] + 1} win`;
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
            document.querySelector('#skipTurn').disabled = true;
            document.querySelector('#addCard').disabled = true;
            document.getElementById("currentPlayer").textContent = `Game over`;
        } else {
            this.player++;
            document.getElementById("currentPlayer").textContent = `Now it's player ${this.player + 1} turn`;
        }
    }

    // Method to add a card to the current player's hand.
    addCard() {
        let card = this.game.take1CardforGamer(this.player);
        let div = document.getElementById("Player" + this.player);
        let img = document.createElement("img");
        img.src = 'Carts/' + card.value + '_' + card.suit + '.png';
        // Append the new element to the <div>.
        div.appendChild(img);
        if (this.player == 3) {
            this.checkWinner();
            this.player = -1;
            document.querySelector('#skipTurn').disabled = true;
            document.querySelector('#addCard').disabled = true;
            document.getElementById("currentPlayer").textContent = `Game over`;
        } else {
            this.player++;
            document.getElementById("currentPlayer").textContent = `Now it's player ${this.player + 1} turn`;
        }
    }
}

// Create an instance of the Front class.
let front = new Front();

// Distribute starting cards to players and check for a winner.
front.giveStartCards();
front.checkWinner();

// Add event listeners for buttons.

// Reload the page when the "Restart" button is clicked.
document.getElementById("Restart").addEventListener("click", function() {
    location.reload();
});

// Add a card to the current player's hand when the "addCard" button is clicked.
document.getElementById("addCard").addEventListener("click", function() {
    front.addCard();
});

// Switch to the next player's turn when the "skipTurn" button is clicked.
document.getElementById("skipTurn").addEventListener("click", function() {
    front.nextPlayer();
});
