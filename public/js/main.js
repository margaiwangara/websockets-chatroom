var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');

function handleMessageSubmit(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    // submit message here
    // clear input
    e.target.value = '';
  }
  
}

// Socket.io Client
var socket = io();

messageInput.addEventListener('keydown', handleMessageSubmit);