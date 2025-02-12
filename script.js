// Настройки игры
const maxHearts = 10; // Максимальное количество сердечек на экране
const heartLifetime = 7000; // Время жизни сердечка в миллисекундах (5 секунд)
const hearts = []; // Массив для хранения активных сердечек

// Игра "Собери сердечки"
let score = 0;
const scoreElement = document.getElementById("score");
// Открывающиеся сердечки с сообщениями
function showMessage(id) {
    const message = document.getElementById(`message${id}`);
    if (message.style.display === "block") {
        // Добавляем класс для анимации исчезновения
        message.classList.add("hide");
        // Ждём завершения анимации и скрываем сообщение
        setTimeout(() => {
            message.style.display = "none";
            message.classList.remove("hide"); // Убираем класс, чтобы анимация сработала снова
        }, 500); // 500ms — длительность анимации
    } else {
        message.style.display = "block"; // Показываем сообщение
    }
}

// Секретное сообщение
function showSecret() {
    const secretMessage = document.getElementById("secretMessage");
    secretMessage.style.display = "block";
    secretMessage.style.opacity = "1";
}
// Функция для создания сердечка
// Функция для создания сердечка
function createHeart() {
    if (hearts.length >= maxHearts) return; // Не создавать новые сердечки, если их уже достаточно

    const heart = document.createElement("div");
    heart.classList.add("game-heart");
    heart.innerHTML = `
        <svg viewBox="0 0 24 24" width="48" height="48" fill="#ff0000">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;

    // Случайные начальные координаты
    const x = Math.random() * (window.innerWidth - 48); // 48 — ширина сердечка
    const y = Math.random() * (window.innerHeight - 48); // 48 — высота сердечка
    heart.style.left = x + "px";
    heart.style.top = y + "px";

    // Анимация появления
    heart.style.opacity = 0;
    setTimeout(() => {
        heart.style.opacity = 1;
    }, 10);

    // Добавляем обработчик клика
    heart.onclick = () => {
        score++;
        scoreElement.textContent = `Собрано: ${score}`;
        removeHeart(heart); // Удаляем сердечко при клике
    };

    // Добавляем сердечко в массив и на экран
    hearts.push(heart);
    document.getElementById("game").appendChild(heart);

    // Запускаем движение
    moveHeart(heart);

    // Удаляем сердечко через заданное время
    setTimeout(() => {
        removeHeart(heart);
    }, heartLifetime);
}
// Функция для удаления сердечка
function removeHeart(heart) {
    if (!heart) return;

    // Анимация исчезновения
    heart.style.opacity = 0;
    setTimeout(() => {
        heart.remove(); // Удаляем сердечко из DOM
        hearts.splice(hearts.indexOf(heart), 1); // Удаляем сердечко из массива
    }, 500); // 500ms — длительность анимации исчезновения
}

// Функция для движения сердечка
function moveHeart(heart) {
    const speed = 2; // Скорость движения
    const angle = Math.random() * 2 * Math.PI; // Случайное направление

    let dx = Math.cos(angle) * speed;
    let dy = Math.sin(angle) * speed;

    const move = () => {
        if (!heart) return;

        // Получаем текущие координаты
        let x = parseFloat(heart.style.left) || 0;
        let y = parseFloat(heart.style.top) || 0;

        // Обновляем координаты
        x += dx;
        y += dy;

        // Отскок от границ экрана
        if (x < 0 || x > window.innerWidth - 48) dx *= -1;
        if (y < 0 || y > window.innerHeight - 48) dy *= -1;

        // Применяем новые координаты
        heart.style.left = x + "px";
        heart.style.top = y + "px";

        // Продолжаем движение
        requestAnimationFrame(move);
    };

    move();
}

// Создаём новые сердечки каждую секунду
setInterval(createHeart, 1000);