import React from 'react';
import robotIcon from '../assets/Robotic-icon.jpeg';

export default function MyBotAvatar(props) {
  return (
    <img
      src={robotIcon}
      alt="Bot Avatar"
      className="my-bot-avatar"
    />
  );
}
