import React, { Fragment, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import '../Chat-styles.css';
import { countries } from "country-list-json";


function randomName() {
  const adjectives = [
    'autumn', 'hidden', 'bitter', 'misty', 'silent', 'empty', 'dry', 'dark',
    'summer', 'icy', 'delicate', 'quiet', 'white', 'cool', 'spring', 'winter',
    'patient', 'twilight', 'dawn', 'crimson', 'wispy', 'weathered', 'blue',
    'billowing', 'broken', 'cold', 'damp', 'falling', 'frosty', 'green', 'long',
    'late', 'lingering', 'bold', 'little', 'morning', 'muddy', 'old', 'red',
    'rough', 'still', 'small', 'sparkling', 'shy', 'wandering',
    'withered', 'wild', 'black', 'young', 'holy', 'solitary', 'fragrant',
    'aged', 'snowy', 'proud', 'floral', 'restless', 'divine', 'polished',
    'ancient', 'purple', 'lively', 'nameless'
  ];
  const nouns = [
    'waterfall', 'river', 'breeze', 'moon', 'rain', 'wind', 'sea', 'morning',
    'snow', 'lake', 'sunset', 'pine', 'shadow', 'leaf', 'dawn', 'glitter',
    'forest', 'hill', 'cloud', 'meadow', 'sun', 'glade', 'bird', 'brook',
    'butterfly', 'bush', 'dew', 'dust', 'field', 'fire', 'flower', 'firefly',
    'feather', 'grass', 'haze', 'mountain', 'night', 'pond', 'darkness',
    'snowflake', 'silence', 'sound', 'sky', 'shape', 'surf', 'thunder',
    'violet', 'water', 'wildflower', 'wave', 'water', 'resonance', 'sun',
    'wood', 'dream', 'cherry', 'tree', 'fog', 'frost', 'voice', 'paper', 'frog',
    'smoke', 'star'
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return adjective + noun;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
}

let myColor = randomColor()
let myName = randomName()

let serverColor = randomColor()
let serverName = randomName()

function Chat() {
  const [messages, setMessages] = useState([{
    id: '1',
    data: 'This is a test message!',
    member: {
      id: '1',
      clientData: {
        color: serverColor,
        username: serverName,
      },
    },
  }]);
  const [me, setMe] = useState({
    id: '2',
    username: myName,
    color: myColor,
  });

  const onSendMessage = async (message) => {
    setMessages(previousMessages => ([...previousMessages, {
      id: Math.random(),
      data: message,
      member: {
        id: me.id,
        clientData: {
          color: me.color,
          username: me.username,
        },
      },
    }]))
    try {
      // add real app link from env
      const response = await fetch(`http://localhost:5000/api/ask-aquestion`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            question: message,
            country: "Croatia"
          })
        }).catch(err => { })
      //dodati kak vec ide ovaj jsonData objekt
      //const jsonData = await response.json();
      //console.log(jsonData)
      setMessages(previousMessages => ([...previousMessages, {
        id: Math.random(),
        data: 'Test response',
        member: {
          id: '1',
          clientData: {
            color: serverColor,
            username: serverName,
          },
        },
      }]))
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <head>
        <title>Scaledrone Chat App</title>
        <meta name='description' content='Your brand-new chat app!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script type='text/javascript' src='https://cdn.scaledrone.com/scaledrone.min.js' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <main className="app">
        <div className="appContent">
          <Messages messages={messages} me={me} />
          <Input
            onSendMessage={onSendMessage}
          />
        </div>
      </main>
    </>
  )

}

export default Chat