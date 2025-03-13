import { auth, signInWithEmailAndPassword } from "./firebaseauth.js";

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous errors
    errorMessage.style.display = "none"; // Hide error message initially

    // Validate email format
    if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    // Validate password length
    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    // Firebase Login
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            alert("Login Successful!");
        })
        .catch((error) => {
            console.error("Error logging in:", error);
            let errorMessageText = "An error occurred. Please try again.";

            switch (error.code) {
                case "auth/invalid-email":
                    errorMessageText = "Invalid email address.";
                    break;
                case "auth/user-not-found":
                    errorMessageText = "User not found. Please sign up.";
                    break;
                case "auth/wrong-password":
                    errorMessageText = "Incorrect password.";
                    break;
                case "auth/too-many-requests":
                    errorMessageText = "Too many attempts. Please try again later.";
                    break;
                default:
                    errorMessageText = "An error occurred. Please try again.";
            }

            errorMessage.textContent = errorMessageText;
            errorMessage.style.display = "block"; // Show error message
        });
});

// Function to validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}