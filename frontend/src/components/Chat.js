import React, { Fragment, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import '../Chat-styles.css';
import "../App.css"
import { countries } from "country-list-json";
import { Box, Card, Typography, Popover } from "@mui/material";


const apiLink = process.env.APILINK || "http://localhost:8080"

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

function Chat({ trainingMode, chatDisabled, selectedCountry, setGameOverInfo = null, setQuestionsInfo, regionOrContinent }) {
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
    username: "Player",
    color: myColor,
  });
  const [questions, setQuestions] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null);
  const [inputBox, setInputBox] = useState("")
  const [travelerData, setTravelerData] = useState(null)
  const [trainingSelectedCountry, setTrainingSelectedCountry] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSendMessage = async (message) => {
    setInputBox("")
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
    if (trainingMode) {
      try {
        // add real app link from env
        const response = await fetch(`${apiLink}/tour-guide-v1/ask-question`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              question: message,
              country: trainingSelectedCountry
            })
          })
        //dodati kak vec ide ovaj jsonData objekt
        const jsonData = await response.json();
        console.log(jsonData)
        setMessages(previousMessages => ([...previousMessages, {
          id: Math.random(),
          data: jsonData.answer,
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

    } else {
      try {
        // add real app link from env
        const response = await fetch(`${apiLink}/traveler-v1/ask-question`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              question: message
            })
          })
        //dodati kak vec ide ovaj jsonData objekt
        const jsonData = await response.json();
        console.log(jsonData)
        setMessages(previousMessages => ([...previousMessages, {
          id: Math.random(),
          data: jsonData.answer,
          member: {
            id: '1',
            clientData: {
              color: serverColor,
              username: travelerData.name ? travelerData.name : serverName,
            },
          },
        }]))
        setQuestionsInfo(jsonData.category_chances_dict)
        if (jsonData.flags.includes("correct_guess")) {
          setGameOverInfo({ ...jsonData, status: "winner", color: "green" })
        }
        if (jsonData.guess_chances_count === 0 && jsonData.flags.includes("wrong_guess")) {
          setGameOverInfo({ ...jsonData, status: "loser", color: "red" })
        }

        /*let gameOverFlag = true
        if (gameOverFlag) {
          setGameOverInfo({
            category_chances_dict: {
              "history": 2,
              "geography": 0,
              "economics": 3,
              "media&sports": 2,
              "statistics": 3
            }, gameOver: true
          })
        }*/
      } catch (err) {
        console.log(err)
      }
    }
  }


  const fetchQuestionIdeas = async (event) => {
    try {
      setAnchorEl(event.currentTarget);
      const response = await fetch(`${apiLink}/tour-guide-v1/n-random-questions/3`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          }
        })
      const jsonData = await response.json();
      console.log(jsonData)
      setQuestions(jsonData.questionsArray)

    } catch (err) {
      console.log(err)
    }
  }

  const initTraveler = async () => {
    try {
      const response = await fetch(`${apiLink}/traveler-v1/init-traveler`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            regionOrContinent: regionOrContinent
          })
        })

      const jsonData = await response.json();
      if (jsonData) {
        const response2 = await fetch(`${apiLink}/traveler-v1/current-traveler-category-chances`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            }
          })
        const jsonData = await response2.json();
        console.log(jsonData)
        setQuestionsInfo(jsonData)
      }
      setTravelerData(jsonData)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChooseMessage = (event) => {
    console.log(event.target.innerHTML)
    setAnchorEl(null)
    setInputBox(event.target.innerHTML)
  }

  useEffect(() => {
    console.log(chatDisabled)
  }, [chatDisabled])

  // init traveler if game mode
  useEffect(() => {
    if (!trainingMode && regionOrContinent) initTraveler()
  }, [regionOrContinent])

  useEffect(() => {
    setTrainingSelectedCountry(selectedCountry)
  }, [selectedCountry])

  return (
    <>
      <head>
        <title>Scaledrone Chat App</title>
        <meta name='description' content='Your brand-new chat app!' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <script type='text/javascript' src='https://cdn.scaledrone.com/scaledrone.min.js' />
        <link rel='icon' href='/favicon.ico' />
      </head>
      <Card className="app" sx={{ margin: "0px" }}>
        {trainingMode && !chatDisabled ? <Box sx={{ minHeight: "5%", minWidth: "95%", padding: "5px" }}>
          <Card onClick={fetchQuestionIdeas} sx={{ height: "90%", width: "100%", display: "flex", flexDirection: "column", cursor: "pointer" }}>
            <Typography variant="h6" color="text.secondary" sx={{ margin: "auto", fontFamily: "var(--primary-font)" }}>QUESTION IDEAS</Typography>
          </Card>
        </Box> : <></>}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
          }}
          style={{ width: "100%", margin: "auto", padding: "5px" }}
        >
          {Object.values(questions).map(question => {
            return (<Typography onClick={handleChooseMessage} sx={{ p: 2, width: "100%", cursor: "pointer", transition: "background-color 0.5s", ":hover": { backgroundColor: "rgba(99,99,191,.07)" }, fontFamily: "var(--primary-font)" }}>{question}</Typography>
            )
          })}
        </Popover>

        <div className="appContent" >
          <Messages messages={messages} me={me} />
          <Input
            chatDisabled={chatDisabled}
            onSendMessage={onSendMessage}
            inputBox={inputBox}
          />
        </div>
      </Card>
    </>
  )

}

export default Chat