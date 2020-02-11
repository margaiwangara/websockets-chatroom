var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var errorBox = document.querySelector('.error');
var username = document.getElementById('username-field');
var feedback = document.querySelector('.feedback');
// Socket.io Client
var socket = io('http://localhost:5000/');

messageForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // grab elements
  var message = e.target.elements.message.value;
  var userId = e.target.elements.id.value;
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
  socket.emit('sent message', { message: message, user: userId });

  socket.on('saved message', function(saved) {
    console.log(saved);
  });

  // clear input
  e.target.reset();
});

// message input
messageInput.addEventListener('keypress', function(e) {
  if (e.key !== 'Enter') socket.emit('typing', { username: username.value });
  else feedback.innerHTML = '';
});

// display is typing
socket.on('isTyping', function(res) {
  feedback.innerHTML = `${res} is typing...`;
});
// button.addEventListener('click', function(e) {
//   e.preventDefault();
//   alert('button clicked');
//   // emit socket
//   socket.emit('message', { message: 'This is a test message' });
// });
