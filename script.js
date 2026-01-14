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

    const gridContainer = document.createElement('div');
    gridContainer.id = 'grid-container';

    for (let r = 0; r < rows; r++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'hex-row';

        for (let c = 0; c < hexesPerRow; c++) {
            // Create wrapper
            const hexWrapper = document.createElement('div');
            hexWrapper.className = 'hex';

            // Create inner visual element
            const hexInner = document.createElement('div');
            hexInner.className = 'hex-inner';

            // Append inner to wrapper
            hexWrapper.appendChild(hexInner);

            const color = fillColors[colorIndex % fillColors.length];
            colorIndex++;

            // Set properties on wrapper
            hexWrapper.style.setProperty('--hex-color', color.hex);
            hexWrapper.dataset.name = color.name;
            hexWrapper.dataset.hex = color.hex;

            rowDiv.appendChild(hexWrapper);
        }
        gridContainer.appendChild(rowDiv);
    }
    gameBoard.appendChild(gridContainer);
}

// Initial Call
window.addEventListener('resize', createGrid);
window.addEventListener('load', () => {
    createGrid();
    document.getElementById('pop-text').classList.add('panchroma-title');
});

// Game Logic
let score = 0;
let timeLeft = 60;
let gameInterval;
let activeHexTimeout;
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

    spawnHex();
}

function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearTimeout(activeHexTimeout);

    // Clear any active hex
    document.querySelectorAll('.hex.active').forEach(h => h.classList.remove('active'));

    startBtn.disabled = false;
    startBtn.style.opacity = '1';
    startBtn.textContent = "PLAY AGAIN";
    popText.textContent = `Game Over! Score: ${score}`;

    // Reset to white or keep fun?
    popText.classList.remove('panchroma-title');
    popText.style.removeProperty('color'); // Remove inline color if any
    popText.style.setProperty('--pop-color', '#ffffff');
}

function spawnHex() {
    if (!isPlaying) return;
    const hexes = document.querySelectorAll('.hex');
    if (hexes.length === 0) return;

    // Pick a random hex
    // Since only 1 is active and we clear it before spawn or on click, we can just pick any.
    // However, if we want to avoid picking the same one twice in a row, we could, but random is fine.

    const randomHex = hexes[Math.floor(Math.random() * hexes.length)];
    randomHex.classList.add('active');

    // Calculate duration: 5000ms at 60s -> 1000ms at 0s
    // Formula: 1000 + (timeLeft / 60) * 4000
    let duration = 1000 + (timeLeft / 60) * 4000;

    activeHexTimeout = setTimeout(() => {
        if (!isPlaying) return;
        randomHex.classList.remove('active');
        // Spawn next immediately
        spawnHex();
    }, duration);
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

        // Clear timeout and spawn next immediately
        clearTimeout(activeHexTimeout);
        spawnHex();
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

    popText.classList.remove('panchroma-title');

    // Use CSS variable instead of inline color style
    popText.style.removeProperty('color');
    popText.style.setProperty('--pop-color', color);

    // Reset animation
    popText.classList.remove('pop-anim');
    void popText.offsetWidth; // trigger reflow
    popText.classList.add('pop-anim');
}
