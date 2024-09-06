const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

window.onload = function () {
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

    // Append user message
    appendMessage('user', messageText);
    userInput.value = ''; // Clear the input

    // Disable the send button
    sendButton.disabled = true;

    if (messageText === '') {
        typeOutMessage('Please enter a message so I can properly assist you.', 'bot');
        sendButton.disabled = false; // Re-enable button
    } else {
        let query = messageText;

        // Create a placeholder message for the bot
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'bot');

        const title = document.createElement('div');
        title.classList.add('title');
        title.textContent = 'Assistant';

        const messageBox = document.createElement('div');
        messageBox.classList.add('message-box');

        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');

        messageDiv.appendChild(title);
        messageDiv.appendChild(messageBox);
        messageDiv.appendChild(timestamp);
        chatContainer.appendChild(messageDiv);
        
        // Show thinking animation inside the message box
        showThinkingAnimation(messageBox);
        chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom

        // Fetch the response
        fetch('https://c83a-182-239-89-23.ngrok-free.app/v1/g_chat', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query }),
            //do not delete credentials, helps create the session_ID needed later
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            hideThinkingAnimation(); // Hide thinking animation
            typeOutMessage(data.data.answer, 'bot', messageBox); // Start typing the response
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            hideThinkingAnimation(); // Hide thinking animation on error
            typeOutMessage('Sorry, something went wrong. Please try again.', 'bot', messageBox);
        })
        .finally(() => {
            sendButton.disabled = false; // Re-enable the send button
        });
    }
}

function typeOutMessage(text, sender, messageBox) {
    let index = 0;
    function typeCharacter() {
        if (index < text.length) {
            messageBox.textContent = text.substring(0, index + 1); // Update text progressively
            index++;
            chatContainer.scrollTop = chatContainer.scrollHeight; // Keep scrolling to the bottom
            setTimeout(typeCharacter, 15); // Adjust typing speed here
        } else {
            const timestamp = messageBox.parentElement.querySelector('.timestamp');
            timestamp.textContent = getCurrentTime(); // Set timestamp after typing
            chatContainer.scrollTop = chatContainer.scrollHeight; // Final scroll to the bottom
        }
    }
    typeCharacter();
}

function showThinkingAnimation(container) {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    for (let i = 0; i < 5; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        loader.appendChild(dot);
    }
    container.appendChild(loader);
}

function hideThinkingAnimation() {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.remove();
    }
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