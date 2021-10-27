import logo from './logo.svg';
import './App.css';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

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

function writeMessage(msg, msgID) {
  set(ref(db, 'messages/' + msgID), {
    message: msg,
  });
}

function App() {
  writeMessage('Hello World', '1');
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Yoooooo.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
