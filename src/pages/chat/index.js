import React from 'react';
import Chat from '../../components/chat';
import Footer from '../../components/footer';
import './styles.css';

function ChatPage(props) {
	return (
		<>
			<div className="chat-page-outer-cont">
				<div className="chat-page-inner-cont">
					<Chat></Chat>
				</div>
			</div>
			<Footer></Footer>
		</>
	)
}

export default ChatPage;