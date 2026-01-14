const colors = [
    { name: "Cold White", hex: "#D9DFE5" },
    { name: "Polymaker Teal", hex: "#4CC0C7" },
    { name: "Brown", hex: "#55331A" },
    { name: "Steel Grey", hex: "#616469" },
    { name: "Yellow", hex: "#FFE800" },
    { name: "Orange", hex: "#F67405" },
    { name: "Green", hex: "#06924D" },
    { name: "Blue", hex: "#003776" },
    { name: "Red", hex: "#E72F1D" },
    { name: "Grey", hex: "#8C9099" },
    { name: "White", hex: "#EBF7FF" },
    { name: "Black", hex: "#080A0D" },
    { name: "Dark Grey", hex: "#485259" },
    { name: "Dark Olive Drab", hex: "#575B54" },
    { name: "Tan", hex: "#A79E82" },
    { name: "Azure Blue", hex: "#0066D9" },
    { name: "Magenta", hex: "#F24574" },
    { name: "Lime Green", hex: "#D5D701" },
    { name: "Cream", hex: "#EED1A8" },
    { name: "Lemon Yellow", hex: "#EED230" },
    { name: "Stone Blue", hex: "#487BA2" },
    { name: "Aqua Blue", hex: "#5EBDDB" },
    { name: "Beige", hex: "#C2AB72" },
    { name: "Olive Green", hex: "#948902" },
    { name: "Jungle Green", hex: "#4E742D" },
    { name: "Wine Red", hex: "#D60212" },
    { name: "Purple", hex: "#6C47B2" },
    { name: "Pink", hex: "#F1A1AF" }
];

const gameBoard = document.getElementById('game-board');

function createGrid() {
    gameBoard.innerHTML = '';

    // Calculate how many hexes fit
    // This is an estimation. We'll refine it or just make a static wall.
    // For a wall, we want rows of hexes.

    const hexWidth = 60; // from CSS
    const width = gameBoard.clientWidth;
    const height = gameBoard.clientHeight;

    const hexesPerRow = Math.floor(width / (hexWidth + 4)) + 1; // +1 to ensure coverage
    const rows = Math.floor(height / (hexWidth * 0.866)) + 2;

    // Create a shuffled list of colors to fill the wall
    let fillColors = [];
    while (fillColors.length < rows * hexesPerRow) {
        fillColors = fillColors.concat(colors);
    }
    // Shuffle
    fillColors.sort(() => Math.random() - 0.5);

    let colorIndex = 0;

    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'hex-row';

        for (let c = 0; c < hexesPerRow; c++) {
            const hexDiv = document.createElement('div');
            hexDiv.className = 'hex';

            const color = fillColors[colorIndex % fillColors.length];
            colorIndex++;

            hexDiv.style.setProperty('--hex-color', color.hex);
            hexDiv.dataset.name = color.name;
            hexDiv.dataset.hex = color.hex;

            rowDiv.appendChild(hexDiv);
        }
        gameBoard.appendChild(rowDiv);
    }
}

// Initial Call
window.addEventListener('resize', createGrid);
window.addEventListener('load', createGrid);

// Game Logic
let score = 0;
let timeLeft = 60;
let gameInterval;
let spawnInterval;
let isPlaying = false;

const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const popText = document.getElementById('pop-text');

startBtn.addEventListener('click', startGame);

function startGame() {
    if (isPlaying) return;
    isPlaying = true;
    score = 0;
    timeLeft = 60;
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    startBtn.disabled = true;
    startBtn.style.opacity = '0'; // Hide button visually

    // Clear any existing active hexes
    document.querySelectorAll('.hex.active').forEach(h => h.classList.remove('active'));

    gameInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Spawn rate
    spawnInterval = setInterval(lightUpRandomHex, 600);
    lightUpRandomHex();
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    startBtn.disabled = false;
    startBtn.style.opacity = '1';
    startBtn.textContent = "PLAY AGAIN";
    // alert(`Game Over! Score: ${score}`); // Alert is blocking, maybe just show button
    popText.textContent = `Game Over! Score: ${score}`;
    popText.style.color = '#fff';
}

function lightUpRandomHex() {
    if (!isPlaying) return;
    const hexes = document.querySelectorAll('.hex');
    if (hexes.length === 0) return;

    // Try to find a non-active hex, max 10 tries
    let randomHex;
    for(let i=0; i<10; i++) {
        randomHex = hexes[Math.floor(Math.random() * hexes.length)];
        if (!randomHex.classList.contains('active')) break;
    }

    if (randomHex && !randomHex.classList.contains('active')) {
        randomHex.classList.add('active');

        // Auto turn off after some time (1.5s)
        setTimeout(() => {
            if (randomHex.classList.contains('active')) {
                randomHex.classList.remove('active');
            }
        }, 1500);
    }
}

document.getElementById('game-board').addEventListener('click', (e) => {
    // Touch events might fire click too, but we used touch-action: none
    // If using touchstart, we might need to be careful of double firing if we supported both
    // For now click is fine for both mouse and tap

    const hex = e.target.closest('.hex');
    if (!hex || !isPlaying) return;

    if (hex.classList.contains('active')) {
        // Success
        score++;
        scoreElement.textContent = score;
        hex.classList.remove('active');
        showColorPop(hex.dataset.name, hex.dataset.hex);
    }
});

// Add touch support specifically for faster response than click
document.getElementById('game-board').addEventListener('touchstart', (e) => {
    // e.preventDefault(); // Prevent scrolling - handled by touch-action css
    // If we use touchstart, we should prevent click firing or handle logic carefully.
    // Let's rely on click for now as it's simpler and works on mobile.
    // Actually, 'click' has a 300ms delay on some old mobile browsers, but viewport meta tag usually fixes it.
    // "touch-action: manipulation" or "none" removes the delay.
}, {passive: false});


function showColorPop(name, color) {
    popText.textContent = name;
    popText.style.color = color;
    // Reset animation
    popText.classList.remove('pop-anim');
    void popText.offsetWidth; // trigger reflow
    popText.classList.add('pop-anim');
}
