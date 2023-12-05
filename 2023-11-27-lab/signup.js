const firebaseConfig = {
    apiKey: "AIzaSyBmJnFeo9jI-uW_DLDliEIODILCSoGsSQE",
    authDomain: "iws-lab-2-cffd6.firebaseapp.com",
    projectId: "iws-lab-2-cffd6",
    storageBucket: "iws-lab-2-cffd6.appspot.com",
    messagingSenderId: "900358792418",
    appId: "1:900358792418:web:0717df9031ae586bf2eabb",
    measurementId: "G-3RM5HFGSX0"
  };
  
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const firestore = firebase.firestore();
  
  document.addEventListener('DOMContentLoaded', function () {
      const signupForm = document.getElementById('signupForm');
      signupForm.addEventListener('submit', function (e) {
          e.preventDefault();
          var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
          const signupEmail = document.getElementById('signupEmail').value;
          const signupPassword = document.getElementById('signupPassword').value;
  
          if (!validatePassword(signupPassword)) {
              alert('Password should have at least 8 characters with a mix of upper/lower/digit/symbol.');
              return;
          }
  
          if (!emailRegex.test(signupEmail)) {
              alert('Invalid email address');
              return;
          }
  
          auth.createUserWithEmailAndPassword(signupEmail, signupPassword)
              .then(userCredential => {
                  const user = userCredential.user;
  
                  user.sendEmailVerification()
                      .then(() => {
                          alert('Signup successful. Please check your email for verification.');
                      })
                      .catch(error => {
                          console.error('Error sending verification email:', error);
                      });
  
                  // Create user profile in the database
                  firestore.collection('users').doc(user.uid).set({
                      email: user.email,
                      loginCount: 0,
                  });
              })
              .catch(error => {
                  console.error(error.message);
                  alert(error.message);
              });
      });
  });
  
  function validatePassword(password) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
      return passwordRegex.test(password);
  }