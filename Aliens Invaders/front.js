const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.offsetLeft > 0) {
        player.style.left = (player.offsetLeft - 7) + 'px';
    } else if (event.key === 'ArrowRight' && player.offsetLeft < gameContainer.offsetWidth - player.offsetWidth) {
        player.style.left = (player.offsetLeft + 7) + 'px';
    }
});

setInterval(() => {
    const bullets = document.getElementById('bullets');
    bullets.style.top = (bullets.offsetTop + 3) + 'px';
    if(bullets.style.top > 510 + 'px'){
        bullets.style.top = (bullets.offsetTop - 400) + 'px';
    }
}, 10)

