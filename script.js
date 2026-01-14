const colors = [
    { name: "Matte Charcoal Black", hex: "#1C1C1C" },
    { name: "Matte Cotton White", hex: "#E6DDDB" },
    { name: "Matte Army Beige", hex: "#CCA897" },
    { name: "Matte Army Brown", hex: "#724E3D" },
    { name: "Matte Earth Brown", hex: "#623E2A" },
    { name: "Matte Muted White", hex: "#AFA198" },
    { name: "Matte Pastel Peanut", hex: "#C29572" },
    { name: "Matte Wood Brown", hex: "#AD7441" },
    { name: "Matte Pastel Peach", hex: "#F2B67A" },
    { name: "Matte Sunrise Orange", hex: "#F78E0E" },
    { name: "Matte Pastel Banana", hex: "#F5CF6F" },
    { name: "Matte Army Light Green", hex: "#A78403" },
    { name: "Matte Savannah Yellow", hex: "#F0BE02" },
    { name: "Matte Lime Green", hex: "#D0E740" },
    { name: "Matte Army Dark Green", hex: "#515234" },
    { name: "Matte Pastel Mint", hex: "#BEC9A5" },
    { name: "Matte Muted Green", hex: "#656D60" },
    { name: "Matte Forest Green", hex: "#519F61" },
    { name: "Matte Arctic Teal", hex: "#5AABB1" },
    { name: "Matte Pastel Ice", hex: "#95C5D3" },
    { name: "Matte Sapphire Blue", hex: "#005AA2" },
    { name: "Matte Army Blue", hex: "#062B4D" },
    { name: "Matte Muted Blue", hex: "#4E6A84" },
    { name: "Matte Fossil Grey", hex: "#6F727E" },
    { name: "Matte Lavender Purple", hex: "#8A68B5" },
    { name: "Matte Muted Purple", hex: "#7C5577" },
    { name: "Matte Pastel Candy", hex: "#DABCC8" },
    { name: "Matte Sakura Pink", hex: "#E0A8BB" },
    { name: "Matte Pastel Watermelon", hex: "#E93A3F" },
    { name: "Matte Lava Red", hex: "#DE1619" },
    { name: "Matte Army Red", hex: "#AC1A17" },
    { name: "Matte Muted Red", hex: "#DB3E14" },

    // Gradients
    { name: "Gradient Rainbow", hex: "#FFFF00", background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #0000ff, #800080)" },
    { name: "Gradient Sunset", hex: "#F78E0E", background: "linear-gradient(to right, #F78E0E, #DE1619)" },
    { name: "Gradient Ocean", hex: "#005AA2", background: "linear-gradient(to right, #5AABB1, #005AA2)" },
    { name: "Gradient Forest", hex: "#519F61", background: "linear-gradient(to right, #D0E740, #519F61)" }
];

const gameBoard = document.getElementById('game-board');

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playClickSound() {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(150, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
}

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
            if (color.background) {
                hexWrapper.style.setProperty('--hex-bg', color.background);
                hexWrapper.dataset.background = color.background;
            } else {
                hexWrapper.style.setProperty('--hex-bg', color.hex);
            }
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

    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

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
    popText.innerHTML = `Game Over!<br>Score: ${score}`;

    // Reset to white or keep fun?
    popText.classList.remove('panchroma-title');
    popText.classList.remove('gradient-pop');
    popText.style.removeProperty('color'); // Remove inline color if any
    popText.style.setProperty('--pop-color', '#ffffff');
}

function spawnHex() {
    if (!isPlaying) return;

    // Pick a random hex
    const hexes = Array.from(document.querySelectorAll('.hex'));
    if (hexes.length === 0) return;

    // Filter hexes to find only those fully visible within the gameBoard
    const boardRect = gameBoard.getBoundingClientRect();
    const visibleHexes = hexes.filter(h => {
        const rect = h.getBoundingClientRect();
        return (
            rect.top >= boardRect.top &&
            rect.bottom <= boardRect.bottom &&
            rect.left >= boardRect.left &&
            rect.right <= boardRect.right
        );
    });

    // Fallback to all hexes if somehow none are visible (e.g. extremely small screen)
    const candidates = visibleHexes.length > 0 ? visibleHexes : hexes;

    const randomHex = candidates[Math.floor(Math.random() * candidates.length)];
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

    playClickSound();

    if (hex.classList.contains('active')) {
        // Success
        score++;
        scoreElement.textContent = score;
        hex.classList.remove('active');
        showColorPop(hex.dataset.name, hex.dataset.hex, hex.dataset.background);

        // Clear timeout and spawn next immediately
        clearTimeout(activeHexTimeout);
        spawnHex();
    } else {
        // Incorrect click
        score--;
        scoreElement.textContent = score;
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


function showColorPop(name, color, background) {
    popText.textContent = name;

    popText.classList.remove('panchroma-title');
    popText.classList.remove('gradient-pop');

    // Use CSS variable instead of inline color style
    popText.style.removeProperty('color');

    if (background && background.includes('gradient')) {
         popText.style.setProperty('--pop-bg', background);
         popText.style.setProperty('--pop-color', color); // Fallback/shadow
         popText.classList.add('gradient-pop');
    } else {
         popText.style.setProperty('--pop-color', color);
    }

    // Reset animation
    popText.classList.remove('pop-anim');
    void popText.offsetWidth; // trigger reflow
    popText.classList.add('pop-anim');
}
