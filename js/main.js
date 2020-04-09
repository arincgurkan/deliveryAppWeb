var firebaseConfig = {
  apiKey: "AIzaSyAFWDNvUKbXJR5fUgMspyQFUHC67aDUSaw",
  authDomain: "delivery-528c3.firebaseapp.com",
  databaseURL: "https://delivery-528c3.firebaseio.com",
  projectId: "delivery-528c3",
  storageBucket: "delivery-528c3.appspot.com",
  messagingSenderId: "399514464364",
  appId: "1:399514464364:web:10c59339d9be2a5d912849",
  measurementId: "G-1594WX62C0",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth.Auth.Persistence.LOCAL;

const txtEmail = document.getElementById("user-email");
const txtPassword = document.getElementById("user-password");
const btnLogin = document.getElementById("btn-login");

btnLogin.addEventListener("click", (e) => {
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  if (email != "" && pass != "") {
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch((e) => {
      console.log(e.message);
      window.alert(e.message);
      window.location.href = "index.html";
    });
    promise.then(() => {
      window.location.href = "home.html";
    });
  } else {
    window.alert("Fill the necessary spaces!");
  }
});
