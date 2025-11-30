// Sample tutor data (replace with API call in production)
const tutors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        title: "AI Research Scientist",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        specialties: ["Machine Learning", "Deep Learning", "Computer Vision"],
        rating: 4.9,
        students: 1200,
        experience: "8 years"
    },
    {
        id: 2,
        name: "Prof. Michael Chen",
        title: "Data Science Expert",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        specialties: ["Data Analysis", "Python", "Statistical Modeling"],
        rating: 4.8,
        students: 950,
        experience: "6 years"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        title: "NLP Specialist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        specialties: ["Natural Language Processing", "Text Mining", "Chatbots"],
        rating: 4.9,
        students: 800,
        experience: "5 years"
    }
];

// DOM Elements
const searchInput = document.querySelector('.search-container input');
const specialtyFilter = document.querySelector('select[name="specialty"]');
const experienceFilter = document.querySelector('select[name="experience"]');
const tutorsGrid = document.querySelector('.tutors-grid');

// Initialize filters
function initializeFilters() {
    // Get unique specialties
    const specialties = [...new Set(tutors.flatMap(tutor => tutor.specialties))];
    specialtyFilter.innerHTML = `
        <option value="">All Specialties</option>
        ${specialties.map(specialty => `
            <option value="${specialty}">${specialty}</option>
        `).join('')}
    `;

    // Get unique experience levels
    const experiences = [...new Set(tutors.map(tutor => tutor.experience))];
    experienceFilter.innerHTML = `
        <option value="">All Experience Levels</option>
        ${experiences.map(exp => `
            <option value="${exp}">${exp}</option>
        `).join('')}
    `;
}

// Filter tutors based on search and filters
function filterTutors() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedSpecialty = specialtyFilter.value;
    const selectedExperience = experienceFilter.value;

    return tutors.filter(tutor => {
        const matchesSearch = tutor.name.toLowerCase().includes(searchTerm) ||
                            tutor.title.toLowerCase().includes(searchTerm) ||
                            tutor.specialties.some(s => s.toLowerCase().includes(searchTerm));
        
        const matchesSpecialty = !selectedSpecialty || tutor.specialties.includes(selectedSpecialty);
        const matchesExperience = !selectedExperience || tutor.experience === selectedExperience;

        return matchesSearch && matchesSpecialty && matchesExperience;
    });
}

// Create tutor card HTML
function createTutorCard(tutor) {
    return `
        <div class="tutor-card">
            <div class="tutor-image-container">
                <img src="${tutor.image}" alt="${tutor.name}" class="tutor-image">
            </div>
            <div class="tutor-info">
                <h3 class="tutor-name">${tutor.name}</h3>
                <p class="tutor-title">${tutor.title}</p>
                <div class="tutor-specialties">
                    ${tutor.specialties.map(specialty => `
                        <span class="specialty-tag">${specialty}</span>
                    `).join('')}
                </div>
                <div class="tutor-stats">
                    <span><i class="fas fa-star"></i> ${tutor.rating}</span>
                    <span><i class="fas fa-users"></i> ${tutor.students}</span>
                    <span><i class="fas fa-clock"></i> ${tutor.experience}</span>
                </div>
                <div class="tutor-actions">
                    <button class="btn btn-primary" onclick="viewProfile(${tutor.id})">View Profile</button>
                    <button class="btn btn-outline" onclick="contactTutor(${tutor.id})">Contact</button>
                </div>
            </div>
        </div>
    `;
}

// Update tutors grid
function updateTutorsGrid() {
    const filteredTutors = filterTutors();
    tutorsGrid.innerHTML = filteredTutors.length ? 
        filteredTutors.map(createTutorCard).join('') :
        '<div class="no-results">No tutors found matching your criteria</div>';
}

// Event listeners
searchInput.addEventListener('input', updateTutorsGrid);
specialtyFilter.addEventListener('change', updateTutorsGrid);
experienceFilter.addEventListener('change', updateTutorsGrid);

// Profile and contact handlers
function viewProfile(tutorId) {
    // Implement profile view logic
    console.log(`Viewing profile for tutor ${tutorId}`);
}

function contactTutor(tutorId) {
    // Implement contact logic
    console.log(`Contacting tutor ${tutorId}`);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    updateTutorsGrid();
}); 