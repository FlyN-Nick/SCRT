import "./App.css";
import React, { forceUpdate, useState } from "react";
// we are using Firebase both for hosting and for the database for our messages.
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
} from "firebase/database";
import { Crypt } from "hybrid-crypto-js";

// to be secure, we should've put this in a separate file that was git ignored
const firebaseConfig = {
  apiKey: "AIzaSyDQ0MCzup4SKS8PQrvjBnVjMgi9p2EEBVo",
  authDomain: "scrt-54592.firebaseapp.com",
  projectId: "scrt-54592",
  storageBucket: "scrt-54592.appspot.com",
  messagingSenderId: "76850391699",
  appId: "1:76850391699:web:a561eccd666b261c46fb66",
};

const app = initializeApp(firebaseConfig); // initalize firebase
const db = getDatabase(); // initialize firebase database
const crypt = new Crypt(); // crypto class for encrypting and decrypting
let messagesRef = ref(db, "messages"); // reference in db for all of the messages
let listenerCreated = false; // have we created a listener for messages yet
const welcomeMessage = [
  "Welcome to SCRT!",
  "Generate a key pair,",
  "exchange public keys,",
  "and start chatting!",
];

// allows us to force update the app component 
function useForceUpdate() 
{
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function App() 
{
  const [message, setMessage] = React.useState("");
  const [priv, setPriv] = React.useState("");
  const [pub, setPub] = React.useState("");
  const [msgs, setMsgs] = React.useState(welcomeMessage);
  const forceUpdate = useForceUpdate();

  // handler for when user sends a message.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    writeMessage(message);
    setMessage(""); // clear text field
  };

  const handleFocus = (event) => event.target.select();

  // when user sends a message, encrypt, write to database, and rerender
  function writeMessage(msg) {
    let temp = msgs;
    temp.push(msg);
    setMsgs(temp);
    forceUpdate();
    let encrypted = crypt.encrypt(pub, msg); // ! most important step, encrypt the message, so that only the intended receiver can decrypt it
    let messageRef = push(messagesRef);
    set(messageRef, { message: encrypted });
  }

  // listens for new messages
  function createListener(privatee) // two e's because private is a key word
  {
    // we do not want multiple listeners
    if (listenerCreated) return;
    listenerCreated = true;
    // whenever someone creates a message in the db
    onChildAdded(messagesRef, (messageSnapshot) => {
      console.log("Message added:");
      console.log(messageSnapshot.val());
      // try catch will fail when you do not have the proper private key (you were not the intended receiver)
      try {
        // decrypt the message, add it to the message array, and rerender 
        let decrypted = crypt.decrypt(privatee, messageSnapshot.val().message);
        console.log("decrypted!");
        let msg = decrypted.message;
        let temp = msgs;
        temp.push(msg);
        setMsgs(temp);
        forceUpdate();
        console.log(msg);
      } catch (e) {
        console.log("Cannot decrypt?");
      }
    });
  }

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
                onChange={(e) => {
                  setMsgs([]);
                  setPriv(e.target.value);
                  createListener(e.target.value);
                  if (e.target.value == "") setMsgs(welcomeMessage);
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

        <div
          className="font-extrabold mt-9 hover:text-gray-400 transition-all"
          onClick={handleSubmit}
        >
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
