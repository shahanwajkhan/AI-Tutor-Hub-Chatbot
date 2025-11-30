// Check user authentication state
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    const navLinks = document.querySelector('.nav-links');

    if (isLoggedIn && userName) {
        // Update navigation for logged-in user
        const authButtons = `
            <span class="user-welcome">Welcome, ${userName}</span>
            <button onclick="handleLogout()" class="auth-btn">Logout</button>
        `;
        
        // Replace login/signup buttons with user info
        const loginSignupButtons = navLinks.querySelectorAll('.auth-btn');
        loginSignupButtons.forEach(btn => btn.remove());
        
        // Add welcome message and logout button
        navLinks.insertAdjacentHTML('beforeend', authButtons);
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
}); 