import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import '../style/messagesPage.css';

function MessagesPage() {
  const conversations = [
    { id: 1, name: 'Alice', lastMessage: 'Ciao, come stai?' },
    { id: 2, name: 'Bob', lastMessage: 'Ci vediamo domani?' },
    { id: 3, name: 'Charlie', lastMessage: 'Grazie per ieri sera!' },
  ];

  return (
    <div className="messages-page">
      <Header />
      <main>
        <h1>I tuoi messaggi</h1>
        <div className="conversations-list">
          {conversations.map(conv => (
            <div key={conv.id} className="conversation-item">
              <img src={`https://example.com/avatar-${conv.id}.jpg`} alt={conv.name} />
              <div className="conversation-preview">
                <h3>{conv.name}</h3>
                <p>{conv.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MessagesPage;