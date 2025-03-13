import { auth, sendPasswordResetEmail } from "./firebaseauth.js";

document.getElementById("forgot-password-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const errorMessage = document.getElementById("error-message");

    errorMessage.textContent = ""; // Clear previous errors
    errorMessage.style.display = "none"; // Hide error message initially

    // Validate email format
    if (!validateEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.style.display = "block";
        return; // Stop further execution
    }

    // Send password reset email
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Password reset email sent. Please check your inbox.");
            window.location.href = "index.html"; // Redirect to login page
        })
        .catch((error) => {
            console.error("Error sending password reset email:", error);
            let errorMessageText = "An error occurred. Please try again.";

            switch (error.code) {
                case "auth/invalid-email":
                    errorMessageText = "Invalid email address.";
                    break;
                case "auth/user-not-found":
                    errorMessageText = "User not found. Please sign up.";
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