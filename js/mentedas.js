// Function to show the selected page
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}

// Default to showing the dashboard page
showPage('dashboard');

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = document.body.classList.contains('dark-mode') 
        ? '<i class="fas fa-sun"></i>' 
        : '<i class="fas fa-moon"></i>';
});

// Notification system
const notificationIcon = document.querySelector('.notification-icon');
const notificationDropdown = document.querySelector('.notification-dropdown');

notificationIcon.addEventListener('click', () => {
    notificationDropdown.style.display = notificationDropdown.style.display === 'block' ? 'none' : 'block';
});

// Modal for creating new sessions
const sessionModal = document.getElementById('newSessionModal');
const createSessionBtn = document.getElementById('createSessionBtn');
const closeSessionModal = sessionModal.querySelector('.close');

createSessionBtn.onclick = () => sessionModal.style.display = 'block';
closeSessionModal.onclick = () => sessionModal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == sessionModal) {
        sessionModal.style.display = 'none';
    }
};

// Form submission (prevent default for demo)
document.getElementById('newSessionForm').onsubmit = (e) => {
    e.preventDefault();
    alert('Session created successfully!');
    sessionModal.style.display = 'none';
};

// Modal for sending notes
const notesModal = document.getElementById('sendNotesModal');
const sendNotesBtn = document.getElementById('sendNotesBtn');
const closeNotesModal = notesModal.querySelector('.close');

sendNotesBtn.onclick = () => notesModal.style.display = 'block';
closeNotesModal.onclick = () => notesModal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == notesModal) {
        notesModal.style.display = 'none';
    }
};

// Form submission for sending notes (prevent default for demo)
document.getElementById('sendNotesForm').onsubmit = (e) => {
    e.preventDefault();
    alert('Notes sent successfully!');
    notesModal.style.display = 'none';
};

// Enhanced Charts with Interactivity
const createEnhancedChart = (ctx, type, labels, data, label, color) => {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: color,
                borderColor: color,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${label} Over Time`
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            },
            onClick: (e, activeElements) => {
                if (activeElements.length > 0) {
                    const dataIndex = activeElements[0].index;
                    alert(`You clicked on ${label} data for ${labels[dataIndex]}: ${data[dataIndex]}`);
                }
            }
        }
    });
};

const bookingsCtx = document.getElementById('bookingsChart').getContext('2d');
const rsvpsCtx = document.getElementById('rsvpsChart').getContext('2d');

const labels = ['Jul 1', 'Jul 8', 'Jul 15', 'Jul 22', 'Jul 29', 'Aug 5', 'Today'];
const bookingsData = [65, 59, 80, 81, 56, 55, 80];
const rsvpsData = [120, 190, 300, 250, 200, 400, 390];

createEnhancedChart(bookingsCtx, 'line', labels, bookingsData, 'Bookings', '#3498db');
createEnhancedChart(rsvpsCtx, 'bar', labels, rsvpsData, 'Session RSVPs', '#e74c3c');

// Animations
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// Additional animations using Anime.js
anime({
    targets: '.stat-card',
    translateY: [50, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    easing: 'easeOutQuad',
    duration: 800
});

anime({
    targets: '.sidebar li',
    translateX: [-50, 0],
    opacity: [0, 1],
    delay: anime.stagger(50),
    easing: 'easeOutQuad',
    duration: 500
});

// Background animation
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';

const ctx = canvas.getContext('2d');
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(52, 152, 219, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 100; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});


document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationDropdown = document.querySelector('.notification-dropdown');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Toggle notification dropdown
    notificationIcon.addEventListener('click', () => {
        notificationDropdown.classList.toggle('hidden');
    });
});
