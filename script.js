const maxHearts = 80;
const heartLifetime = 5000;
const hearts = [];

let score = 0;
const scoreElement = document.getElementById("score");
function createHeartBouquet() {
    const bouquetSize = 20;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < bouquetSize; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart-bouquet");
        heart.innerHTML = `
            <svg viewBox="0 0 24 24" width="48" height="48" fill="#ff0000">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `;

        heart.style.left = centerX + "px";
        heart.style.top = centerY + "px";

        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 5 + 2;

        const move = () => {
            const x = parseFloat(heart.style.left);
            const y = parseFloat(heart.style.top);

            heart.style.left = x + Math.cos(angle) * speed + "px";
            heart.style.top = y + Math.sin(angle) * speed + "px";

            if (x < -50 || x > window.innerWidth + 50 || y < -50 || y > window.innerHeight + 50) {
                heart.remove();
            } else {
                requestAnimationFrame(move);
            }
        };

        document.body.appendChild(heart);
        move();
    }
}
function showSecret() {
    const secretMessage = document.getElementById("secretMessage");
    if (secretMessage.style.display === "block") {
        secretMessage.classList.add("hide");
        setTimeout(() => {
            secretMessage.style.display = "none";
            secretMessage.classList.remove("hide");
        }, 500);
        secretMessage.style.display = "block";
    }
}

window.onload = createHeartBouquet;
function showMessage(id) {
    const message = document.getElementById(`message${id}`);
    if (message.style.display === "block") {
        message.classList.add("hide");
        setTimeout(() => {
            message.style.display = "none";
            message.classList.remove("hide");
        }, 500);
    } else {
        message.style.display = "block";
    }
}

function showSecret() {
    const secretMessage = document.getElementById("secretMessage");
    secretMessage.style.display = "block";
    secretMessage.style.opacity = "1";
}

function createHeart() {
    if (hearts.length >= maxHearts) return;

    const heart = document.createElement("div");
    heart.classList.add("game-heart");
    heart.innerHTML = `
        <svg viewBox="0 0 24 24" width="48" height="48" fill="#ff0000">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;

    const x = Math.random() * (window.innerWidth - 48);
    const y = Math.random() * (window.innerHeight - 48);
    heart.style.left = x + "px";
    heart.style.top = y + "px";

    heart.style.opacity = 0;
    setTimeout(() => {
        heart.style.opacity = 1;
    }, 10);

    heart.onclick = () => {
        score++;
        scoreElement.textContent = `Собрано: ${score}`;
        removeHeart(heart);
    };

    hearts.push(heart);
    document.getElementById("game").appendChild(heart);
    moveHeart(heart);

    setTimeout(() => {
        removeHeart(heart);
    }, heartLifetime);
}
function removeHeart(heart) {
    if (!heart) return;

    heart.style.opacity = 0;
    setTimeout(() => {
        heart.remove();
        hearts.splice(hearts.indexOf(heart), 1);
    }, 500);
}

function moveHeart(heart) {
    const speed = 1;
    const angle = Math.random() * 2 * Math.PI;

    let dx = Math.cos(angle) * speed;
    let dy = Math.sin(angle) * speed;

    const move = () => {
        if (!heart) return;

        let x = parseFloat(heart.style.left) || 0;
        let y = parseFloat(heart.style.top) || 0;

        x += dx;
        y += dy;

        if (x < 0 || x > window.innerWidth - 48) dx *= -1;
        if (y < 0 || y > window.innerHeight - 48) dy *= -1;

        heart.style.left = x + "px";
        heart.style.top = y + "px";
        requestAnimationFrame(move);
    };

    move();
}

setInterval(createHeart, 700);


