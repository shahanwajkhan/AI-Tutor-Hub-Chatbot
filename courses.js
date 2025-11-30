// Course data structure
const courseData = {
    'ml-basics': {
        title: 'ML Fundamentals',
        chapters: [
            { 
                title: 'Introduction to Machine Learning',
                duration: '45 min',
                videoId: 'ukzFI9rgwfU'
            },
            { 
                title: 'Supervised Learning Basics',
                duration: '60 min',
                videoId: 'Gv9_4yMHFhI'
            },
            { 
                title: 'Unsupervised Learning Concepts',
                duration: '55 min',
                videoId: '4b5d3muPQmA'
            },
            { 
                title: 'Model Evaluation Techniques',
                duration: '50 min',
                videoId: 'fSytzGwwBVw'
            }
        ]
    },
    'ml-algorithms': {
        title: 'ML Algorithms',
        chapters: [
            { 
                title: 'Linear Regression Deep Dive',
                duration: '65 min',
                videoId: '8jazNUpO3lQ'
            },
            { 
                title: 'Decision Trees Explained',
                duration: '55 min',
                videoId: '7VeUPuFGJHk'
            },
            { 
                title: 'Random Forests Implementation',
                duration: '70 min',
                videoId: 'J4Wdy0Wc_xQ'
            }
        ]
    },
    'ml-advanced': {
        title: 'Advanced ML',
        chapters: [
            { 
                title: 'Ensemble Learning Methods',
                duration: '75 min',
                videoId: 'Un9zObFjBH0'
            },
            { 
                title: 'Feature Engineering Techniques',
                duration: '65 min',
                videoId: 'd12-y7jbQpw'
            },
            { 
                title: 'Model Deployment Strategies',
                duration: '60 min',
                videoId: 'f6jAz1zyrDI'
            }
        ]
    },
    'ai-basics': {
        title: 'AI Fundamentals',
        chapters: [
            { 
                title: 'Introduction to AI',
                duration: '45 min',
                videoId: 'JMUxmLyrhSk'
            },
            { 
                title: 'Problem-Solving Strategies',
                duration: '60 min',
                videoId: 'N9j6D5sdqwM'
            },
            { 
                title: 'Knowledge Representation',
                duration: '55 min',
                videoId: 'uW0TpAH5OgI'
            }
        ]
    },
    'deep-learning': {
        title: 'Deep Learning',
        chapters: [
            { 
                title: 'Neural Networks Fundamentals',
                duration: '70 min',
                videoId: 'aircAruvnKk'
            },
            { 
                title: 'CNN Architecture',
                duration: '65 min',
                videoId: 'FmpDIaiMIeA'
            },
            { 
                title: 'RNN and LSTM',
                duration: '75 min',
                videoId: 'SEnXr6v2L-U'
            }
        ]
    },
    'nlp': {
        title: 'Natural Language Processing',
        chapters: [
            { 
                title: 'Text Processing Basics',
                duration: '50 min',
                videoId: 'FLZvOKSCkxY'
            },
            { 
                title: 'Sentiment Analysis',
                duration: '60 min',
                videoId: 'AJVP96tAWxw'
            },
            { 
                title: 'Advanced Language Models',
                duration: '80 min',
                videoId: 'SZorAJ4I-sA'
            }
        ]
    }
};

// Handle course enrollment
function handleEnrollment(courseId) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (!isLoggedIn) {
        // Redirect to login page with return URL
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `login.html?return=${returnUrl}`;
        return;
    }

    // Save course progress in localStorage
    const userCourses = JSON.parse(localStorage.getItem('userCourses') || '{}');
    if (!userCourses[courseId]) {
        userCourses[courseId] = {
            enrolled: true,
            progress: 0,
            startDate: new Date().toISOString()
        };
        localStorage.setItem('userCourses', JSON.stringify(userCourses));
    }

    // Show course content modal
    showCourseModal(courseId);
}

// Show course content in a modal
function showCourseModal(courseId) {
    const course = courseData[courseId];
    if (!course) return;

    // Create modal HTML
    const modal = document.createElement('div');
    modal.className = 'course-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${course.title}</h2>
                <button class="close-btn">&times;</button>
            </div>
            <div class="modal-body">
                <div id="video-container" style="display: none;">
                    <div class="video-wrapper">
                        <iframe id="youtube-player" 
                            width="100%" 
                            height="400" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <button class="back-to-chapters">← Back to Chapters</button>
                </div>
                <div id="chapters-view">
                    <h3>Course Content</h3>
                    <div class="chapters-list">
                        ${course.chapters.map((chapter, index) => `
                            <div class="chapter-item">
                                <div class="chapter-info">
                                    <span class="chapter-number">Chapter ${index + 1}</span>
                                    <h4>${chapter.title}</h4>
                                    <span class="duration"><i class="far fa-clock"></i> ${chapter.duration}</span>
                                </div>
                                <button class="start-btn" data-chapter="${index}" data-video="${chapter.videoId}">
                                    <i class="fas fa-play"></i> Start
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add modal styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .course-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal-content {
            background: white;
            border-radius: 10px;
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
        }

        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            margin-bottom: 1rem;
        }

        .video-wrapper iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }

        .back-to-chapters {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            margin-bottom: 1rem;
        }

        .back-to-chapters:hover {
            background-color: #553c9a;
        }

        .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .close-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }

        .modal-body {
            padding: 1.5rem;
        }

        .chapters-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .chapter-item {
            padding: 1rem;
            border: 1px solid #eee;
            border-radius: 5px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chapter-number {
            color: var(--primary-color);
            font-size: 0.9rem;
            font-weight: 500;
        }

        .chapter-info h4 {
            margin: 0.5rem 0;
            color: var(--text-color);
        }

        .duration {
            color: #666;
            font-size: 0.9rem;
        }

        .start-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .start-btn:hover {
            background-color: #553c9a;
        }
    `;

    document.head.appendChild(modalStyles);
    document.body.appendChild(modal);

    // Handle close button
    const closeBtn = modal.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        modalStyles.remove();
    });

    // Handle chapter start
    const startButtons = modal.querySelectorAll('.start-btn');
    const videoContainer = modal.querySelector('#video-container');
    const chaptersView = modal.querySelector('#chapters-view');
    const youtubePlayer = modal.querySelector('#youtube-player');
    const backButton = modal.querySelector('.back-to-chapters');

    startButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const chapterIndex = btn.dataset.chapter;
            const videoId = btn.dataset.video;
            
            // Show video container and hide chapters
            videoContainer.style.display = 'block';
            chaptersView.style.display = 'none';
            
            // Set video source
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
            // Update progress
            updateProgress(courseId, chapterIndex);
        });
    });

    // Handle back button
    backButton.addEventListener('click', () => {
        videoContainer.style.display = 'none';
        chaptersView.style.display = 'block';
        youtubePlayer.src = '';
    });
}

// Update progress
function updateProgress(courseId, chapterIndex) {
    const userCourses = JSON.parse(localStorage.getItem('userCourses') || '{}');
    if (userCourses[courseId]) {
        userCourses[courseId].progress = Math.max(
            userCourses[courseId].progress,
            ((parseInt(chapterIndex) + 1) / courseData[courseId].chapters.length) * 100
        );
        localStorage.setItem('userCourses', JSON.stringify(userCourses));
    }
}

// Add event listeners to enroll buttons
document.addEventListener('DOMContentLoaded', () => {
    const enrollButtons = document.querySelectorAll('.enroll-btn');
    enrollButtons.forEach(button => {
        const courseCard = button.closest('.course-card');
        const courseId = courseCard.dataset.course;
        button.addEventListener('click', () => handleEnrollment(courseId));
    });
}); 