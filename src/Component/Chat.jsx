import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const API_KEY = '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';

const App = () => {
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    let retries = 0;

    while (retries < 3) {
      try {
        const response = await processMessageToChatGPT([...messages, newMessage]);

        // Check if the response is successful
        if (response.ok) {
          const choices = response.choices;

          // Check if 'choices' is an array and not empty
          if (Array.isArray(choices) && choices.length > 0) {
            const content = choices[0]?.message?.content;

            // Check if 'content' exists
            if (content) {
              const chatGPTResponse = {
                message: content,
                sender: 'ChatGPT',
              };
              setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
            }
          }

          break; // Exit the loop if successful response
        }

        // Retry only on 429 status
        if (response.status !== 429) {
          console.error('Error processing message:', response.statusText);
          break; // Exit the loop if not a rate-limiting error
        }

        // Retry after a delay (adjust as needed)
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retries + 1)));
        retries += 1;
      } catch (error) {
        console.error('Error processing message:', error);
        break; // Exit the loop on other errors
      }
    }

    setIsTyping(false);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === 'ChatGPT' ? 'assistant' : 'user';
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="App">
      <div style={{ position: 'relative', height: '800px', width: '700px' }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default App;
