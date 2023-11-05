import {ElienBoss, Elien5Level, Elien3and4Level, Elien1and2Level} from './Alians.js';

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

export {Barrier, Player}