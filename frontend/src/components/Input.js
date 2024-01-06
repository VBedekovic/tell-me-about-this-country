import React from 'react';
import { useEffect, useState } from 'react';
import "../Chat-styles.css"

export default function Input({ onSendMessage }) {
  const [text, setText] = useState('');

  function onChange(e) {
    const text = e.target.value;
    setText(text);
  }

  function onSubmit(e) {
    e.preventDefault();
    setText('');
    onSendMessage(text);
  }

  return (
    <div className="input">
      <form onSubmit={e => onSubmit(e)}>
        <input
          onChange={e => onChange(e)}
          value={text}
          type='text'
          placeholder='Enter your message and press ENTER'
          autoFocus
        />
        <button>Send</button>
      </form>
    </div>
  );

}