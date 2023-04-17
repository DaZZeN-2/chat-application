import { 
  ChatEngine, 
  ChatList, ChatCard, NewChatForm, ChatHeader, IceBreaker, MessageBubble, IsTyping, NewMessageForm,
  ChatSettings, ChatSettingsTop, PeopleSettings, PhotosSettings, OptionsSettings, getOrCreateChat
} from 'react-chat-engine'

import { useState } from 'react';


import ChatFeed from './components/ChatFeed';
import LoginForm from './components/LoginForm';
import './App.css';

const projectID = 'cdfd75a0-4857-4f3a-988a-cbcb119dfa40';

const App = () => {
  const [username, setUsername] = useState('')

  if (!localStorage.getItem('username')) return <LoginForm />;

  function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	function renderChatForm(creds) {
		return (
			<div>
				<input 
					placeholder='Username' 
					value={username} 
					onChange={(e) => setUsername(e.target.value)} 
				/>
				<button onClick={() => createDirectChat(creds)}>
					Create
				</button>
			</div>
		)
	}

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem('username')}
      userSecret={localStorage.getItem('password')}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
      renderChatList={(chatAppState) => <ChatList {...chatAppState} />}
      renderChatCard={(chat, index) => <ChatCard key={`${index}`} chat={chat} />}
      renderNewChatForm={(creds) => <NewChatForm creds={creds} />}
      renderChatHeader={(chat) => <ChatHeader />}
      renderIceBreaker={(chat) => <IceBreaker />}
      renderMessageBubble={(creds, chat, lastMessage, message, nextMessage) => <MessageBubble lastMessage={lastMessage} message={message} nextMessage={nextMessage} chat={chat} />}
      renderIsTyping={(typers) => <IsTyping />}
      renderNewMessageForm={(creds, chatID) => <NewMessageForm />}
      renderChatSettings={(chatAppState) => <ChatSettings {...chatAppState} />}
      renderChatSettingsTop={(creds, chat) => <ChatSettingsTop />}
      renderPeopleSettings={(creds, chat) => <PeopleSettings />}
      renderPhotosSettings={(chat) => <PhotosSettings />}
      renderOptionsSettings={(creds, chat) => <OptionsSettings />}
    />
  );
};

export default App;