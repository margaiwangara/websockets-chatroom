var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var messageBox = document.querySelector('.top');

// Socket.io Client
var socket = io();

function handleMessageSubmit(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    // clear input
    e.target.value = '';

    return false;
  }
}

messageInput.addEventListener('keydown', handleMessageSubmit);
