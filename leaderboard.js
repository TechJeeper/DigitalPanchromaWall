document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('leaderboard-list');
    const scores = JSON.parse(localStorage.getItem('leaderboard')) || [];

    // Sort descending by score
    scores.sort((a, b) => b.score - a.score);

    if (scores.length === 0) {
        list.innerHTML = '<div class="score-entry">No scores yet!</div>';
        return;
    }

    scores.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'score-entry';

        // Truncate name if too long to prevent layout break
        let displayName = entry.name;
        if (displayName.length > 15) {
            displayName = displayName.substring(0, 15) + '...';
        }

        div.innerHTML = `
            <span class="rank">${index + 1}.</span>
            <span class="name">${escapeHtml(displayName)}</span>
            <span class="score">${entry.score}</span>
        `;
        list.appendChild(div);
    });
});

function escapeHtml(text) {
    if (!text) return text;
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
