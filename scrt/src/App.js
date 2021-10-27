import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
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
    const [message, setMessage] = React.useState("");

    //writeMessage('Hello World', '1');
    //
    return (
	<div className="App">
	    <header className="App-header">
		<div
		    onClick = {() => {
			console.log(message)
			writeMessage(message, '1');

		    }}
		>
		    send a message
		</div>
		<form>
		<input className="p-3 mt-3"
		    onChange={(e) => {
			setMessage(e.target.value)
		    }}
		    value={message}
		>
		</input>
		</form>
	    </header>
	</div>
    );
}

export default App;
