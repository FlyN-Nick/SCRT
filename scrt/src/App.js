import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";
import { Crypt, RSA } from "hybrid-crypto-js";
import { nanoid } from "nanoid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ0MCzup4SKS8PQrvjBnVjMgi9p2EEBVo",
  authDomain: "scrt-54592.firebaseapp.com",
  projectId: "scrt-54592",
  storageBucket: "scrt-54592.appspot.com",
  messagingSenderId: "76850391699",
  appId: "1:76850391699:web:a561eccd666b261c46fb66",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const crypt = new Crypt();
//const rsa = new RSA();
let publicKey = "";
let privateKey = "";
let temparr = ["sfsf", "asfdasdf", "sdfas", "sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas","sfsf", "asfdasdf", "sdfas",]

/*
// Generate RSA key pair, default key size is 4096 bit
rsa.generateKeyPair(function (keyPair) {
  // Callback function receives new key pair as a first argument
  publicKey = keyPair.publicKey;
});
rsa.generateKeyPair(function (keyPair) {
  // Callback function receives new key pair as a first argument
  privateKey = keyPair.privateKey;
});
*/

// https://stackoverflow.com/questions/8207655/get-time-of-specific-timezone
function calcTime() {
  let d = new Date();
  let utc = d.getTime() + d.getTimezoneOffset() * 60000;
  let nd = new Date(utc);
  return nd.toLocaleString();
}

function writeMessage(msg) {
  let encrypted = crypt.encrypt(publicKey, msg);
  set(ref(db, "messages/" + calcTime() + nanoid()), {
    message: encrypted,
  });
}

//const rf = ref(db, "messages/");
//rf.onChange(
//  "value",
//  (snapshot) => {
//    let msgs = [];
//    snapshot.forEach((childSnapshot) => {
//      try {
//        let msg = crypt.decrypt(privateKey, childSnapshot.val()).message;
//        msgs.push(msg);
//      } catch (e) {}
//    });
//    console.log(msgs);
//  },
//  (errorObject) => {
//    console.log("The read failed: " + errorObject.name);
//  }
//);

function App() {
    const [message, setMessage] = React.useState("");
    const [priv, setPriv] = React.useState("");
    const [pub, setPub] = React.useState("");

    const handleSubmit = (e) => {

	e.preventDefault()
	console.log(message)
	setMessage("")
	//setPriv("")
	//setPub("")
	//writeMessage(message, '1');
    }
    const handleFocus = (event) => event.target.select();

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
			onFocus={handleFocus}
			value={message}
		    >
		    </input>
			<p className="mb-3 text-sm font-bold text-gray-100"> message. </p>

		    <div className="flex flex-row space-x-3">
			<div className="flex flex-col">
			    <input className="p-3 mt-3 bg-black"
				//defaultValue={'private'}
				onChange={(e) => {
				    setPriv(e.target.value)
				}}
				onFocus={handleFocus}
				value={priv}
			    >
			    </input>
			    <p className="mb-3 text-sm font-bold text-gray-100"> private key. </p>
			</div>
			<div className="flex flex-col">
			    <input className="p-3 mt-3 bg-black"
				onChange={(e) => {
				    setPub(e.target.value)
				}}
				value={pub}
				onFocus={handleFocus}
			    >
			    </input>
			    <p className="mb-3 text-sm font-bold text-gray-100"> public key. </p>
			</div>
		    </div>


		</form>

		<div className="font-extrabold mt-9"
		    onClick={handleSubmit}
		>
		    send.
		</div>
		    <a
			className="w-full pr-4 mt-8 text-sm text-right border-0 border-red-400"
			target="_blank" href="https://travistidwell.com/jsencrypt/demo/">
		create key pair (use 4906).
		    </a>
	    <div className="w-1/2 overflow-x-hidden overflow-y-scroll bg-black border-0 border-red-500 rounded h-72">
		{temparr.map((item, i)=>{
		    return (
			<div key={i}
			    className="p-2 text-sm text-left"
			>{item}</div>
		    )
		})}
	    </div>
	    </header>
	</div>
    );
}

export default App;
