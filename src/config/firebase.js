const firebaseConfig = {
  apiKey: "Z",
  authDomain: "a",
  projectId: "cx",
  storageBucket: "d",
  messagingSenderId: "1054661173327",
  appId: "1:1054661173327:web:86fc03515889c856610a3a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); 