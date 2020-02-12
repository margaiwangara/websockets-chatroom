var messageForm = document.getElementById('message-form');
var messageInput = document.getElementById('message-input');
var errorBox = document.querySelector('.error');
var username = document.getElementById('username-field');
var feedback = document.querySelector('.feedback');
var centerArea = document.querySelector('.work-area-center');

// Socket.io Client
var socket = io('http://localhost:5000/');

function createCard(id, name, message, date) {
  var card = document.createElement('div');
  card.setAttribute('class', 'list-tile');
  var cardTop = document.createElement('div');
  cardTop.setAttribute('class', 'list-tile-top');
  var usernameArea = document.createElement('h5');
  usernameArea.setAttribute('data-id', id);
  usernameArea.innerHTML = name;
  var messageArea = document.createElement('p');
  messageArea.innerHTML = message;
  var dateArea = document.createElement('h6');
  dateArea.innerHTML = date;

  cardTop.appendChild(usernameArea);
  // append elements to card
  card.append(cardTop, messageArea, dateArea);

  return card;
}

// optimization moved to later

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

  socket.on('saved message', function(payload) {
    var result = payload.createChat;
    var chat = {
      id: result.id,
      message: result.message,
      date: result.createdAt,
    };
    var user = {
      id: result.user.id,
      username: result.user.username,
    };

    // display on message board
    centerArea.prepend(
      createCard(user.id, user.username, chat.message, chat.date),
    );

    feedback.innerHTML = '';
  });

  // clear input
  e.target.reset();
});

// message input
messageInput.addEventListener('keypress', function(e) {
  if (e.key !== 'Enter') socket.emit('typing', { username: username.value });

});

// display is typing
socket.on('isTyping', function(res) {
  feedback.innerHTML = `${res} is typing...`;
});

// get messages socket
socket.on('messages', function(messages = []) {
  // load data directly here
  var myNode = [];
  for (var i = 0; i < messages.chats.length; i++) {
    myNode.push(
      createCard(
        messages.chats[i].user.id,
        messages.chats[i].user.username,
        messages.chats[i].message,
        messages.chats[i].createdAt,
      ),
    );
  }

  // plug into display area
  centerArea.prepend(...myNode);
});
// button.addEventListener('click', function(e) {
//   e.preventDefault();
//   alert('button clicked');
//   // emit socket
//   socket.emit('message', { message: 'This is a test message' });
// });
