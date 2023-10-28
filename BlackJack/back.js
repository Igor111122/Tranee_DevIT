class Card{
    constructor(value, suit){
        this.value = value;
        this.suit = suit;
    }
}

export default class Game {
    constructor() {
        this.cards = this.generateDeck(); // Создаем и перемешиваем колоду карт
        this.gamers = [[], [], [], []];
    }

    generateDeck() {
        const suits = ["hearts", "diamonds", "clubs", "spades"];
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // 1-A 11=J 12=Q 13=K
        const deck = [];

        for (const suit of suits) {
            for (const value of values) {
                deck.push(new Card(value, suit));
            }
        }

        // Перемешиваем колоду
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

        return deck;
    }

    generateCard() {
        // Извлекаем карту из колоды
        if (this.cards.length === 0) {
            // Если колода опустела, создаем и перемешиваем новую
            this.cards = this.generateDeck();
        }
        return this.cards.pop();
    }

    make2CardsforGamers(){
        for(let c=0; c<4; c++){
            this.gamers[c].push(this.generateCard());
            this.gamers[c].push(this.generateCard());
        }
    }

    make1CardforGamer(indexOfGamer){
        const card = this.generateCard();
        this.gamers[indexOfGamer].push(card);
        return card;
    }

    returnWinner(){
        let winner=[];
        let tempResult = 0;
        let tempA =false;// if A exist
        for(let i=0; i<4; i++){
            for(let c=0; c<this.gamers[i].length; c++){
                if(this.gamers[i][c].value == 11 || this.gamers[i][c].value == 12 || this.gamers[i][c].value == 13){
                    tempResult += 10;
                } else if(this.gamers[i][c].value == 1){
                    tempResult += 11;
                    tempA = true;
                }else{
                    tempResult += this.gamers[i][c].value;
                }
            }
            if(tempResult == 21 || tempA && tempResult==31){
                winner.push(i);
            }else{
                tempResult = 0;
            }
        }
        return winner
    }
}
/*
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