const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

window.onload = function() {
    appendMessage('bot', 'Dear Tron user, how can I help?');
};

sendButton.addEventListener('click', sendMessage);
let enterKeyDisabled = false;

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !enterKeyDisabled) {
        sendMessage();
        enterKeyDisabled = true; // Disable further input
        setTimeout(() => {
            enterKeyDisabled = false; // Re-enable after 5 seconds
        }, 5000);
    }
});

function sendMessage() {
    const messageText = userInput.value.trim();

    // Append user message even if it's empty
    appendMessage('user', messageText);
    userInput.value = ''; // Clear the input

    // Disable the send button
    sendButton.disabled = true;

    // Re-enable the button after 5 seconds
    setTimeout(() => {
        sendButton.disabled = false;
    }, 5000);

    if (messageText === '') {
        typeOutMessage('Please enter a message so I can properly assist you.', 'bot');
    } else {
        // Simulate bot typing response
        setTimeout(() => {
            typeOutMessage("I don't know", 'bot');
        }, 1000);
    }
}

function typeOutMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = sender === 'bot' ? 'Assistant' : ''; // Only show title for bot

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
            setTimeout(typeCharacter, 0); // Adjust typing speed here
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
    
    if (sender === 'user') {
        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        messageBox.textContent = text; // Append empty text

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime(); // Set timestamp for user message

        messageDiv.appendChild(messageBox);
        messageDiv.appendChild(timestamp);
    } else {
        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = 'Assistant';

        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');
        messageBox.textContent = text;

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime(); // Set timestamp for bot message

        messageDiv.appendChild(title);
        messageDiv.appendChild(messageBox);
        messageDiv.appendChild(timestamp);
    }

    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
}

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

$.ajax({
    url: 'http://192.168.1.59:8810/agent',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
        query: 'band oracle',
        session_id: '749530f51b5f11d14364c208c5822acd531384be4a1ae5f514e98ebda2daf72f'
    }),
    success: function(response) {
        console.log('Success:', response);
    },
    error: function(error) {
        console.error('Error:', error);
    }
});