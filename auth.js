// DOM Elements
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Firebase Configuration
// Replace with your Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase (uncomment when you have your Firebase config)
// firebase.initializeApp(firebaseConfig);

// Form validation
function validateForm() {
    let isValid = true;
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Reset previous error states
    removeErrorStates();

    // Email validation
    if (!email) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
    }

    // Password validation
    if (!password) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    const formGroup = input.parentElement;
    const error = document.createElement('small');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    formGroup.classList.add('error');
}

// Remove error states
function removeErrorStates() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorGroups = document.querySelectorAll('.form-group.error');
    
    errorMessages.forEach(error => error.remove());
    errorGroups.forEach(group => group.classList.remove('error'));
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle form submission
async function handleLogin(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
        // Show loading state
        const submitButton = loginForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';

        // Here you would typically authenticate with your backend
        // For demo purposes, we'll simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Get user name from email (before @ symbol)
        const userName = email.split('@')[0];
        // Capitalize first letter
        const formattedName = userName.charAt(0).toUpperCase() + userName.slice(1);

        // Store login state and user name
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formattedName);
        
        window.location.href = 'index.html';

        // If using Firebase, you would use:
        // await firebase.auth().signInWithEmailAndPassword(email, password);

    } catch (error) {
        // Handle login error
        showError(emailInput, 'Invalid email or password');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
    }
}

// Handle social login
function handleSocialLogin(provider) {
    // Here you would implement social login logic
    // For example, with Firebase:
    // const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    // firebase.auth().signInWithPopup(authProvider);
    
    console.log(`Logging in with ${provider}`);
}

// Event listeners
loginForm.addEventListener('submit', handleLogin);

// Social login buttons
document.querySelector('.social-btn.google').addEventListener('click', () => handleSocialLogin('Google'));
document.querySelector('.social-btn.github').addEventListener('click', () => handleSocialLogin('GitHub')); 