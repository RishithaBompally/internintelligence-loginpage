import { auth, db, createUserWithEmailAndPassword, setDoc, doc } from "./firebaseauth.js";

document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  console.log("Email:", email); // Debugging
  console.log("Password:", password); // Debugging

  errorMessage.textContent = ""; // Clear previous errors

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user); // Debugging

      // Save user data to Firestore
      const userData = {
        email: email,
        createdAt: new Date(),
      };

      setDoc(doc(db, "users", user.uid), userData)
        .then(() => {
          console.log("User data saved to Firestore"); // Debugging
          alert("Account Created Successfully!");
          window.location.href = "index.html"; // Redirect to login page
        })
        .catch((error) => {
          console.error("Error writing document:", error);
          errorMessage.textContent = "Error saving user data.";
        });
    })
    .catch((error) => {
      console.error("Error creating user:", error); // Debugging
      if (error.code === "auth/email-already-in-use") {
        errorMessage.textContent = "Email Address Already Exists!";
      } else {
        errorMessage.textContent = "Unable to create user.";
      }
    });
});