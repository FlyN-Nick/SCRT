import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  get,
  onChildAdded,
} from "firebase/database";
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
let messagesRef = ref(db, "messages");
let msgs = ["messages."];
//let messagesGotten = false;
let listenerCreated = false;
let temparr = [
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
  "sfsf",
  "asfdasdf",
  "sdfas",
];

function App() {
  const [message, setMessage] = React.useState("");
  const [priv, setPriv] = React.useState("");
  const [pub, setPub] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    writeMessage(message);
    setMessage("");
    //setPriv("")
    //setPub("")
    //writeMessage(message, '1');
  };
  const handleFocus = (event) => event.target.select();

  function writeMessage(msg) {
    let encrypted = crypt.encrypt(pub, msg);
    let messageRef = push(messagesRef); // create a new message
    set(messageRef, { message: encrypted });
  }

  function createListener() {
    if (listenerCreated) return;
    listenerCreated = true;
    onChildAdded(messagesRef, (messageSnapshot) => {
      console.log('Message added:');
      console.log(messageSnapshot.val());
      try {
        let msg = crypt.decrypt(priv, messageSnapshot.val()).message;
        msgs.push(msg);
        console.log(msg);
      } catch (e) { console.log("Cannot decrypt?"); }
    });
  }

  createListener();

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
            onFocus={handleFocus}
            value={message}
          ></input>
          <p className="mb-3 text-sm font-bold text-gray-100"> message. </p>

          <div className="flex flex-row space-x-3">
            <div className="flex flex-col">
              <input
                className="p-3 mt-3 bg-black"
                //defaultValue={'private'}
                onChange={(e) => {
                  setPriv(e.target.value);
                }}
                onFocus={handleFocus}
                value={priv}
              ></input>
              <p className="mb-3 text-sm font-bold text-gray-100">
                {" "}
                your private key.{" "}
              </p>
            </div>
            <div className="flex flex-col">
              <input
                className="p-3 mt-3 bg-black"
                onChange={(e) => {
                  setPub(e.target.value);
                }}
                value={pub}
                onFocus={handleFocus}
              ></input>
              <p className="mb-3 text-sm font-bold text-gray-100">
                {" "}
                their public key.{" "}
              </p>
            </div>
          </div>
        </form>

	<div className="font-extrabold mt-9 hover:text-gray-400 transition-all"
	    onClick={handleSubmit}>
          send.
        </div>
        <a
          className="w-full pr-4 mt-8 text-sm text-right border-0 border-red-400"
          target="_blank"
          href="https://travistidwell.com/jsencrypt/demo/"
        >
          create key pair.
        </a>
        <div className="w-1/2 overflow-x-hidden overflow-y-scroll bg-black border-0 border-red-500 rounded h-72">
          {msgs.map((item, i) => {
            return (
              <div key={i} className="p-2 text-sm text-left">
                {item}
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
