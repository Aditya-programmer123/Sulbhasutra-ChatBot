const chatbotBody = document.getElementById('chatbotBody');
const userInput = document.getElementById('userInput');

function closeChat() {
    alert('This chatbot interface should be used within the integrated site.');
}

async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Display user message
    addMessage(userMessage, 'user-message');

    // Call GPT API for response
    const botMessage = await getBotResponse(userMessage);

    // Display bot response
    addMessage(botMessage, 'bot-message');

    // Clear input
    userInput.value = '';
}

function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = message;
    chatbotBody.appendChild(messageDiv);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

async function getBotResponse(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ` // Replace with your API key
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant knowledgeable about Sulbha Sutras and ancient mathematics.' },
                    { role: 'user', content: userMessage }
                ]
            })
        });

        if (!response.ok) {
            console.error(`HTTP Error: ${response.status} - ${response.statusText}`);
            throw new Error('API error');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching bot response:', error);
        return 'Sorry, I have encountered an error. Please try again later.';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
