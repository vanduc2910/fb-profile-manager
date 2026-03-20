// Renderer.js

// Function to toggle themes
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
}

// Button handler for toggling theme
document.getElementById('theme-toggle-button').addEventListener('click', toggleTheme);

// UI interactions
function initUI() {
    // Initial setup for the UI.
    const body = document.body;
    body.classList.add('light-theme'); // default theme

    // More UI interactions can be added here.
}

// Initialize UI on script load
initUI();