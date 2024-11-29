// Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(44, 62, 80, 0.98)';
    } else {
        nav.style.background = 'rgba(44, 62, 80, 0.95)';
    }
});

// เพิ่ม Loading Bar Effect
window.addEventListener('load', () => {
    const loadingBar = document.querySelector('.loading-bar');
    loadingBar.style.display = 'none';
});

// Parallax Effect สำหรับ Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    header.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Floating Animation for Service Cards
document.querySelectorAll('.service-card').forEach(card => {
    card.classList.add('floating');
}); 