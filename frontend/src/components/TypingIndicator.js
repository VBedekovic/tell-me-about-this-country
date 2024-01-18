import React from 'react';
import '../Chat-styles.css'

export default function TypingIndicator({ members }) {
  // 1
  const names = members.map(m => m.name);
  if (names.length === 0) {
    return <div className="typing-indicator"></div>;
  }
  // 2
  if (names.length === 1) {
    return <div className="typing-indicator">{names[0]} is typing</div>;
  }
  // 3
  const string = names.slice(0, -1).join(', ') + ' and ' + names.slice(-1);
  return <div className="typing-indicator">{string} are typing</div>;
}