// ===================================
// Language Switching Functionality
// ===================================
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('portfolio-lang') || 'tr';
        this.init();
    }

    init() {
        this.setLanguage(this.currentLang);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const langToggle = document.getElementById('langToggle');
        const langOptions = langToggle.querySelectorAll('.lang-option');

        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }

    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('portfolio-lang', lang);

        // Update active state in toggle
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });

        // Update all elements with data-tr and data-en attributes
        document.querySelectorAll('[data-tr][data-en]').forEach(element => {
            const text = element.dataset[lang];
            if (text) {
                element.textContent = text;
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
}

// ===================================
// Theme Toggle Functionality
// ===================================
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.setupEventListeners();
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('portfolio-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}

// ===================================
// Mobile Navigation
// ===================================
class MobileNav {
    constructor() {
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.mobileToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        this.navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.mobileToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
    }

    closeMenu() {
        this.mobileToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
    }
}

// ===================================
// Smooth Scroll Navigation
// ===================================
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.observeElements();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, options);
    }

    observeElements() {
        // Add scroll-animate class to elements
        const animateElements = document.querySelectorAll(
            '.project-card, .certificate-card, .skill-category, .stat-card'
        );

        animateElements.forEach(element => {
            element.classList.add('scroll-animate');
            this.observer.observe(element);
        });
    }
}

// ===================================
// Navbar Scroll Effect
// ===================================
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                this.navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = 'rgba(255, 255, 255, 0.05)';
                this.navbar.style.boxShadow = 'none';
            }
        });
    }
}

// ===================================
// Contact Form Handler
// ===================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    async handleSubmit() {
        // -------------------------------------------------------
        // Web3Forms Access Key — get yours FREE at web3forms.com
        // Enter mahdishahrouei@gmail.com there and paste the key:
        const WEB3FORMS_ACCESS_KEY = '4d6ed46f-beff-4bd0-bdc7-08cfd7dd11e8';
        // -------------------------------------------------------

        const submitBtn = this.form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;

        // Loading state
        submitBtn.disabled = true;
        submitBtn.textContent = '⏳ Gönderiliyor...';

        const formData = new FormData(this.form);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('subject', `Portfolyo İletişim: ${formData.get('subject') || 'Yeni Mesaj'}`);
        formData.append('from_name', formData.get('name') || 'Portfolyo Ziyaretçisi');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();

            if (result.success) {
                this.showMessage('success');
                this.form.reset();
            } else {
                console.error('Web3Forms error:', result);
                this.showMessage('error');
            }
        } catch (err) {
            console.error('Network error:', err);
            this.showMessage('error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    }

    showMessage(type) {
        const messages = {
            success: {
                tr: 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.',
                en: 'Your message has been sent successfully! I will get back to you soon.'
            },
            error: {
                tr: 'Bir hata oluştu. Lütfen tekrar deneyin.',
                en: 'An error occurred. Please try again.'
            }
        };

        const lang = localStorage.getItem('portfolio-lang') || 'tr';
        const message = messages[type][lang];

        // Create and show message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(messageEl);

        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// ===================================
// Skill Progress Animation
// ===================================
class SkillProgressAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-category').forEach(category => {
            observer.observe(category);
        });
    }
}

// ===================================
// Typing Effect for Hero Section
// ===================================
class TypingEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        if (this.element && this.texts.length > 0) {
            this.type();
        }
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.speed;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ===================================
// Particle Background (Optional Enhancement)
// ===================================
class ParticleBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(139, 92, 246, 0.5)';
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Projects Carousel
// ===================================
class ProjectsCarousel {
    constructor() {
        this.grid = document.getElementById('projectsGrid');
        this.prevBtn = document.getElementById('carouselPrev');
        this.nextBtn = document.getElementById('carouselNext');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.cards = this.grid ? this.grid.querySelectorAll('.project-card') : [];
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.scrollStart = 0;
        if (this.grid) this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.scrollTo(this.currentIndex - 1));
        this.nextBtn.addEventListener('click', () => this.scrollTo(this.currentIndex + 1));

        // Dot clicks
        this.dots.forEach(dot => {
            dot.addEventListener('click', () => {
                this.scrollTo(parseInt(dot.dataset.index));
            });
        });

        // Update dots on scroll
        this.grid.addEventListener('scroll', () => this.syncDots(), { passive: true });

        // Mouse drag-to-scroll
        this.grid.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - this.grid.offsetLeft;
            this.scrollStart = this.grid.scrollLeft;
            this.grid.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.grid.offsetLeft;
            this.grid.scrollLeft = this.scrollStart - (x - this.startX);
        });
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.grid.style.cursor = 'grab';
        });

        // Keyboard navigation when section is focused
        document.addEventListener('keydown', (e) => {
            const section = document.querySelector('#projects');
            const rect = section ? section.getBoundingClientRect() : null;
            if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === 'ArrowRight') this.scrollTo(this.currentIndex + 1);
                if (e.key === 'ArrowLeft') this.scrollTo(this.currentIndex - 1);
            }
        });
    }

    scrollTo(index) {
        const total = this.cards.length;
        if (total === 0) return;
        this.currentIndex = Math.max(0, Math.min(index, total - 1));
        this.cards[this.currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        this.updateDots();
    }

    syncDots() {
        if (this.cards.length === 0) return;
        const gridLeft = this.grid.getBoundingClientRect().left;
        let closest = 0;
        let minDist = Infinity;
        this.cards.forEach((card, i) => {
            const dist = Math.abs(card.getBoundingClientRect().left - gridLeft);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        this.currentIndex = closest;
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }
}

// ===================================
// Certificates Carousel
// ===================================
class CertsCarousel {
    constructor() {
        this.grid = document.getElementById('certsGrid');
        this.prevBtn = document.getElementById('certsPrev');
        this.nextBtn = document.getElementById('certsNext');
        this.dots = document.querySelectorAll('#certsDots .carousel-dot');
        this.cards = this.grid ? this.grid.querySelectorAll('.certificate-card') : [];
        this.currentIndex = 0;
        this.isDragging = false;
        this.startX = 0;
        this.scrollStart = 0;
        if (this.grid) this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.scrollTo(this.currentIndex - 1));
        this.nextBtn.addEventListener('click', () => this.scrollTo(this.currentIndex + 1));

        this.dots.forEach(dot => {
            dot.addEventListener('click', () => this.scrollTo(parseInt(dot.dataset.index)));
        });

        this.grid.addEventListener('scroll', () => this.syncDots(), { passive: true });

        this.grid.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.startX = e.pageX - this.grid.offsetLeft;
            this.scrollStart = this.grid.scrollLeft;
            this.grid.style.cursor = 'grabbing';
        });
        document.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.grid.offsetLeft;
            this.grid.scrollLeft = this.scrollStart - (x - this.startX);
        });
        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.grid.style.cursor = 'grab';
        });
    }

    scrollTo(index) {
        const total = this.cards.length;
        if (total === 0) return;
        this.currentIndex = Math.max(0, Math.min(index, total - 1));
        this.cards[this.currentIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        this.updateDots();
    }

    syncDots() {
        if (this.cards.length === 0) return;
        const gridLeft = this.grid.getBoundingClientRect().left;
        let closest = 0, minDist = Infinity;
        this.cards.forEach((card, i) => {
            const dist = Math.abs(card.getBoundingClientRect().left - gridLeft);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        this.currentIndex = closest;
        this.updateDots();
    }

    updateDots() {
        this.dots.forEach((dot, i) => dot.classList.toggle('active', i === this.currentIndex));
    }
}

// ===================================
// Initialize All Components
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    new LanguageManager();
    new ThemeManager();
    new MobileNav();
    new SmoothScroll();
    new ScrollAnimations();
    new NavbarScroll();
    new ContactForm();
    new SkillProgressAnimation();
    new ProjectsCarousel();
    new CertsCarousel();

    // Optional: Add typing effect to hero subtitle
    // Uncomment and customize if you want this effect
    /*
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const texts = [
            'Yapay Zeka & Bilgisayar Mühendisliği Öğrencisi',
            'AI & Computer Engineering Student'
        ];
        new TypingEffect(heroSubtitle, texts, 100);
    }
    */

    // Add CSS for message animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Log initialization
    console.log('Portfolio website initialized successfully! 🚀');
});

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LanguageManager,
        ThemeManager,
        MobileNav,
        SmoothScroll,
        ScrollAnimations,
        ContactForm
    };
}
