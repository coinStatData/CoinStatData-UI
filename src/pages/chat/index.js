import React from 'react';
import Chat from '../../components/chat';
import NavBarComp from '../../components/navBar/navBar';
import Footer from '../../components/footer';
import './styles.css';

function ChatPage(props) {
	return (
		<>
			<NavBarComp></NavBarComp>
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