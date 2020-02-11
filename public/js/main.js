var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var messageBox = document.querySelector('.top');

// Socket.io Client
var socket = io();

var button = document.querySelector('.myButton');

if (!button) console.log('no button');

button.addEventListener('click', function(e) {
  e.preventDefault();
  alert('button clicked');
  // emit socket
  socket.emit('message', { message: 'This is a test message' });
});
