import {ElienBoss, Elien5Level, Elien3and4Level, Elien1and2Level} from './Alians.js';
import {Barrier, Player} from './PlayerandBarrier.js';

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

