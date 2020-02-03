var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var messageBox = document.querySelector('.top');

// Socket.io Client
var socket = io();

function handleMessageSubmit(e){
  if(e.key === 'Enter'){
    e.preventDefault();
    // submit message here
    socket.emit('chat message', e.target.value);
    // clear input
    e.target.value = '';

    return false;
  }
  
  
}

// display chat messages
socket.on('chat message', function(msg){
  var el = document.createElement('span');
  el.innerHTML = msg;
  messageBox.appendChild(el);
});



messageInput.addEventListener('keydown', handleMessageSubmit);