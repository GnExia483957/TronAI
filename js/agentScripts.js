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
        }, 4000);
    }
});


    function sendMessage() {
    const messageText = userInput.value.trim();

    // Append user message even if it's empty
    appendMessage('user', messageText);
    userInput.value = ''; // Clear the input

    // Disable the send button
    sendButton.disabled = false;

    // Re-enable the button after 5 seconds
    setTimeout(() => {
        sendButton.disabled = false;
    }, 3000);

    if (messageText === '') {
        typeOutMessage('Please enter a message so I can properly assist you.', 'bot');
    } else {
        let query = messageText
        console.log(query);
        // Use the variable in the fetch request
        fetch('https://95bf-182-239-122-127.ngrok-free.app/v1/g_chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query
            })
          })
          .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log("API Call Successful")
            console.log(data);
            setTimeout(() => {
                typeOutMessage(data.data.answer, 'bot');
            }, 1000);
        
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
        
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