const colors = [
    { name: "Matte Charcoal Black", hex: "#1C1C1C", type: "matte" },
    { name: "Matte Cotton White", hex: "#E6DDDB", type: "matte" },
    { name: "Matte Army Beige", hex: "#CCA897", type: "matte" },
    { name: "Matte Army Brown", hex: "#724E3D", type: "matte" },
    { name: "Matte Earth Brown", hex: "#623E2A", type: "matte" },
    { name: "Matte Muted White", hex: "#AFA198", type: "matte" },
    { name: "Matte Pastel Peanut", hex: "#C29572", type: "matte" },
    { name: "Matte Wood Brown", hex: "#AD7441", type: "matte" },
    { name: "Matte Pastel Peach", hex: "#F2B67A", type: "matte" },
    { name: "Matte Sunrise Orange", hex: "#F78E0E", type: "matte" },
    { name: "Matte Pastel Banana", hex: "#F5CF6F", type: "matte" },
    { name: "Matte Army Light Green", hex: "#A78403", type: "matte" },
    { name: "Matte Savannah Yellow", hex: "#F0BE02", type: "matte" },
    { name: "Matte Lime Green", hex: "#D0E740", type: "matte" },
    { name: "Matte Army Dark Green", hex: "#515234", type: "matte" },
    { name: "Matte Pastel Mint", hex: "#BEC9A5", type: "matte" },
    { name: "Matte Muted Green", hex: "#656D60", type: "matte" },
    { name: "Matte Forest Green", hex: "#519F61", type: "matte" },
    { name: "Matte Arctic Teal", hex: "#5AABB1", type: "matte" },
    { name: "Matte Pastel Ice", hex: "#95C5D3", type: "matte" },
    { name: "Matte Sapphire Blue", hex: "#005AA2", type: "matte" },
    { name: "Matte Army Blue", hex: "#062B4D", type: "matte" },
    { name: "Matte Muted Blue", hex: "#4E6A84", type: "matte" },
    { name: "Matte Fossil Grey", hex: "#6F727E", type: "matte" },
    { name: "Matte Lavender Purple", hex: "#8A68B5", type: "matte" },
    { name: "Matte Muted Purple", hex: "#7C5577", type: "matte" },
    { name: "Matte Pastel Candy", hex: "#DABCC8", type: "matte" },
    { name: "Matte Sakura Pink", hex: "#E0A8BB", type: "matte" },
    { name: "Matte Pastel Watermelon", hex: "#E93A3F", type: "matte" },
    { name: "Matte Lava Red", hex: "#DE1619", type: "matte" },
    { name: "Matte Army Red", hex: "#AC1A17", type: "matte" },
    { name: "Matte Muted Red", hex: "#DB3E14", type: "matte" },

    // Satin
    { name: "Satin Black", hex: "#151515", type: "satin" },
    { name: "Satin White", hex: "#E6DEDB", type: "satin" },
    { name: "Satin Grey", hex: "#939598", type: "satin" },
    { name: "Satin Orange", hex: "#FF9812", type: "satin" },
    { name: "Satin Yellow", hex: "#F7C603", type: "satin" },
    { name: "Satin Green", hex: "#60AB61", type: "satin" },
    { name: "Satin Teal", hex: "#64C2CA", type: "satin" },
    { name: "Satin Blue", hex: "#0064B9", type: "satin" },
    { name: "Satin Purple", hex: "#8B63C4", type: "satin" },
    { name: "Satin Red", hex: "#DD1116", type: "satin" },

    // Silk
    { name: "Silk Black", hex: "#000203", type: "silk" },
    { name: "Silk Purple", hex: "#150074", type: "silk" },
    { name: "Silk Magenta", hex: "#990050", type: "silk" },
    { name: "Silk Rose", hex: "#C5000A", type: "silk" },
    { name: "Silk Red", hex: "#CB0100", type: "silk" },
    { name: "Silk Rose Gold", hex: "#A56F6B", type: "silk" },
    { name: "Silk Quartz Pink", hex: "#DC857A", type: "silk" },
    { name: "Silk Bronze", hex: "#641501", type: "silk" },
    { name: "Silk Orange", hex: "#F14700", type: "silk" },
    { name: "Silk White", hex: "#DBD1C7", type: "silk" },
    { name: "Silk Gold", hex: "#B56600", type: "silk" },
    { name: "Silk Yellow", hex: "#E9C200", type: "silk" },
    { name: "Silk Lime", hex: "#91C500", type: "silk" },
    { name: "Silk Green", hex: "#008C63", type: "silk" },
    { name: "Silk Teal", hex: "#009FA8", type: "silk" },
    { name: "Silk Light Blue", hex: "#00A0B7", type: "silk" },
    { name: "Silk Blue", hex: "#0151BA", type: "silk" },
    { name: "Silk Chrome", hex: "#384657", type: "silk" },
    { name: "Silk Silver", hex: "#818C9F", type: "silk" },

    // Galaxy
    { name: "Galaxy Black", hex: "#020203", type: "galaxy" },
    { name: "Galaxy Dark Blue", hex: "#090C23", type: "galaxy" },
    { name: "Galaxy Dark Red", hex: "#5E2D22", type: "galaxy" },
    { name: "Galaxy Dark Green", hex: "#1A3300", type: "galaxy" },
    { name: "Galaxy Dark Grey", hex: "#333333", type: "galaxy" },

    // Starlight
    { name: "Starlight Mercury", hex: "#C0C0C0", type: "starlight" },
    { name: "Starlight Jupiter", hex: "#A07050", type: "starlight" },
    { name: "Starlight Neptune", hex: "#4060A0", type: "starlight" },
    { name: "Starlight Comet", hex: "#E0F0FF", type: "starlight" },
    { name: "Starlight Meteor", hex: "#FF6040", type: "starlight" },
    { name: "Starlight Aurora", hex: "#40A060", type: "starlight" },
    { name: "Starlight Nebula", hex: "#8040A0", type: "starlight" },
    { name: "Starlight Twilight", hex: "#203060", type: "starlight" },

    // Metallic
    { name: "Metallic Gold", hex: "#D4AF37", type: "metallic" },
    { name: "Metallic Silver", hex: "#C0C0C0", type: "metallic" },
    { name: "Metallic Bronze", hex: "#CD7F32", type: "metallic" },
    { name: "Metallic Blue", hex: "#4682B4", type: "metallic" },

    // Glow
    { name: "Glow Green", hex: "#90EE90", type: "glow" },
    { name: "Glow Blue", hex: "#ADD8E6", type: "glow" },
    { name: "Glow Orange", hex: "#FFD700", type: "glow" },
    { name: "Glow Pink", hex: "#FFC0CB", type: "glow" },

    // Neon
    { name: "Neon Magenta", hex: "#FF00FF", type: "neon" },
    { name: "Neon Green", hex: "#39FF14", type: "neon" },
    { name: "Neon Yellow", hex: "#FFFF00", type: "neon" },
    { name: "Neon Orange", hex: "#FF4500", type: "neon" },

    // Translucent
    { name: "Translucent Cyan", hex: "#00FFFF", type: "translucent" },
    { name: "Translucent Magenta", hex: "#FF00FF", type: "translucent" },
    { name: "Translucent Yellow", hex: "#FFFF00", type: "translucent" },
    { name: "Translucent Natural", hex: "#F0F0E0", type: "translucent" },

    // Gradients
    { name: "Gradient Rainbow", hex: "#FFFF00", background: "linear-gradient(to right, #ff0000, #ffff00, #00ff00, #0000ff, #800080)", type: "gradient" },
    { name: "Gradient Sunset", hex: "#F78E0E", background: "linear-gradient(to right, #F78E0E, #DE1619)", type: "gradient" },
    { name: "Gradient Ocean", hex: "#005AA2", background: "linear-gradient(to right, #5AABB1, #005AA2)", type: "gradient" },
    { name: "Gradient Forest", hex: "#519F61", background: "linear-gradient(to right, #D0E740, #519F61)", type: "gradient" }
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
            if (color.type) {
                hexWrapper.classList.add(color.type);
            }

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
const gameOverMessage = document.getElementById('game-over-message');

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
    gameOverMessage.style.opacity = '0';

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

    gameOverMessage.innerHTML = `Game Over!<br>Score: ${score}`;
    gameOverMessage.style.opacity = '1';

    // Reset Title
    popText.textContent = "Panchroma";
    popText.classList.add('panchroma-title');
    popText.classList.remove('gradient-pop');
    popText.style.removeProperty('color');
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

function checkResolution() {
    const minArea = 360 * 600;
    const minWidth = 320;
    const minHeight = 320;
    const width = window.innerWidth;
    const height = window.innerHeight;
    const warning = document.getElementById('resolution-warning');

    if ((width * height < minArea) || (width < minWidth) || (height < minHeight)) {
        warning.style.display = 'flex';
        if (isPlaying) {
             endGame();
        }
    } else {
        warning.style.display = 'none';
    }
}

window.addEventListener('resize', checkResolution);
window.addEventListener('load', checkResolution);
