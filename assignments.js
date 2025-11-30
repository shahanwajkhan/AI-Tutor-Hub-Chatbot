// Assignment data structure
const assignmentData = {
    'ml-basics': {
        title: 'ML Fundamentals Assignments',
        assignments: [
            {
                id: 'mlb-1',
                title: 'Data Preprocessing and EDA',
                description: 'Perform exploratory data analysis on a given dataset and prepare it for machine learning.',
                difficulty: 'beginner',
                deadline: '2 weeks',
                points: 100,
                requirements: [
                    'Load and clean the dataset',
                    'Handle missing values',
                    'Perform feature scaling',
                    'Create visualizations for data distribution',
                    'Document your findings'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Explain the importance of data preprocessing in machine learning. Provide examples of common preprocessing techniques.',
                        type: 'text',
                        maxWords: 300
                    },
                    {
                        id: 'q2',
                        text: 'What methods would you use to handle missing values in a dataset? When would you choose one method over another?',
                        type: 'text',
                        maxWords: 250
                    },
                    {
                        id: 'q3',
                        text: 'Implement a function to perform feature scaling using standardization (z-score normalization).',
                        type: 'code',
                        language: 'python',
                        template: `def standardize_features(data):
    # Your code here
    pass`
                    }
                ],
                resources: ['dataset.csv', 'assignment_guide.pdf'],
                submissionType: 'jupyter-notebook'
            },
            {
                id: 'mlb-2',
                title: 'Feature Engineering Basics',
                description: 'Learn and implement basic feature engineering techniques.',
                difficulty: 'beginner',
                deadline: '2 weeks',
                points: 100,
                requirements: [
                    'Create numerical features',
                    'Handle categorical variables',
                    'Implement one-hot encoding',
                    'Create interaction features',
                    'Evaluate feature importance'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'What is feature engineering and why is it important in machine learning?',
                        type: 'text',
                        maxWords: 250
                    },
                    {
                        id: 'q2',
                        text: 'Implement a function to perform one-hot encoding on categorical variables.',
                        type: 'code',
                        language: 'python',
                        template: `def one_hot_encode(data, categorical_columns):
    # Your code here
    pass`
                    }
                ],
                resources: ['feature_engineering_data.csv', 'guide.pdf'],
                submissionType: 'python-script'
            },
            {
                id: 'mlb-3',
                title: 'Advanced Model Evaluation',
                description: 'Implement and analyze various model evaluation techniques.',
                difficulty: 'intermediate',
                deadline: '3 weeks',
                points: 150,
                requirements: [
                    'Implement cross-validation',
                    'Calculate various metrics',
                    'Create learning curves',
                    'Perform error analysis',
                    'Compare model performances'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Implement k-fold cross-validation from scratch.',
                        type: 'code',
                        language: 'python',
                        template: `def k_fold_cross_validation(X, y, k=5):
    # Your code here
    pass`
                    },
                    {
                        id: 'q2',
                        text: 'Explain the bias-variance tradeoff and how it relates to model complexity.',
                        type: 'text',
                        maxWords: 300
                    }
                ],
                resources: ['evaluation_data.csv', 'metrics_guide.pdf'],
                submissionType: 'python-script'
            },
            {
                id: 'mlb-4',
                title: 'Advanced Feature Selection',
                description: 'Master advanced feature selection techniques and dimensionality reduction.',
                difficulty: 'advanced',
                deadline: '4 weeks',
                points: 200,
                requirements: [
                    'Implement PCA',
                    'Perform feature selection',
                    'Apply regularization techniques',
                    'Compare selection methods',
                    'Optimize feature subset'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Implement Principal Component Analysis (PCA) from scratch.',
                        type: 'code',
                        language: 'python',
                        template: `class PCA:
    def __init__(self, n_components):
        self.n_components = n_components
        self.components = None
        self.mean = None

    def fit(self, X):
        # Your implementation here
        pass

    def transform(self, X):
        # Your implementation here
        pass`
                    },
                    {
                        id: 'q2',
                        text: 'Compare and contrast different feature selection methods and their impact on model performance.',
                        type: 'text',
                        maxWords: 400
                    }
                ],
                resources: ['feature_selection_data.csv', 'advanced_guide.pdf'],
                submissionType: 'python-script'
            }
        ]
    },
    'ml-algorithms': {
        title: 'ML Algorithms Assignments',
        assignments: [
            {
                id: 'mla-1',
                title: 'Decision Tree Implementation',
                description: 'Build a decision tree classifier from scratch and compare with scikit-learn implementation.',
                deadline: '3 weeks',
                points: 150,
                requirements: [
                    'Implement decision tree algorithm',
                    'Calculate information gain',
                    'Perform tree pruning',
                    'Compare with sklearn',
                    'Visualize the tree'
                ],
                resources: ['tree_data.csv', 'implementation_guide.pdf'],
                submissionType: 'python-script'
            }
        ]
    },
    'ml-advanced': {
        title: 'Advanced ML Assignments',
        assignments: [
            {
                id: 'adv-1',
                title: 'Ensemble Methods Project',
                description: 'Implement various ensemble methods and analyze their performance.',
                deadline: '4 weeks',
                points: 200,
                requirements: [
                    'Implement Random Forest',
                    'Implement Gradient Boosting',
                    'Compare model performances',
                    'Analyze feature importance',
                    'Create ensemble pipeline'
                ],
                resources: ['project_data.zip', 'ensemble_guide.pdf'],
                submissionType: 'project-repo'
            }
        ]
    },
    'deep-learning': {
        title: 'Deep Learning Assignments',
        assignments: [
            {
                id: 'dl-1',
                title: 'Neural Network Basics',
                description: 'Understanding and implementing basic neural network components.',
                difficulty: 'beginner',
                deadline: '2 weeks',
                points: 100,
                requirements: [
                    'Implement activation functions',
                    'Create loss functions',
                    'Build basic neural network',
                    'Train on simple dataset',
                    'Visualize results'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Implement common activation functions (ReLU, Sigmoid, Tanh) and their derivatives.',
                        type: 'code',
                        language: 'python',
                        template: `def relu(x):
    # Your code here
    pass

def sigmoid(x):
    # Your code here
    pass

def tanh(x):
    # Your code here
    pass`
                    },
                    {
                        id: 'q2',
                        text: 'Explain the role of activation functions in neural networks.',
                        type: 'text',
                        maxWords: 250
                    }
                ],
                resources: ['nn_basics.pdf', 'starter_code.py'],
                submissionType: 'python-script'
            },
            {
                id: 'dl-2',
                title: 'Convolutional Neural Networks',
                description: 'Implementation and understanding of CNNs.',
                difficulty: 'intermediate',
                deadline: '3 weeks',
                points: 150,
                requirements: [
                    'Implement convolution operation',
                    'Create pooling layers',
                    'Build CNN architecture',
                    'Train on MNIST',
                    'Analyze performance'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Implement a convolutional layer from scratch.',
                        type: 'code',
                        language: 'python',
                        template: `class ConvLayer:
    def __init__(self, num_filters, filter_size):
        self.num_filters = num_filters
        self.filter_size = filter_size
        
    def forward(self, input_data):
        # Your implementation here
        pass
        
    def backward(self, gradient):
        # Your implementation here
        pass`
                    }
                ],
                resources: ['cnn_guide.pdf', 'mnist_data.npz'],
                submissionType: 'python-script'
            },
            {
                id: 'dl-3',
                title: 'Advanced Deep Learning Architectures',
                description: 'Implementing and training advanced neural network architectures.',
                difficulty: 'advanced',
                deadline: '4 weeks',
                points: 200,
                requirements: [
                    'Implement attention mechanism',
                    'Build transformer architecture',
                    'Create custom layers',
                    'Train on complex dataset',
                    'Optimize performance'
                ],
                questions: [
                    {
                        id: 'q1',
                        text: 'Implement a multi-head self-attention mechanism.',
                        type: 'code',
                        language: 'python',
                        template: `class MultiHeadAttention:
    def __init__(self, d_model, num_heads):
        self.d_model = d_model
        self.num_heads = num_heads
        
    def forward(self, queries, keys, values, mask=None):
        # Your implementation here
        pass`
                    },
                    {
                        id: 'q2',
                        text: 'Explain the advantages and challenges of using attention mechanisms in deep learning.',
                        type: 'text',
                        maxWords: 400
                    }
                ],
                resources: ['transformer_guide.pdf', 'advanced_dl_data.zip'],
                submissionType: 'project-repo'
            }
        ]
    },
    'nlp': {
        title: 'NLP Assignments',
        assignments: [
            {
                id: 'nlp-1',
                title: 'Text Classification Pipeline',
                description: 'Build an end-to-end text classification pipeline.',
                deadline: '3 weeks',
                points: 150,
                requirements: [
                    'Implement text preprocessing',
                    'Create word embeddings',
                    'Implement classification model',
                    'Perform error analysis',
                    'Deploy model API'
                ],
                resources: ['text_data.json', 'pipeline_guide.pdf'],
                submissionType: 'project-repo'
            }
        ]
    }
};

// Function to display assignments for a course
function displayAssignments(courseId) {
    const assignmentsContainer = document.querySelector('.assignments-container');
    const assignments = assignmentData[courseId].assignments || [];
    const selectedDifficulty = document.getElementById('difficultyFilter').value;

    // Calculate difficulty summary
    const difficultySummary = {
        beginner: assignments.filter(a => a.difficulty === 'beginner').length,
        intermediate: assignments.filter(a => a.difficulty === 'intermediate').length,
        advanced: assignments.filter(a => a.difficulty === 'advanced').length
    };

    // Update difficulty summary display
    const summaryHTML = `
        <div class="difficulty-summary">
            <div class="difficulty-stat beginner">
                <div class="count">${difficultySummary.beginner}</div>
                <div class="label">Beginner</div>
            </div>
            <div class="difficulty-stat intermediate">
                <div class="count">${difficultySummary.intermediate}</div>
                <div class="label">Intermediate</div>
            </div>
            <div class="difficulty-stat advanced">
                <div class="count">${difficultySummary.advanced}</div>
                <div class="label">Advanced</div>
            </div>
        </div>
    `;

    // Filter assignments based on difficulty
    const filteredAssignments = selectedDifficulty === 'all' 
        ? assignments 
        : assignments.filter(assignment => assignment.difficulty === selectedDifficulty);

    if (filteredAssignments.length === 0) {
        assignmentsContainer.innerHTML = summaryHTML + `
            <div class="no-assignments">
                <i class="fas fa-tasks"></i>
                <p>No assignments found for the selected difficulty level.</p>
            </div>
        `;
        return;
    }

    const assignmentsHTML = filteredAssignments.map(assignment => `
        <div class="assignment-card" data-difficulty="${assignment.difficulty}">
            <div class="assignment-header">
                <h3>${assignment.title}</h3>
                <div class="assignment-meta">
                    <span class="difficulty-badge ${assignment.difficulty}">${assignment.difficulty}</span>
                    <span class="points">${assignment.points} Points</span>
                </div>
            </div>
            <p class="assignment-description">${assignment.description}</p>
            <div class="questions-section">
                ${assignment.questions.map((question, index) => `
                    <div class="question-card">
                        <div class="question-header">
                            <h4>Question ${index + 1}</h4>
                            <span class="points">${question.points} pts</span>
                        </div>
                        <p>${question.text}</p>
                        ${question.type === 'code' 
                            ? `<div class="code-editor" id="code-${assignment.id}-${index}"></div>`
                            : `<textarea class="answer-input" placeholder="Type your answer here..."></textarea>`
                        }
                    </div>
                `).join('')}
            </div>
            <div class="assignment-actions">
                <button class="download-btn" data-assignment="${assignment.id}">
                    <i class="fas fa-download"></i> Download Resources
                </button>
                <button class="submit-btn" data-assignment="${assignment.id}">
                    <i class="fas fa-paper-plane"></i> Submit Assignment
                </button>
            </div>
        </div>
    `).join('');

    assignmentsContainer.innerHTML = summaryHTML + assignmentsHTML;

    // Initialize code editors after rendering
    filteredAssignments.forEach(assignment => {
        assignment.questions.forEach((question, index) => {
            if (question.type === 'code') {
                const editorElement = document.getElementById(`code-${assignment.id}-${index}`);
                if (editorElement) {
                    initializeCodeEditor(editorElement, question.language || 'python');
                }
            }
        });
    });
}

// Add event listener for difficulty filter
document.getElementById('difficultyFilter').addEventListener('change', function() {
    const currentCourseId = document.querySelector('.assignments-main').dataset.courseId;
    displayAssignments(currentCourseId);
});

// Function to generate PDF content
async function generatePDF(assignment) {
    // Load the PDF library
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Set font sizes
    const titleSize = 16;
    const headingSize = 14;
    const normalSize = 12;
    
    // Add title
    doc.setFontSize(titleSize);
    doc.text(assignment.title, 20, 20);
    
    // Add description
    doc.setFontSize(normalSize);
    doc.text('Description:', 20, 35);
    const descriptionLines = doc.splitTextToSize(assignment.description, 170);
    doc.text(descriptionLines, 20, 45);
    
    // Add requirements
    let yPos = 45 + (descriptionLines.length * 7);
    doc.setFontSize(headingSize);
    doc.text('Requirements:', 20, yPos);
    yPos += 10;
    doc.setFontSize(normalSize);
    assignment.requirements.forEach(req => {
        doc.text('• ' + req, 25, yPos);
        yPos += 7;
    });
    
    // Add questions
    yPos += 10;
    doc.setFontSize(headingSize);
    doc.text('Questions:', 20, yPos);
    yPos += 10;
    doc.setFontSize(normalSize);
    
    assignment.questions.forEach((question, index) => {
        doc.text(`${index + 1}. ${question.text}`, 25, yPos);
        yPos += 7;
        if (question.type === 'code') {
            doc.text('Code Template:', 25, yPos);
            yPos += 7;
            const templateLines = doc.splitTextToSize(question.template, 160);
            doc.text(templateLines, 30, yPos);
            yPos += (templateLines.length * 7) + 5;
        }
    });
    
    // Add submission info
    yPos += 10;
    doc.setFontSize(headingSize);
    doc.text('Submission Information:', 20, yPos);
    yPos += 10;
    doc.setFontSize(normalSize);
    doc.text(`Deadline: ${assignment.deadline}`, 25, yPos);
    yPos += 7;
    doc.text(`Submission Type: ${assignment.submissionType}`, 25, yPos);
    yPos += 7;
    doc.text(`Points: ${assignment.points}`, 25, yPos);
    
    return doc;
}

// Function to download assignment resources
async function downloadResources(assignmentId) {
    // Find the assignment
    let assignment = null;
    for (const courseData of Object.values(assignmentData)) {
        assignment = courseData.assignments.find(a => a.id === assignmentId);
        if (assignment) break;
    }

    if (!assignment) {
        alert('Assignment not found');
        return;
    }

    try {
        // Generate PDF
        const doc = await generatePDF(assignment);
        
        // Save the PDF
        doc.save(`${assignment.id}_assignment.pdf`);
        
        // Show success message
        alert('Assignment resources downloaded successfully!');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error downloading resources. Please try again.');
    }
}

// Function to submit assignment
async function submitAssignment(assignmentId) {
    // Find the assignment
    let assignment = null;
    for (const courseData of Object.values(assignmentData)) {
        assignment = courseData.assignments.find(a => a.id === assignmentId);
        if (assignment) break;
    }

    if (!assignment) {
        alert('Assignment not found');
        return;
    }

    // Create submission modal
    const modal = document.createElement('div');
    modal.className = 'submission-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Submit Assignment: ${assignment.title}</h2>
            <form id="submission-form">
                ${assignment.questions.map((question, index) => `
                    <div class="form-group">
                        <label>Question ${index + 1}:</label>
                        <p>${question.text}</p>
                        ${question.type === 'code' 
                            ? `<textarea class="code-input" name="answer_${question.id}" rows="6" placeholder="Enter your code here...">${question.template}</textarea>`
                            : `<textarea class="text-input" name="answer_${question.id}" rows="4" placeholder="Enter your answer here..."></textarea>`
                        }
                    </div>
                `).join('')}
                <div class="form-group">
                    <label>Additional Files (Optional):</label>
                    <input type="file" name="files" multiple>
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="submit-btn">Submit Assignment</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    const form = modal.querySelector('#submission-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect answers
        const answers = {};
        assignment.questions.forEach(question => {
            const input = form.querySelector(`[name="answer_${question.id}"]`);
            answers[question.id] = {
                type: question.type,
                answer: input.value.trim()
            };
        });

        // Validate answers
        let isValid = true;
        for (const [id, answer] of Object.entries(answers)) {
            if (!answer.answer) {
                isValid = false;
                alert('Please answer all questions before submitting.');
                return;
            }
        }

        if (isValid) {
            // Create submission object
            const submission = {
                assignmentId,
                timestamp: new Date().toISOString(),
                answers
            };

            // Store in localStorage
            const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
            submissions.push(submission);
            localStorage.setItem('submissions', JSON.stringify(submissions));

            // Update UI
            updateCompletionStatus(assignmentId);

            // Close modal and show success message
            modal.remove();
            alert('Assignment submitted successfully!');
        }
    });

    // Handle cancel button
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Function to update completion status
function updateCompletionStatus(assignmentId) {
    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    const completedAssignments = submissions.map(s => s.assignmentId);
    
    // Update summary statistics
    let totalAssignments = 0;
    let totalPoints = 0;
    
    for (const courseData of Object.values(assignmentData)) {
        courseData.assignments.forEach(assignment => {
            totalAssignments++;
            totalPoints += assignment.points;
        });
    }
    
    const completed = completedAssignments.length;
    const pending = totalAssignments - completed;
    
    document.getElementById('total-assignments').textContent = totalAssignments;
    document.getElementById('completed-assignments').textContent = completed;
    document.getElementById('pending-assignments').textContent = pending;
    document.getElementById('total-points').textContent = totalPoints;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Load required libraries
    const jsPDFScript = document.createElement('script');
    jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(jsPDFScript);

    // Add event listeners for buttons after the page loads
    const assignmentsContainer = document.getElementById('assignments-container');
    
    assignmentsContainer.addEventListener('click', (e) => {
        const downloadBtn = e.target.closest('.download-btn');
        const submitBtn = e.target.closest('.submit-btn');
        
        if (downloadBtn) {
            const assignmentId = downloadBtn.dataset.assignment;
            downloadResources(assignmentId);
        } else if (submitBtn) {
            const assignmentId = submitBtn.dataset.assignment;
            submitAssignment(assignmentId);
        }
    });

    // Initialize completion status
    updateCompletionStatus();
}); 