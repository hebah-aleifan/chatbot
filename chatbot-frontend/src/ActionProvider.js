import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  async handleUserMessage(message) {
    // Show typing indicator
    this.showTypingIndicator();

    try {
      // Make API call to backend
      const response = await axios.post('http://localhost:8000/api/chat.php', {
        message: message
      });

      // Remove typing indicator and show response
      this.hideTypingIndicator();
      const botMessage = this.createChatBotMessage(response.data.response);
      this.addMessageToState(botMessage);

    } catch (error) {
      console.error('API Error:', error);
      console.error('Response:', error.response?.data);
      console.error('Status:', error.response?.status);
     
      this.hideTypingIndicator();
      const errorMessage = this.createChatBotMessage(
        'Sorry, I\'m having trouble connecting to the server. Please try again later.'
      );
      this.addMessageToState(errorMessage);
    }
  }

  showTypingIndicator() {
    const typingMessage = this.createChatBotMessage('', {
      widget: 'typingIndicator',
      loading: true
    });
    this.addMessageToState(typingMessage);
  }

  hideTypingIndicator() {
    this.setState((prevState) => ({
      ...prevState,
      messages: prevState.messages.filter(message => !message.loading)
    }));
  }

  addMessageToState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;