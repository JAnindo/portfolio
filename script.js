// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Theme toggle
document.querySelector('.theme-toggle').addEventListener('click', function() {
    this.textContent = this.textContent === '🌙' ? '☀️' : '🌙';
});

// Menu item click animation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// Parallax effect for blue glow
document.addEventListener('mousemove', (e) => {
    const glow = document.querySelector('.blue-glow');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    glow.style.transform = `translate(${x * 100}px, ${y * 100}px)`;
});
const themeBtn = document.getElementById('theme-switch');
const body = document.body;

themeBtn.addEventListener('click', () => {
    // 1. Toggle the light-mode class on the body
    body.classList.toggle('light-mode');
    
    // 2. Change the icon based on the current mode
    if (body.classList.contains('light-mode')) {
        themeBtn.textContent = '☀️'; // Sun icon for light mode
    } else {
        themeBtn.textContent = '🌙'; // Moon icon for dark mode
    }
});
const aboutBtn = document.getElementById('about-btn');
const homeBtn = document.getElementById('home-btn');
const homeSection = document.getElementById('home-content');
const aboutSection = document.getElementById('about-content');

// Function to show About and hide Home
aboutBtn.addEventListener('click', () => {
    homeSection.style.display = 'none';
    aboutSection.style.display = 'block';
});

// Function to show Home and hide About
homeBtn.addEventListener('click', () => {
    homeSection.style.display = 'block';
    aboutSection.style.display = 'none';
});