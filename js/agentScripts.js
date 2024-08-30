window.onload = function() {
    document.getElementById('message').innerText = "Dear Tron user, what can I help you with?";
};

// Function to handle sending messages
function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');

    // Check if user input is empty
    if (userInput.trim() === '') {
        const botResponseDiv = document.createElement('div');
        botResponseDiv.className = 'message';
        botResponseDiv.innerHTML = `
            <div class="title">Assistant</div>
            <div>Please enter something so we have something to talk about.</div>
        `;
        messagesDiv.appendChild(botResponseDiv);
    } else {
        // User message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'user-message';
        userMessageDiv.innerText = `You: ${userInput}`;
        messagesDiv.appendChild(userMessageDiv);

        // Bot response with typing effect
        const botResponseDiv = document.createElement('div');
        botResponseDiv.className = 'message';
        botResponseDiv.innerHTML = `
            <div class="title">Assistant</div>
            <div class="bot-response"></div>
        `;
        messagesDiv.appendChild(botResponseDiv);

        // Clear input field
        document.getElementById('userInput').value = '';

        // Simulate typing effect
        const responseText = "I don't know";
        let index = 0;
        const botResponseElement = botResponseDiv.querySelector('.bot-response');

        const typingInterval = setInterval(() => {
            if (index < responseText.length) {
                botResponseElement.innerHTML += responseText.charAt(index);
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 30); // Adjust typing speed here (100ms per character)
    }
}

// Send message on button click
document.getElementById('sendButton').onclick = sendMessage;

// Send message on Enter key press
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
        event.preventDefault(); // Prevent form submission if inside a form
    }
});


//clears the local storage if AI link is pressed
document.getElementById('AILink').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.removeItem('inputValue');
    window.location.href = 'AI.html';
  });