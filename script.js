// ===== NAVIGATION SCROLL EFFECT =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    fadeInObserver.observe(element);
});

// ===== HERO CARD PARALLAX EFFECT =====
const heroCard = document.getElementById('hero-card');

if (heroCard) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        heroCard.style.transform = `perspective(1000px) rotateY(${xPos}deg) rotateX(${-yPos}deg) translateZ(10px)`;
    });
    
    // Reset transform when mouse leaves window
    document.addEventListener('mouseleave', () => {
        heroCard.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
}

// ===== FORM SUBMISSION HANDLER =====
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // In production, send this to your backend
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you! We\'ll be in touch within 24 hours to schedule your free discovery call.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== DYNAMIC GRADIENT ANIMATION =====
const heroBackground = document.querySelector('.hero-background');

if (heroBackground) {
    let hue = 0;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        heroBackground.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
}

// ===== PERFORMANCE OPTIMIZATION: DEBOUNCED RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any layout-dependent elements here if needed
        console.log('Window resized');
    }, 250);
});

// ===== STATS COUNTER ANIMATION =====
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const startTime = performance.now();
    
    const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(progress * target);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    };
    
    requestAnimationFrame(updateCounter);
};

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.textContent);
            
            if (!isNaN(targetValue)) {
                animateCounter(statNumber, targetValue);
            }
            
            statObserver.unobserve(statNumber);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ===== ACCESSIBILITY: KEYBOARD NAVIGATION =====
document.querySelectorAll('.btn, .nav-link').forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            element.click();
        }
    });
});

// ===== LOG INITIALIZATION =====
console.log('POM Health website initialized ✨');
console.log('Animations: ✓');
console.log('Scroll effects: ✓');
console.log('Form handlers: ✓');
console.log('Accessibility: ✓');