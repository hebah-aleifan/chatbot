import { createChatBotMessage } from 'react-chatbot-kit';
import TypingIndicator from './TypingIndicator';
import MyBotAvatar from './MyBotAvatar';
const botConfig = {
  initialMessages: [
    createChatBotMessage('Hello! I\'m your AI assistant. How can I help you today?')
  ],
  botName: 'AI Assistant',
  customComponents: {
    botAvatar: (props) => <MyBotAvatar {...props} />
  },  customStyles: {
    botMessageBox: {
      backgroundColor: '#0D1740',
      color: '#6c9571',
      borderRadius: '1rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
      border: 'none',
    },
    userMessageBox: {
      backgroundColor: '#a71d31',
      color: 'white',
      borderRadius: '1rem',
      boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)',
    },
    chatButton: {
      backgroundColor: '#0D1740',
      borderRadius: '4rem',
      border: 'none',
    },
    chatButtonText: {
      color: 'white',
    },
  },
  widgets: [
    {
      widgetName: 'typingIndicator',
      widgetFunc: () => <TypingIndicator />,
    },
  ],
};

export default botConfig;