import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
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
    const [message, setMessage] = React.useState("");
    const [priv, setPriv] = React.useState("");
    const [pub, setPub] = React.useState("");

    let handleSubmit = (e) => {

	e.preventDefault()
	console.log(message)
	setMessage("")
	//writeMessage(message, '1');
    }

    //writeMessage('Hello World', '1');

    return (
	<div className="bg-gray-900 App">
	    <header className="App-header">
		<div
		    onClick = {() => {

		    }}
		>
		    send a message
		</div>
		<form onSubmit={handleSubmit} >
		    <input className="p-3 mt-5 bg-black"
			onChange={(e) => {
			    setMessage(e.target.value)
			}}
			value={message}
		    >
		    </input>

		    <div className="flex flex-row space-x-3">
			<input className="p-3 mt-3 bg-black"
			    onChange={(e) => {
				setPriv(e.target.value)
			    }}
			    value={priv}
			>
			</input>
			<input className="p-3 mt-3 bg-black"
			    onChange={(e) => {
				setPub(e.target.value)
			    }}
			    value={pub}
			>
			</input>
		    </div>


		</form>

		<div className="mt-9"
		    onClick={handleSubmit}
		>
		    send.
		</div>
	    </header>
	</div>
    );
}

export default App;
