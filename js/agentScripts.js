const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

window.onload = function() {
    appendMessage('bot', 'Dear Tron user, how can I help?');
};

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === '') return;

    appendMessage('user', messageText);
    userInput.value = '';

    // Simulate bot typing response
    setTimeout(() => {
        typeOutMessage("I'm here to help!", 'bot');
    }, 1000);
}

function typeOutMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = sender === 'user' ? 'You' : 'Assistant';

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');

    messageDiv.appendChild(title);
    messageDiv.appendChild(messageBox);
    messageDiv.appendChild(timestamp);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom

    let index = 0;
    function typeCharacter() {
        if (index < text.length) {
            messageBox.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, 50); // Adjust typing speed here
        } else {
            timestamp.textContent = getCurrentTime(); // Set timestamp after typing
            chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
        }
    }
    typeCharacter();
}

function appendMessage(sender, text) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = sender === 'user' ? 'You' : 'Assistant';

    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.textContent = text;

    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = getCurrentTime(); // Set timestamp for user message

    messageDiv.appendChild(title);
    messageDiv.appendChild(messageBox);
    messageDiv.appendChild(timestamp);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
