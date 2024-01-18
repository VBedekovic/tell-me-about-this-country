import React from 'react';
import { useEffect, useState } from 'react';
import "../Chat-styles.css"
import "../App.css"

export default function Input({ onSendMessage, inputBox, chatDisabled }) {
  const [text, setText] = useState('');

  function onChange(e) {
    const text = e.target.value;
    setText(text);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText('');
    if (text)
      onSendMessage(text);
  }

  useEffect(() => {
    setText(inputBox)
  }, [inputBox])

  return (
    <div className="input">
      <form onSubmit={e => onSubmit(e)}>
        <input
          onChange={e => onChange(e)}
          value={text}
          id="input-box"
          type='text'
          placeholder='Write a question you would like to ask'
          autoFocus
          disabled={chatDisabled}
        />
        <button>Send</button>
      </form>
    </div>
  );

}