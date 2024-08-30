let newDate = new Date();
let currentMonthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(newDate);
let currentDayNumber = newDate.getDate();
let currentDay;

console.log(newDate);

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
                // Scroll to the bottom after the bot response is complete
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
        }, 30); // Adjust typing speed here (30ms per character)
    }

    // Always scroll to the bottom after adding a new message
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
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

