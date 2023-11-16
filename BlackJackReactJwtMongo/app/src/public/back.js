class Card {
    constructor(value, suit) {
        this.value = value; // The numeric value of the card (1 to 13).
        this.suit = suit; // The suit of the card (hearts, diamonds, clubs, spades).
    }
}
class Game {
    constructor() {
        this.cards = this.generateDeck(); // Create and shuffle the deck of cards.
        this.gamers = [[], [], [], []]; // Initialize an array to hold cards for 4 players.
        this.numOfplayers = 0;
        this.player = 0;
    }

    generateDeck() {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1-A, 11=J, 12=Q, 13=K
        const deck = [];

        // Create a deck of cards by combining suits and values.
        for (const suit of suits) {
            for (const value of values) {
                deck.push(new Card(value, suit));
            }
        }

        // Shuffle the deck using the Fisher-Yates algorithm.
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck; // Return the shuffled deck.
    }

    generateCard() {
        // Draw a card from the deck.
        if (this.cards.length === 0) {
            // If the deck is empty, create a new deck and shuffle it.
            this.cards = this.generateDeck();
        }
        return this.cards.pop(); // Remove and return the top card from the deck.
    }

    take2CardsforGamers() {
        // Deal two cards to each of the 4 players.
        for (let c = 0; c < 4; c++) {
            this.gamers[c].push(this.generateCard());
            this.gamers[c].push(this.generateCard());
        }
    }

    take1CardforGamer(indexOfGamer) {
        // Deal one card to a specific player and return the card.
        const card = this.generateCard();
        this.gamers[indexOfGamer].push(card);
        return card;
    }

    returnWinner() {
        let winner = []; // Array to store the index of winning players.
        let tempResult = 0; // Temporary sum of card values for a player.
        let tempA = false; // Flag to indicate if player has an Ace (value 1).

        for (let i = 0; i < 4; i++) {
            for (let c = 0; c < this.gamers[i].length; c++) {
                if (this.gamers[i][c].value == 11 || this.gamers[i][c].value == 12 || this.gamers[i][c].value == 13) {
                    tempResult += 10; // Face cards (J, Q, K) are worth 10 points.
                } else if (this.gamers[i][c].value == 1) {
                    tempResult += 11; // Ace is worth 11 points.
                    tempA = true; // Player has an Ace.
                } else {
                    tempResult += this.gamers[i][c].value;
                }
            }
            if (tempResult == 21 || (tempA && tempResult == 31)) {
                winner.push(i); // Player's total is 21 or has an Ace and total is 31, they win.
            } else {
                tempResult = 0; // Reset the temporary result for the next player.
                tempA = false;
            }
        }

        return winner; // Return the array of winning player indices.
    }
    
    getCardsForPlayer(playerNumber) {
        return this.gamers[playerNumber];
    }

    restartGame(){
        this.cards = this.generateDeck();
        this.gamers = [[], [], [], []];
        this.player = 0;
        this.take2CardsforGamers();
    }

    nextPlayer(){
        this.player++;
        return this.player;
    }
}

module.exports = Game;

/* //if need to run in console
for(let c=0; c<5; c++){
    let game = new Game();
    game.make2CardsforGamers();
    //game.make1CardforGamer(1);
    let winner = game.returnWinner();
    if(winner != false){
        console.log(game.gamers[winner]); 
        console.log(c);
    }else{
        game.make1CardforGamer(0);
        game.make1CardforGamer(1);
        game.make1CardforGamer(2);
        game.make1CardforGamer(3);
        winner = game.returnWinner();
        if(winner != false){
            console.log(game.gamers[winner]); 
            console.log("second try");
            console.log(c);
        }
    }
}
*/