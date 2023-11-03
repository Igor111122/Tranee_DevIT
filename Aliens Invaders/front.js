
class Elien{
    constructor(speedOfbullet = 9){
        this.speedOfbullet = speedOfbullet;
        this.aliensContainer = document.getElementById('aliens');
        this.aliensGoright = false;
        this.numCol = 5;
        this.body = document.getElementById('body');
        this.alianBullet = document.getElementById('alianBullet');
        this.gameContainer = document.getElementById('game-container');
    }

    createEliens(numRow = 2){
        let counterArr =0;
        for (let row = 0; row < numRow; row++) {
            for (let col = 0; col < this.numCol; col++) {
                const alien = document.createElement('div');
                alien.className = 'alien'+(counterArr);
                counterArr++;
                if(counterArr==9){counterArr=0}
                alien.style.position = 'absolute';
                alien.style.width = '50px';
                alien.style.height = '50px';
                alien.style.backgroundImage = "url('Pictures/Aliens.png')";
                alien.style.backgroundSize = "160px 200px";
                alien.id = "alien";
                alien.value = 0;
                alien.style.top = row * 60 + 'px';
                alien.style.left = col * 60 + 'px';
                this.aliensContainer.appendChild(alien);
            }
        }
    }

    goEliens(){
        if(this.aliensGoright==false){
            this.aliensContainer.style.position = 'absolute';
            this.aliensContainer.style.left = (this.aliensContainer.offsetLeft + 3) + 'px';
            if(this.aliensContainer.offsetLeft > ((this.body.offsetWidth/2)-this.numCol*60)){
                this.aliensGoright = true;
            }
        }
        if(this.aliensGoright){
            this.aliensContainer.style.position = 'absolute';
            this.aliensContainer.style.left = (this.aliensContainer.offsetLeft - 3) + 'px';
            if(this.aliensContainer.offsetLeft<10){
                this.aliensGoright = false;
            }
        }
    }

    teleportBullet(){
        this.alianBullet.style.top = this.alianBullet.offsetTop - this.alianBullet.offsetTop + 'px';
        // Генерируем случайное место для начальной позиции пули в aliensContainer
        const randomPosition = Math.floor(Math.random() * this.numCol*60);// сделать зависимость от количества col
        this.alianBullet.style.left = (this.aliensContainer.offsetLeft + randomPosition) + 'px';
    }

    goBullet(){
        this.alianBullet.style.top = (this.alianBullet.offsetTop + this.speedOfbullet) + 'px';
    }

    checkCollision(){
        this.goBullet();
        if (this.alianBullet.offsetTop > this.gameContainer.offsetHeight - 50) {
            // Проверка на столкновение с игроком
            const playerRect = document.getElementById('player').getBoundingClientRect();
            const bulletsRect = this.alianBullet.getBoundingClientRect();
            if (
                bulletsRect.right > playerRect.left &&
                bulletsRect.left < playerRect.right &&
                bulletsRect.bottom > playerRect.top &&
                bulletsRect.top < playerRect.bottom
            ) {
                //alert("Game Over!");
                lives--;
                document.getElementById('lives').textContent = lives + "   Lives";
                if(lives == 0){alert("Game Over!");}
                
            } 
            this.teleportBullet();
        }
    }

}


class Elien1and2Level {
    constructor(elienLives = 0){
        this.aliensContainer = document.getElementById('aliens');
        this.numCol = 5;
        this.elienLives = elienLives;
    }

    createEliens(numRow = 2){
        let counterArr =0;
        for (let row = 0; row < numRow; row++) {
            for (let col = 0; col < this.numCol; col++) {
                const alien = document.createElement('div');
                alien.className = 'alien'+(counterArr);
                counterArr++;
                if(counterArr==9){counterArr=0}
                alien.style.position = 'absolute';
                alien.style.width = '50px';
                alien.style.height = '50px';
                alien.style.backgroundImage = "url('Pictures/Aliens.png')";
                alien.style.backgroundSize = "160px 200px";
                alien.id = "alien";
                alien.value = this.elienLives;
                alien.style.top = row * 60 + 'px';
                alien.style.left = col * 60 + 'px';
                this.aliensContainer.appendChild(alien);
            }
        }
    }
}


class Elien3and4Level extends Elien1and2Level {
    constructor(speedOfbullet = 9, elienLives=0){
        super(elienLives);
        this.speedOfbullet = speedOfbullet;
        this.aliensGoright = false;
        this.body = document.getElementById('body');
        this.alianBullet = document.getElementById('alianBullet');
        this.gameContainer = document.getElementById('game-container');
        this.aliensContainer = document.getElementById('aliens');
    }

    teleportBullet(){
        this.alianBullet.style.top = this.alianBullet.offsetTop - this.alianBullet.offsetTop + 'px';
        // Генерируем случайное место для начальной позиции пули в aliensContainer
        const randomPosition = Math.floor(Math.random() * this.numCol*60);// сделать зависимость от количества col
        this.alianBullet.style.left = (this.aliensContainer.offsetLeft + randomPosition) + 'px';
    }

    goBullet(){
        this.alianBullet.style.top = (this.alianBullet.offsetTop + this.speedOfbullet) + 'px';
    }

    checkCollision(){
        this.goBullet();
        if (this.alianBullet.offsetTop > this.gameContainer.offsetHeight - 50) {
            // Проверка на столкновение с игроком
            const playerRect = document.getElementById('player').getBoundingClientRect();
            const bulletsRect = this.alianBullet.getBoundingClientRect();
            if (
                bulletsRect.right > playerRect.left &&
                bulletsRect.left < playerRect.right &&
                bulletsRect.bottom > playerRect.top &&
                bulletsRect.top < playerRect.bottom
            ) {
                //alert("Game Over!");
                lives--;
                document.getElementById('lives').textContent = lives + "   Lives";
                if(lives == 0){alert("Game Over!");}
                
            } 
            this.teleportBullet();
        }
    }

}


class Elien5Level extends Elien3and4Level {
    constructor(){
        super(9,1);
        this.aliensGoright = false;
        this.body = document.getElementById('body');
    }
    
    goEliens(){
        if(this.aliensGoright==false){
            this.aliensContainer.style.position = 'absolute';
            this.aliensContainer.style.left = (this.aliensContainer.offsetLeft + 3) + 'px';
            if(this.aliensContainer.offsetLeft > ((this.body.offsetWidth/2)-this.numCol*60)){
                this.aliensGoright = true;
            }
        }
        if(this.aliensGoright){
            this.aliensContainer.style.position = 'absolute';
            this.aliensContainer.style.left = (this.aliensContainer.offsetLeft - 3) + 'px';
            if(this.aliensContainer.offsetLeft<10){
                this.aliensGoright = false;
            }
        }
    }
}






























































































class Player{
    constructor(){
        this.gameContainer = document.getElementById('game-container');
        this.player = document.getElementById('player');
        this.playerBullet = document.getElementById('playerBullet');
        this.playerShoot = false;
        this.aliensContainer = document.getElementById('aliens');
    }

    addListenergoLeftRight(speedOfplayer){
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft' && this.player.offsetLeft > 0) {
                this.player.style.left = (this.player.offsetLeft - speedOfplayer) + 'px';
            } else if (event.key === 'ArrowRight' && this.player.offsetLeft < this.gameContainer.offsetWidth - this.player.offsetWidth) {
                this.player.style.left = (this.player.offsetLeft + speedOfplayer) + 'px';
            }
        });
    }

    addListenerShoot(){
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Control' && this.playerShoot == false) {
                this.playerBullet.style.backgroundColor = "#f00";
                this.playerShoot = true;
                this.playerBullet.style.left = this.player.offsetLeft + (this.player.offsetWidth/2) + 'px';
                this.playerBullet.style.top = this.player.offsetTop + 'px';
            }
        });
    }

    returnBullettoStart(){
        this.playerBullet.style.top = this.player.offsetTop + 'px';
        this.playerBullet.style.left = this.player.offsetLeft + 'px';
        this.playerBullet.style.backgroundColor = "rgba(0,0,0,0)";
        this.playerShoot = false;
    }

    pushBullet(){
        if(this.playerShoot){
            this.playerBullet.style.top = playerBullet.offsetTop - 10 + 'px';
            if(playerBullet.offsetTop < 10){
                this.returnBullettoStart();
            }
        }
    }

    checkCollision(){
        let score = 0;
        let aliens = Array.from(document.querySelectorAll('#alien')); // Собираем всех пришельцев в массив
        // Проверка на столкновение пули игрока с пришельцами
        const playerBulletRect = this.playerBullet.getBoundingClientRect();
        aliens.forEach((alien, index) => {
            const alienRect = alien.getBoundingClientRect();
            if (
                playerBulletRect.right > alienRect.left &&
                playerBulletRect.left < alienRect.right &&
                playerBulletRect.bottom > alienRect.top &&
                playerBulletRect.top < alienRect.bottom
            ) {
                // Удаление пришельца, который был попаданием
                
                if(alien.value <= 0){
                    this.aliensContainer.removeChild(alien);
                    aliens.splice(index, 1);
                    score++;
                    if (Math.random() < 0.05){
                        lives++;
                        document.getElementById('lives').textContent = lives + "   Lives";
                    }
                    const scoreElement = document.getElementById('score');
                    scoreElement.textContent = 'Score = ' + score;
                }else{
                    alien.value--;
                }
                this.returnBullettoStart();
            }
        });
    }

}



class Barrier extends Elien5Level{

    constructor() {
        super();
        this.barrierHits = {}; // Объект для отслеживания попаданий по барьерам
    }

    createBarriers(){
        for (let col = 1; col < 4; col++) {
            const barrer = document.createElement('div');
            barrer.className = 'barrier';
            barrer.style.position = 'absolute';
            barrer.style.width = '100px';
            barrer.style.height = '50px';
            barrer.style.backgroundImage = "url('Pictures/Barrier.webp')";
            barrer.style.backgroundSize = "contain";
            barrer.id = `barrier-${col}`;;
            barrer.style.top = 70 + '%';
            barrer.style.left = col * 24 + '%';
            this.gameContainer.appendChild(barrer);
            this.barrierHits[`barrier-${col}`] = 0; // Инициализируем счетчик попаданий для каждого барьера
        }
    }

    checkCollision(){
        let barriers = Array.from(document.querySelectorAll('.barrier'));

        const alianBulletRect = this.alianBullet.getBoundingClientRect();
        barriers.forEach((barrier, index) => {
            const barrierRect = barrier.getBoundingClientRect();
            if (
                alianBulletRect.right > barrierRect.left &&
                alianBulletRect.left < barrierRect.right &&
                alianBulletRect.bottom > barrierRect.top &&
                alianBulletRect.top < barrierRect.bottom
            ) {
                /*
                this.gameContainer.removeChild(barrier);
                barriers.splice(index, 1);
                this.teleportBullet();
                */  
                const barrierId = barrier.id;
                this.barrierHits[barrierId]++; // Увеличиваем счетчик попаданий для данного барьера
                if (this.barrierHits[barrierId] >= 4) {
                    this.gameContainer.removeChild(barrier);
                    // Если попаданий стало 4 или больше, удаляем барьер полностью
                    delete this.barrierHits[barrierId];
                }
                this.teleportBullet();
            }
        });
    }

}


//class Game{}



let lives = 3;
let elien = new Elien5Level();
let player = new Player();
let barrer = new Barrier();

elien.createEliens(2);

barrer.createBarriers();

player.addListenergoLeftRight(20);

player.addListenerShoot();

setInterval(() => {

    player.pushBullet();

    elien.goEliens();

    barrer.checkCollision();

    player.checkCollision();

    elien.checkCollision();

}, 10);












