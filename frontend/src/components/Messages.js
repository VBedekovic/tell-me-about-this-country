import { useEffect, useRef } from 'react';
import React from 'react';
import '../Chat-styles.css'

export default function Messages({ messages, me }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  });
  return (
    <ul className="messagesList">
      {messages.map(m => Message(m, me))}
      <div ref={bottomRef}></div>
    </ul>
  );
}

function Message({ member, data, id }, me) {
  // 1
  const { username, color } = member.clientData;
  // 2
  const messageFromMe = member.id === me.id;
  const className = messageFromMe ?
    `messagesMessage currentMember` : "messagesMessage"
  // 3
  return (
    <li key={id} className={className}>
      <span
        className="avatar"
        style={{ backgroundColor: color }}
      />
      <div className="messageContent">
        <div className="username">
          {username}
        </div>
        <div className="text">{data}</div>
      </div>
    </li>
  );
}