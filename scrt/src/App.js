import logo from './logo.svg';
import './App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { Crypt, RSA } from 'hybrid-crypto-js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ0MCzup4SKS8PQrvjBnVjMgi9p2EEBVo",
  authDomain: "scrt-54592.firebaseapp.com",
  projectId: "scrt-54592",
  storageBucket: "scrt-54592.appspot.com",
  messagingSenderId: "76850391699",
  appId: "1:76850391699:web:a561eccd666b261c46fb66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const crypt = new Crypt();
const rsa = new RSA();
let publicKey = "";
let privateKey = "";

// Generate RSA key pair, default key size is 4096 bit
rsa.generateKeyPair(function(keyPair) {
    // Callback function receives new key pair as a first argument
    publicKey = keyPair.publicKey;
});
rsa.generateKeyPair(function(keyPair) {
  // Callback function receives new key pair as a first argument
  privateKey = keyPair.privateKey;
});


function writeMessage(msg, msgID) {
  //console.log(publicKey);
  //console.log(privateKey);
  let encrypted = crypt.encrypt(publicKey, msg);
  set(ref(db, 'messages/' + msgID), {
    message: encrypted,
  });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
	  <div onClick = {() => {
	      writeMessage("HEYA ENCRYPTED", 314)
	      console.log("messaging")
	  }}
	  > send a message</div>
      </header>
    </div>
  );
}

export default App;
