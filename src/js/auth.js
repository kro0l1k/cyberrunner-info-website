document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    auth.onAuthStateChanged(user => {
        if (user) {
            window.location.href = 'community.html';
        }
    });

    // Handle Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = e.target['login-email'].value;
            const password = e.target['login-password'].value;

            try {
                await auth.signInWithEmailAndPassword(email, password);
                window.location.href = 'community.html';
            } catch (error) {
                const loginError = document.getElementById('login-error');
                loginError.textContent = getErrorMessage(error.code);
                loginError.classList.remove('hidden');
            }
        });

        // Forgot password
        document.getElementById('forgot-password')?.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const loginError = document.getElementById('login-error');
            
            if (!email) {
                loginError.textContent = 'Please enter your email address';
                loginError.classList.remove('hidden');
                return;
            }

            try {
                await auth.sendPasswordResetEmail(email);
                loginError.textContent = 'Password reset email sent. Please check your inbox.';
                loginError.classList.remove('hidden');
                loginError.style.color = 'var(--secondary)';
            } catch (error) {
                loginError.textContent = getErrorMessage(error.code);
                loginError.classList.remove('hidden');
            }
        });
    }

    // Handle Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const password = e.target.password.value;
            const signupError = document.getElementById('signup-error');

            if (!isPasswordValid(password)) {
                signupError.textContent = 'Password must be at least 8 characters long and contain both letters and numbers';
                signupError.classList.remove('hidden');
                return;
            }

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(
                    e.target.email.value,
                    password
                );

                const avatar = generatePixelAvatar(userCredential.user.uid);
                
                await db.collection('users').doc(userCredential.user.uid).set({
                    name: e.target.name.value,
                    email: e.target.email.value,
                    organization: e.target.organization.value,
                    engineeringExp: parseInt(e.target['engineering-exp'].value) || 0,
                    codingExp: parseInt(e.target['coding-exp'].value) || 0,
                    avatar: avatar,
                    createdAt: new Date(),
                    newsletter: true
                });

                window.location.href = 'community.html';
            } catch (error) {
                signupError.textContent = getErrorMessage(error.code);
                signupError.classList.remove('hidden');
            }
        });
    }

    // Helper functions
    function isPasswordValid(password) {
        return password.length >= 8 && 
               /[A-Za-z]/.test(password) && 
               /[0-9]/.test(password);
    }

    function getErrorMessage(errorCode) {
        switch (errorCode) {
            case 'auth/wrong-password':
                return 'Incorrect password. Please try again.';
            case 'auth/user-not-found':
                return 'No account found with this email. Would you like to sign up?';
            case 'auth/email-already-in-use':
                return 'An account already exists with this email. Please log in.';
            case 'auth/invalid-email':
                return 'Please enter a valid email address.';
            case 'auth/weak-password':
                return 'Password is too weak. It must be at least 8 characters long.';
            default:
                return 'An error occurred. Please try again.';
        }
    }

    function generatePixelAvatar(userId) {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d');
        
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (Math.random() > 0.5) {
                    ctx.fillStyle = `hsl(${Math.random() * 360}, 70%, 50%)`;
                    ctx.fillRect(i, j, 1, 1);
                }
            }
        }
        
        return canvas.toDataURL();
    }
});
  