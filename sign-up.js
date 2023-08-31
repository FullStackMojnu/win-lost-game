document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const signupLink = document.getElementById("signup-link");
    const loginLink = document.getElementById("login-link");
    const signupButton = document.getElementById("signup-button");
    const loginButton = document.getElementById("login-button");

    signupLink.addEventListener("click", function (e) {
        e.preventDefault();
        signupForm.style.display = "block";
        loginForm.style.display = "none";
    });

    loginLink.addEventListener("click", function (e) {
        e.preventDefault();
        loginForm.style.display = "block";
        signupForm.style.display = "none";
    });
    // Frontend JavaScript
    signupButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const name = signupForm.querySelector("input[name='username']").value;
        const email = signupForm.querySelector("input[name='email']").value;
        const password = signupForm.querySelector("input[name='password']").value;

        // Handle sign-up logic here (e.g., send data to server)
        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                loginForm.style.display = "block";
                signupForm.style.display = "none";
                console.log(data, 'User registered successfully');

            } else {
                const data = await response.json();
                console.log(data.errors); // Handle validation errors
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("input[name='login-email']").value;
        const password = loginForm.querySelector("input[name='login-password']").value;

        // Handle login logic here (e.g., verify credentials on the server)
        console.log("Login:", email, password);

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                console.log(token)
                // Store the token in localStorage or a secure cookie
                localStorage.setItem('token', token);
                console.log('Logged in successfully');
                window.location.href = './index.html';
            } else {
                const data = await response.json();
                console.log(data.message); // Handle login error
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
