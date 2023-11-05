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


export {ElienBoss, Elien5Level, Elien3and4Level, Elien1and2Level}