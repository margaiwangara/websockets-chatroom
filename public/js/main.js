var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var errorBox = document.querySelector('.error');

// Socket.io Client
var socket = io();

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // grab elements
  var message = e.target.elements.message.value;

  if (!message) {
    // display message in error message
    errorBox.innerHTML = 'Message input is required';
    // display error message
    errorBox.style.display = 'block';

    setTimeout(function() {
      errorBox.style.display = 'none';
    }, 2000);

    return false;
  }

  // else send message
  socket.emit('message', { message: message });
  // clear input
  e.target.reset();
});

// button.addEventListener('click', function(e) {
//   e.preventDefault();
//   alert('button clicked');
//   // emit socket
//   socket.emit('message', { message: 'This is a test message' });
// });
