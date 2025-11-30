// Quiz data structure with questions for each course
const quizData = {
    'ml-basics': {
        title: 'ML Fundamentals',
        questions: [
            {
                id: 'mlb-q1',
                question: 'What is the main purpose of data preprocessing in machine learning?',
                options: [
                    'To make data look prettier',
                    'To prepare data for effective model training',
                    'To reduce storage space',
                    'To create backups'
                ],
                correct: 1,
                explanation: 'Data preprocessing is essential to clean, normalize, and transform raw data into a format suitable for machine learning models.'
            },
            {
                id: 'mlb-q2',
                question: 'Which of the following is NOT a common feature scaling method?',
                options: [
                    'Min-Max Scaling',
                    'Z-score Normalization',
                    'Logarithmic Scaling',
                    'Random Scaling'
                ],
                correct: 3,
                explanation: 'Random scaling is not a valid scaling method. Common methods include min-max scaling, z-score normalization, and logarithmic scaling.'
            },
            {
                id: 'mlb-q3',
                question: 'What is the purpose of one-hot encoding?',
                options: [
                    'To compress categorical data',
                    'To convert categorical data into numerical format',
                    'To encrypt sensitive data',
                    'To reduce dimensionality'
                ],
                correct: 1,
                explanation: 'One-hot encoding converts categorical variables into a format that can be provided to ML algorithms to improve predictions.'
            }
        ]
    },
    'deep-learning': {
        title: 'Deep Learning',
        questions: [
            {
                id: 'dl-q1',
                question: 'What is a neural network activation function?',
                options: [
                    'A function that starts the network',
                    'A function that introduces non-linearity',
                    'A function that stops training',
                    'A function that saves the model'
                ],
                correct: 1,
                explanation: 'Activation functions introduce non-linearity into neural networks, allowing them to learn complex patterns.'
            },
            {
                id: 'dl-q2',
                question: 'Which of these is NOT a common deep learning framework?',
                options: [
                    'TensorFlow',
                    'PyTorch',
                    'DeepMind',
                    'Keras'
                ],
                correct: 2,
                explanation: 'DeepMind is a company, not a deep learning framework. TensorFlow, PyTorch, and Keras are popular frameworks.'
            }
        ]
    },
    'nlp': {
        title: 'Natural Language Processing',
        questions: [
            {
                id: 'nlp-q1',
                question: 'What is tokenization in NLP?',
                options: [
                    'Converting text to numbers',
                    'Breaking text into smaller units',
                    'Encrypting text data',
                    'Compressing text'
                ],
                correct: 1,
                explanation: 'Tokenization is the process of breaking text into smaller units like words, subwords, or characters.'
            }
        ]
    }
};

// Function to get today's quiz questions
function getTodaysQuiz() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    
    // Use the date as a seed to randomly select questions
    function seededRandom(seed) {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    // Select questions from each course
    let todaysQuestions = [];
    let seedCounter = seed;

    for (const [courseId, courseData] of Object.entries(quizData)) {
        const questions = courseData.questions;
        const numQuestions = Math.min(2, questions.length); // Select up to 2 questions per course
        
        // Randomly select questions using the seeded random function
        const selectedIndices = new Set();
        while (selectedIndices.size < numQuestions) {
            const index = Math.floor(seededRandom(seedCounter++) * questions.length);
            if (!selectedIndices.has(index)) {
                selectedIndices.add(index);
                todaysQuestions.push({
                    ...questions[index],
                    course: courseData.title
                });
            }
        }
    }

    // Shuffle the questions using the seeded random function
    for (let i = todaysQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seedCounter++) * (i + 1));
        [todaysQuestions[i], todaysQuestions[j]] = [todaysQuestions[j], todaysQuestions[i]];
    }

    return todaysQuestions;
}

// Function to display the quiz
function displayDailyQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    const questions = getTodaysQuiz();
    const today = new Date().toLocaleDateString();

    // Check if user has already taken today's quiz
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '{}');
    const todayAttempt = quizHistory[today];

    let html = `
        <div class="quiz-header">
            <h2>Daily Quiz - ${today}</h2>
            <p>Test your knowledge with today's questions!</p>
        </div>
    `;

    if (todayAttempt) {
        // Show results if quiz already taken
        html += `
            <div class="quiz-results">
                <h3>Today's Quiz Completed!</h3>
                <p>Score: ${todayAttempt.score}/${todayAttempt.total}</p>
                <div class="score-details">
                    <p>Correct Answers: ${todayAttempt.correct}</p>
                    <p>Incorrect Answers: ${todayAttempt.incorrect}</p>
                </div>
                <p>Come back tomorrow for new questions!</p>
            </div>
        `;
    } else {
        // Show quiz questions
        html += `<form id="quiz-form">`;
        questions.forEach((q, index) => {
            html += `
                <div class="question-card" data-id="${q.id}">
                    <div class="question-header">
                        <span class="question-number">Question ${index + 1}</span>
                        <span class="course-tag">${q.course}</span>
                    </div>
                    <p class="question-text">${q.question}</p>
                    <div class="options-list">
                        ${q.options.map((option, i) => `
                            <div class="option">
                                <input type="radio" name="q${index}" value="${i}" id="q${index}o${i}" required>
                                <label for="q${index}o${i}">${option}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
        html += `
            <div class="quiz-actions">
                <button type="submit" class="submit-quiz">Submit Quiz</button>
            </div>
        </form>`;
    }

    quizContainer.innerHTML = html;

    // Add submit handler if quiz hasn't been taken
    if (!todayAttempt) {
        const form = document.getElementById('quiz-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            submitQuiz(questions);
        });
    }
}

// Function to submit the quiz
function submitQuiz(questions) {
    let correct = 0;
    const results = [];

    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected) {
            const isCorrect = parseInt(selected.value) === q.correct;
            if (isCorrect) correct++;
            
            results.push({
                question: q.question,
                selectedAnswer: q.options[parseInt(selected.value)],
                correctAnswer: q.options[q.correct],
                isCorrect,
                explanation: q.explanation
            });
        }
    });

    // Save results to localStorage
    const today = new Date().toLocaleDateString();
    const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '{}');
    quizHistory[today] = {
        date: today,
        score: correct,
        total: questions.length,
        correct,
        incorrect: questions.length - correct,
        results
    };
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));

    // Show results
    displayDailyQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayDailyQuiz();
}); 