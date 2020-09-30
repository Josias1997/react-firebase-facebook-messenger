import React, {useState, useEffect} from 'react';
import './App.css';
import { FormControl, Input, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import logo from './logo.png';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(prompt("Please enter your username"));
  }, [])

  useEffect(() => {
    // Run once the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})));
    });
  }, [])

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };
  return (
    <div className="App">
      <img src={logo}  alt="Logo" style={{
        width: '100px',
        height: '100px'
      }}/>
      <h1>Messenger Clone</h1>
      <h2>Welcome {username}</h2>

    {/* messages */}
      <FlipMove>
        {
          messages.map(({id, message}) => <Message username={username} message={message} key={id} />)
        }
      </FlipMove>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="Enter your message" value={input} onChange={handleInputChange}  />
          <IconButton className="app__iconButton" disabled={!input} variant="contain" color="primary" type="submit" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
    </div>
  );
}

export default App;
