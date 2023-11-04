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
                lives--;
                document.getElementById('lives').textContent = lives + "   Lives";
                if(lives == 0){
                    //alert("Game Over!");
                    return 0;
                }
                
            } 
            this.teleportBullet();
        }
    }

}


class Elien5Level extends Elien3and4Level {
    constructor(speedOfbullet = 9, elienLives=1){
        super(speedOfbullet,elienLives);
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


class ElienBoss extends Elien5Level {
    constructor(){
        super(15,10);
        this.aliensGoright = false;
        this.body = document.getElementById('body');
    }
    
    createEliens(){
        const boss = document.createElement('div');
        boss.className = 'boss';
        boss.style.position = 'absolute';
        boss.style.width = '200px';
        boss.style.height = '100px';
        boss.style.backgroundImage = "url('Pictures/AlienMothership.webp')";
        boss.style.backgroundSize = "contain";
        boss.style.backgroundRepeat = "no-repeat"
        boss.id = "alien";
        boss.value = this.elienLives;
        this.aliensContainer.appendChild(boss);
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
        this.playerBullet2 = document.getElementById('playerBullet2');
        this.numOfbullets = 1;
        this.playerShoot = false;
        this.aliensContainer = document.getElementById('aliens');
        this.score = 0;
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

                if(this.numOfbullets == 2){
                    this.playerBullet2.style.backgroundColor = "#f00";
                    this.playerBullet2.style.left = this.player.offsetLeft + (this.player.offsetWidth/2) + 'px';
                    this.playerBullet2.style.top = this.player.offsetTop + 50 + 'px';
                }
            }
        });
    }

    returnBullettoStart(bullet){
        bullet.style.top = this.player.offsetTop + 'px';
        bullet.style.left = this.player.offsetLeft + 'px';
        bullet.style.backgroundColor = "rgba(0,0,0,0)";
        if(this.numOfbullets == 2 && bullet.id == "playerBullet2"){
            this.playerShoot = false;
        }
        if(this.numOfbullets == 1){
            this.playerShoot = false;
        }
    }

    moveBullet(bullet) {
        if(this.playerShoot){
            bullet.style.top = bullet.offsetTop - 10 + 'px';
            if(bullet.offsetTop < 10){
                this.returnBullettoStart(bullet);
            }
        }

    }

    pushBullet(){
        this.moveBullet(this.playerBullet);
        if(this.numOfbullets == 2){
            this.moveBullet(this.playerBullet2);
        }
    }

    checkBulletCollision(bulletRect, alienRect) {
        return (
            bulletRect.right > alienRect.left &&
            bulletRect.left < alienRect.right &&
            bulletRect.bottom > alienRect.top &&
            bulletRect.top < alienRect.bottom
        );
    }
    
    checkCollision(){
        let aliens = Array.from(document.querySelectorAll('#alien')); // Собираем всех пришельцев в массив
        if(aliens.length == 0){return 1}
        // Проверка на столкновение пули игрока с пришельцами
        const playerBulletRect = this.playerBullet.getBoundingClientRect();
        const playerBulletRect2 = this.playerBullet2.getBoundingClientRect();
        aliens.forEach((alien, index) => {
            const alienRect = alien.getBoundingClientRect();
            if (this.checkBulletCollision(playerBulletRect,alienRect)) {
                this.handleBulletCollision(this.playerBullet,alien, aliens, index);
            }
            if (this.checkBulletCollision(playerBulletRect2,alienRect)) {
                this.handleBulletCollision(this.playerBullet2,alien, aliens, index);
            }
        });
    }

    handleBulletCollision(playerBullet,alien, aliens, index) {
        if (alien.value <= 0) {
            this.aliensContainer.removeChild(alien);
            aliens.splice(index, 1);
            this.score++;
            if (Math.random() < 0.05) {
                if (Math.random() < 0.50) {
                lives++;
                document.getElementById('lives').textContent = lives + "   Lives";
                }else{
                   this.numOfbullets = 2;
                    setTimeout(()=>{
                        this.numOfbullets = 1;
                        this.playerBullet2.style.backgroundColor = "rgba(0,0,0,0)";
                    }, 10000); 
                }
            }
            const scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score = ' + this.score;
        } else {
            alien.value--;
        }
        this.returnBullettoStart(playerBullet);
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


class Game{
    constructor() {
        this.levelsHTML = document.getElementById('level');
        this.player = new Player();
        this.barrer = new Barrier();
        this.currentLevel = 1;
      }
    
    startGame() {
    this.playLevel(this.currentLevel);
    }

    playLevel(level) {
    switch (level) {
        case 1:
            this.level1();
            break;
        case 2:
            this.level2();
            break;
        case 3:
            this.level3();
            break;
        case 4:
            this.level4();
            break;
        case 5:
            this.level5();
            break;
        case 6:
            this.Boss();
            break;
        default:
            alert("You've completed all levels!");
            break;
    }
    }

    restartGame() {
    location.reload();
    }

    levelCompleted() {
    alert("You won!");
    this.currentLevel++;
    this.levelsHTML.textContent = "Level " + this.currentLevel;
    this.playLevel(this.currentLevel);
    }

    levelFailed() {
    alert("Game over");
    this.restartGame();
    }

    level1(){
        let elien = new Elien1and2Level();
        elien.createEliens();

        this.player.addListenergoLeftRight(20);
        this.player.addListenerShoot();

        setInterval(() => {
            this.player.pushBullet();

            if(this.player.checkCollision() == 1){
                this.levelCompleted();
            }
            
        }, 10);
    }

    level2(){
        let elien = new Elien1and2Level(1);
        elien.createEliens();
        setInterval(() => {
            if(this.player.checkCollision() == 1){
                this.levelCompleted();
            }
        }, 10);
    }

    level3(){
        let elien = new Elien3and4Level(5,0);
        elien.createEliens();
        this.barrer.createBarriers();

        setInterval(() => {
            this.barrer.checkCollision();

            if(this.player.checkCollision() == 1){
                this.levelCompleted();
            }

            if(elien.checkCollision() == 0){
                this.levelFailed();
            }
            
        }, 10);

    }

    level4(){
        let elien = new Elien3and4Level(9,1);
        elien.createEliens();
        this.barrer.createBarriers();

        setInterval(() => {
            if(this.player.checkCollision() == 1){
                this.levelCompleted();
            }

        }, 10);
    }

    level5(){
        let elien = new Elien5Level();
        elien.createEliens();
        this.barrer.createBarriers();

        setInterval(() => {
            elien.goEliens();
            if(this.player.checkCollision() == 1){
                this.levelCompleted();
            }
            
        }, 10);

    }

    Boss(){
        let elien = new ElienBoss();

        elien.createEliens();
        this.barrer.createBarriers();

        setInterval(() => {
            if(this.player.checkCollision() == 1){
                alert("Game ended successfully");
                this.restartGame();
            }
            
        }, 10);
    }

}



let lives = 3;

let game = new Game();
game.startGame();

/*
let elien = new ElienBoss();
let player = new Player();
let barrer = new Barrier();

elien.createEliens();

barrer.createBarriers();

player.addListenergoLeftRight(20);

player.addListenerShoot();

setInterval(() => {

    player.pushBullet();

    elien.goEliens();

    barrer.checkCollision();

    if(player.checkCollision() == 1){
        alert("You won!");
    }


    if(elien.checkCollision() == 0){
        alert("Game over");
    }
    

}, 10);
*/
