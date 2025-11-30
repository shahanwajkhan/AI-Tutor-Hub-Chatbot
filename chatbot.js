// API Configuration
const API_CONFIG = {
    API_ENDPOINT: 'http://localhost:3000/api/chat',
    MAX_TOKENS: 150,
    TEMPERATURE: 0.7
};

// DOM Elements
let chatbotButton;
let chatbotWindow;
let chatbotMessages;
let chatbotInput;
let chatbotSend;

// Topics and their descriptions
const topics = {
    'Machine Learning Fundamentals': [
        'Basic concepts of ML',
        'Types of learning',
        'Model evaluation',
        'Feature engineering'
    ],
    'Linear Regression': [
        'Simple linear regression',
        'Multiple linear regression',
        'Model assumptions',
        'Gradient descent'
    ],
    'Deep Neural Networks': [
        'Neural network architecture',
        'Activation functions',
        'Backpropagation',
        'Optimization algorithms'
    ],
    'Python': [
        'Python basics',
        'NumPy and Pandas',
        'Scikit-learn',
        'TensorFlow/PyTorch'
    ],
    'Overfitting': [
        'Understanding overfitting',
        'Regularization techniques',
        'Cross-validation',
        'Model selection'
    ]
};

// Initialize DOM elements
function initializeElements() {
    chatbotButton = document.getElementById('chatbotButton');
    chatbotWindow = document.getElementById('chatbotWindow');
    chatbotMessages = document.getElementById('chatbotMessages');
    chatbotInput = document.getElementById('chatbotInput');
    chatbotSend = document.getElementById('chatbotSend');

    if (chatbotButton && chatbotWindow && chatbotMessages && chatbotInput && chatbotSend) {
        setupEventListeners();
    }
}

// Setup event listeners
function setupEventListeners() {
    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        chatbotButton.classList.remove('new-message');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Send message function
async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Add user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    try {
        // Get response from Gemini API
        const response = await getGeminiResponse(message);
        removeTypingIndicator();
        addMessage(response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        removeTypingIndicator();
        addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
    }
}

// Get response from Gemini API
async function getGeminiResponse(message) {
    const requestBody = {
        contents: [{
            parts: [{
                text: message
            }]
        }]
    };

    try {
        console.log('Sending request to API:', requestBody);

        const response = await fetch(API_CONFIG.API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(data.details || 'Failed to get response from API');
        }

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from API');
        }

        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to get response from AI assistant. Please try again.');
    }
}

// Process user message and generate response
function processUserMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check if the message matches any topic
    const matchedTopic = Object.keys(topics).find(topic => 
        lowerMessage.includes(topic.toLowerCase())
    );

    if (matchedTopic) {
        const topicDetails = topics[matchedTopic];
        addMessage(`Let's explore ${matchedTopic}! Here are the key areas we'll cover:`, 'bot');
        setTimeout(() => {
            addMessage(`
                • ${topicDetails.join('\n• ')}
                
                Which aspect would you like to learn more about?
            `, 'bot');
        }, 500);
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        addMessage("Hello! I'm here to help you learn AI and Machine Learning. What topic interests you?", 'bot');
    } else if (lowerMessage.includes('thank')) {
        addMessage("You're welcome! Feel free to ask more questions anytime.", 'bot');
    } else {
        addMessage(`I understand you're interested in ${message}. Could you please select one of the topics above or ask a more specific question?`, 'bot');
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);

    // Create message structure
    const messageHTML = `
        ${sender === 'bot' ? `
            <div class="message-avatar">
                <img src="assets/ai-assistant-avatar.svg" alt="AI Assistant" class="message-avatar-img">
            </div>
        ` : ''}
        <div class="message-content">
            ${text}
            ${sender === 'bot' && text.includes('topics we can explore') ? `
                <div class="topic-buttons">
                    ${Object.keys(topics).map(topic => `
                        <button class="topic-button" data-topic="${topic}">${topic}</button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;

    messageDiv.innerHTML = messageHTML;

    // Add click handlers to topic buttons if present
    const topicButtons = messageDiv.querySelectorAll('.topic-button');
    topicButtons.forEach(button => {
        button.addEventListener('click', () => handleTopicClick(button.textContent));
    });

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle topic button clicks
function handleTopicClick(topic) {
    addMessage(topic, 'user');
    showTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const topicDetails = topics[topic];
        addMessage(`Great choice! Let's explore ${topic}. Here are the key areas we'll cover:`, 'bot');
        setTimeout(() => {
            addMessage(`
                • ${topicDetails.join('\n• ')}
                
                Which aspect would you like to learn more about?
            `, 'bot');
        }, 500);
    }, 1000);
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.innerHTML = `
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize elements after a short delay to ensure the chatbot HTML is loaded
    setTimeout(initializeElements, 100);
}); 