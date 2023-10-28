import Game from './back.js';

class Front{
    constructor(){
        this.game = new Game();
        this.winner = 0;
        this.tempWinner = false;
        this.player =0;
    }

    giveStartCarts(){
        this.game.make2CardsforGamers();
        for(let c=0; c<4; c++){
            this.game.gamers[c].forEach((card)=>{
                let div = document.getElementById("Player"+c);

                let img = document.createElement("img");
                img.src = 'Carts/'+card.value + '_'+card.suit + '.png';
           
                // Добавляем новый элемент в элемент <div>
                div.appendChild(img);
            });
            
        }
    }

    checkWinner(){
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
            // Обработка ситуации, когда нет победителей
            // Это может включать в себя вывод сообщения о ничьей или другие действия.
        }
        
    }

    nextPlayer(){
    
        if(this.player ==3){
            this.checkWinner();
            this.player = -1;
            document.querySelector('#skipTurn').disabled = true;
            document.querySelector('#addCard').disabled = true;
            document.getElementById("CurrentPlayer").textContent = `Game over`; 
        }else{
            this.player++;
            document.getElementById("CurrentPlayer").textContent = `Now it's player ${this.player+1} turn`; 
         }
    }

    addCard(){
        let card = this.game.make1CardforGamer(this.player);
        let div = document.getElementById("Player"+this.player);
    
    
        let img = document.createElement("img");
        img.src = 'Carts/'+card.value + '_'+card.suit + '.png';
    
        // Добавляем новый элемент в элемент <div>
        div.appendChild(img);
        if(this.player ==3){
            this.checkWinner();
            this.player = -1;
            document.querySelector('#skipTurn').disabled = true;
            document.querySelector('#addCard').disabled = true;
            document.getElementById("CurrentPlayer").textContent = `Game over`; 
        }else{
           this.player++;
            document.getElementById("CurrentPlayer").textContent = `Now it's player ${this.player+1} turn`; 
        }
    }
}

let front = new Front();
front.giveStartCarts();
front.checkWinner();


// Добавляем обработчик события для нажатия на кнопку
document.getElementById("Restart").addEventListener("click", function() {
    // Перезагружаем страницу
    location.reload();
});

document.getElementById("addCard").addEventListener("click", function() {
    front.addCard();
});
document.getElementById("skipTurn").addEventListener("click", function() {
    front.nextPlayer();
});


