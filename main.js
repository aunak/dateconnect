// Sample data for demonstration
const sampleProfiles = [
    { id: 1, name: 'Sarah Parker', age: 28, gender: 'female', bio: 'Love hiking and photography. Always up for a new adventure!' },
    { id: 2, name: 'John Davis', age: 32, gender: 'male', bio: 'Foodie and travel enthusiast. Looking for someone to explore new cuisines with.' },
    { id: 3, name: 'Emma Wilson', age: 26, gender: 'female', bio: 'Book lover and coffee addict. Let\'s discuss our favorite novels over a cup of coffee!' },
    { id: 4, name: 'Michael Chen', age: 30, gender: 'male', bio: 'Tech entrepreneur by day, musician by night. Seeking someone who appreciates both logic and creativity.' },
    { id: 5, name: 'Sofia Rodriguez', age: 29, gender: 'female', bio: 'Yoga instructor and wellness advocate. Looking for a partner in crime and meditation!' }
];

// Store liked profiles
let likedProfiles = new Set();

// Initialize the application
function init() {
    displayProfiles();
    loadUserProfile();
    addAnimations();
}

// Add smooth animations
function addAnimations() {
    document.querySelectorAll('.profile-card').forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';
    });
}

// Show/hide sections with animation
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
        section.style.opacity = '0';
    });
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
    setTimeout(() => {
        activeSection.style.opacity = '1';
    }, 50);
}

// Display profiles in the matches section
function displayProfiles() {
    const container = document.getElementById('profiles-container');
    container.innerHTML = '';

    sampleProfiles.forEach(profile => {
        if (!likedProfiles.has(profile.id)) {
            const card = document.createElement('div');
            card.className = 'profile-card';
            card.innerHTML = `
                <h3>${profile.name}, ${profile.age}</h3>
                <p>${profile.bio}</p>
                <button class="like-btn" onclick="likeProfile(${profile.id})">
                    ❤️ Like Profile
                </button>
            `;
            container.appendChild(card);
        }
    });
    addAnimations();
}

// Handle profile likes with animation
function likeProfile(profileId) {
    const card = event.target.closest('.profile-card');
    card.style.transform = 'scale(1.1)';
    card.style.opacity = '0';
    setTimeout(() => {
        likedProfiles.add(profileId);
        displayProfiles();
    }, 300);
    showNotification('Profile liked! If they like you back, it\'s a match! 💕');
}

// Show custom notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Save user profile
function saveProfile(event) {
    event.preventDefault();
    const profile = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        bio: document.getElementById('bio').value
    };
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
    showNotification('Profile saved successfully! 🎉');
    showSection('matches');
}

// Load user profile from localStorage
function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        document.getElementById('name').value = profile.name;
        document.getElementById('age').value = profile.age;
        document.getElementById('gender').value = profile.gender;
        document.getElementById('bio').value = profile.bio;
    }
}

// Add custom notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(255, 75, 110, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease forwards;
        z-index: 1000;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize the app when the page loads
window.addEventListener('load', init);