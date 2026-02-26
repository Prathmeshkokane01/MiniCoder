// Tab switching between Register and Login
const registerTab = document.getElementById('register-tab');
const loginTab = document.getElementById('login-tab');
const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

registerTab.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
});

loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
});

// Show/hide parent section on checkbox
const parentCheckbox = document.getElementById('parent-checkbox');
const parentSection = document.getElementById('parent-section');

parentCheckbox.addEventListener('change', () => {
    parentSection.classList.toggle('hidden');
});

// Basic frontend validation (required fields only, with friendly messages)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
        const errorSpan = document.getElementById(input.id + '-error') || document.getElementById('login-error');
        if (!input.value.trim()) {
            const fieldName = input.name.replace('-', ' ').replace('login-', '');
            errorSpan.textContent = `Oops! We need your ${fieldName} to start the adventure!`;
            isValid = false;
        } else {
            errorSpan.textContent = '';
        }
    });

    return isValid;
}
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}


// Prevent form submission if invalid (simulate backend readiness)
document.getElementById('register-form').addEventListener('submit', (e) => {
    if (!validateForm(e.target)) {
        e.preventDefault(); // Stop submission for demo
        alert('Form has errors! Fix them to proceed.'); // Temporary alert for demo; remove when connecting backend
    }
});

document.getElementById('login-form').addEventListener('submit', (e) => {
    if (!validateForm(e.target)) {
        e.preventDefault(); // Stop submission for demo
        alert('Form has errors! Fix them to proceed.'); // Temporary alert for demo; remove when connecting backend
    }
});

console.log('hello')