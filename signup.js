// DOM Elements
const signupForm = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const termsCheckbox = document.querySelector('input[name="terms"]');

// Form validation
function validateForm() {
    let isValid = true;
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Reset previous error states
    removeErrorStates();

    // Name validation
    if (!name) {
        showError(nameInput, 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }

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
    } else if (!isStrongPassword(password)) {
        showError(passwordInput, 'Password must contain letters, numbers, and special characters');
        isValid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
        showError(confirmPasswordInput, 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError(confirmPasswordInput, 'Passwords do not match');
        isValid = false;
    }

    // Terms checkbox validation
    if (!termsCheckbox.checked) {
        showError(termsCheckbox, 'You must agree to the Terms of Service');
        isValid = false;
    }

    return isValid;
}

// Show error message
function showError(input, message) {
    const formGroup = input.closest('.form-group');
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

// Password strength validation
function isStrongPassword(password) {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetter && hasNumber && hasSpecial;
}

// Handle form submission
async function handleSignup(e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    try {
        // Show loading state
        const submitButton = signupForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';

        // Here you would typically send the data to your backend
        // For demo purposes, we'll simulate a delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate successful signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', name);
        window.location.href = 'index.html';

        // If using Firebase, you would use:
        // await firebase.auth().createUserWithEmailAndPassword(email, password);
        // await firebase.auth().currentUser.updateProfile({ displayName: name });

    } catch (error) {
        // Handle signup error
        showError(emailInput, 'This email is already registered');
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Create Account';
    }
}

// Handle social signup
function handleSocialSignup(provider) {
    // Here you would implement social signup logic
    // For example, with Firebase:
    // const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    // firebase.auth().signInWithPopup(authProvider);
    
    console.log(`Signing up with ${provider}`);
}

// Event listeners
signupForm.addEventListener('submit', handleSignup);

// Social signup buttons
document.querySelector('.social-btn.google').addEventListener('click', () => handleSocialSignup('Google'));
document.querySelector('.social-btn.github').addEventListener('click', () => handleSocialSignup('GitHub')); 