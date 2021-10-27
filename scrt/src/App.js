import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, get, onChildAdded } from "firebase/database";
import { Crypt } from "hybrid-crypto-js";

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
let messagesRef = ref(db, 'messages');
let msgs = [];
let publicKey = "";
let privateKey = "";
//let messagesGotten = false;
let listenerCreated = false;

function writeMessage(msg) 
{
  let encrypted = crypt.encrypt(publicKey, msg);
  let messageRef = push(messagesRef); // create a new message
  set(messageRef, { message: encrypted, });
}

// function getMessages()
// {
//   if (messagesGotten) return;
//   messagesGotten = true;
//   console.log("hello 1")
//   get(messagesRef, messagesSnapshot => {
//     console.log("hello")
//     console.log(messagesSnapshot.val());
//     messagesSnapshot.val().forEach(message => {
//       console.log(message);
//     });
//   });
// }

function createListener() 
{
  if (listenerCreated) return;
  listenerCreated = true;
  onChildAdded(messagesRef, (messageSnapshot) => {
    console.log(`Message added: ${messageSnapshot.val()}`);
    try {
      let msg = crypt.decrypt(privateKey, messageSnapshot.val()).message;
      msgs.push(msg);
      console.log(msg);
    } catch (e) {}
  });
}

function App() {
  const [message, setMessage] = React.useState("");
  const [priv, setPriv] = React.useState("");
  const [pub, setPub] = React.useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    writeMessage(message);
    setMessage("");
  };

  //createListener();

  //writeMessage('Hello World', '1');

  return (
    <div className="bg-gray-900 App">
      <header className="App-header">
        <div onClick={() => {}}>send a message</div>
        <form onSubmit={handleSubmit}>
          <input
            className="p-3 mt-5 bg-black"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            value={message}
          ></input>

          <div className="flex flex-row space-x-3">
            <input
              className="p-3 mt-3 bg-black"
              onChange={(e) => {
                setPriv(e.target.value);
              }}
              value={priv}
            ></input>
            <input
              className="p-3 mt-3 bg-black"
              onChange={(e) => {
                setPub(e.target.value);
              }}
              value={pub}
            ></input>
          </div>
        </form>

        <div className="mt-9" onClick={handleSubmit}>
          send.
        </div>
      </header>
    </div>
  );
}

export default App;
