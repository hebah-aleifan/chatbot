import './TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator d-flex align-items-center p-3">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span className="ms-2 text-muted">AI is typing...</span>
    </div>
  );
};

export default TypingIndicator;