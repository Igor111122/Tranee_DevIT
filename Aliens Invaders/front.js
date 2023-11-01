const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const alianBullet = document.getElementById('alianBullet');
const playerBullet = document.getElementById('playerBullet');
const aliensContainer = document.getElementById('aliens');
const body = document.getElementById('body');
const livesElement = document.getElementById('lives');
const numCol = 5;
let playerShoot = false;

let counterArr =0;
for (let row = 0; row < 2; row++) {
    for (let col = 0; col < numCol; col++) {
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
        alien.style.top = row * 60 + 'px';
        alien.style.left = col * 60 + 'px';
        aliensContainer.appendChild(alien);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.offsetLeft > 0) {
        player.style.left = (player.offsetLeft - 10) + 'px';
    } else if (event.key === 'ArrowRight' && player.offsetLeft < gameContainer.offsetWidth - player.offsetWidth) {
        player.style.left = (player.offsetLeft + 10) + 'px';
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Control' && playerShoot == false) {
        playerBullet.style.backgroundColor = "#f00";
        playerShoot = true;
        playerBullet.style.left = player.offsetLeft + 'px';
        playerBullet.style.top = player.offsetTop + 'px';
    }
});


let aliensDirection = false;
let lives = 3;
let aliens = Array.from(document.querySelectorAll('#alien')); // Собираем всех пришельцев в массив
let score = 0;
setInterval(() => {
    if(playerShoot){
        playerBullet.style.top = playerBullet.offsetTop - 10 + 'px';
        if(playerBullet.offsetTop < 10){
            playerBullet.style.top = player.offsetTop + 'px';
            playerBullet.style.left = player.offsetLeft + 'px';
            playerBullet.style.backgroundColor = "rgba(0,0,0,0)";
            playerShoot = false;
        }
    }

    if(aliensDirection==false){
        aliensContainer.style.position = 'absolute';
        aliensContainer.style.left = (aliensContainer.offsetLeft + 3) + 'px';
        if(aliensContainer.offsetLeft > ((body.offsetWidth/2)-numCol*60)){
            aliensDirection = true;
        }
    }
    if(aliensDirection){
        aliensContainer.style.position = 'absolute';
        aliensContainer.style.left = (aliensContainer.offsetLeft - 3) + 'px';
        if(aliensContainer.offsetLeft<10){
            aliensDirection = false;
        }
    }

    // Проверка на столкновение пули игрока с пришельцами
    const playerBulletRect = playerBullet.getBoundingClientRect();
    aliens.forEach((alien, index) => {
        const alienRect = alien.getBoundingClientRect();
        if (
            playerBulletRect.right > alienRect.left &&
            playerBulletRect.left < alienRect.right &&
            playerBulletRect.bottom > alienRect.top &&
            playerBulletRect.top < alienRect.bottom
        ) {
            // Удаление пришельца, который был попаданием
            aliensContainer.removeChild(alien);
            aliens.splice(index, 1);

            score++;
            const scoreElement = document.getElementById('score');
            scoreElement.textContent = 'Score = ' + score;
            // Возвращаем пулю игрока в исходное положение
            playerBullet.style.top = player.offsetTop + 'px';
            playerBullet.style.left = player.offsetLeft + 'px';
            playerBullet.style.backgroundColor = "rgba(0,0,0,0)";
            playerShoot = false;
        }
    });

    alianBullet.style.top = (alianBullet.offsetTop + 9) + 'px';
    if (alianBullet.offsetTop > gameContainer.offsetHeight - 50) {
        // Проверка на столкновение с игроком
        const playerRect = player.getBoundingClientRect();
        const bulletsRect = alianBullet.getBoundingClientRect();
        if (
            bulletsRect.right > playerRect.left &&
            bulletsRect.left < playerRect.right &&
            bulletsRect.bottom > playerRect.top &&
            bulletsRect.top < playerRect.bottom
        ) {
            //alert("Game Over!");
            lives--;
            livesElement.textContent = lives + "   Lives";
            if(lives == 0){alert("Game Over!");}
            alianBullet.style.top = (alianBullet.offsetTop - 400) + 'px';
            // Генерируем случайное место для начальной позиции пули в aliensContainer
            const randomPosition = Math.floor(Math.random() * numCol*60);// сделать зависимость от количества col
            alianBullet.style.left = (aliensContainer.offsetLeft + randomPosition) + 'px';
        } else {
            alianBullet.style.top = (alianBullet.offsetTop - gameContainer.offsetHeight +50) + 'px';

            // Генерируем случайное место для начальной позиции пули в aliensContainer
            const randomPosition = Math.floor(Math.random() * numCol*60);// сделать зависимость от количества col
            alianBullet.style.left = (aliensContainer.offsetLeft + randomPosition) + 'px';
        }
    }
}, 10);

class Elien{}
class Player{}
class Game{}
class Barriers{}