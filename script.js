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
                // Skip elements that contain child elements (e.g. buttons with SVG icons)
                if (element.children.length === 0) {
                    element.textContent = text;
                }
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
            const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
            if (window.scrollY > 50) {
                this.navbar.style.background = isDark
                    ? 'rgba(10, 10, 15, 0.97)'
                    : 'rgba(255, 255, 255, 0.97)';
                this.navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
            } else {
                this.navbar.style.background = '';
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

        // Mouse drag-to-scroll (desktop)
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

        // Touch drag-to-scroll (mobile)
        this.grid.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].pageX - this.grid.offsetLeft;
            this.scrollStart = this.grid.scrollLeft;
        }, { passive: true });
        this.grid.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const x = e.touches[0].pageX - this.grid.offsetLeft;
            this.grid.scrollLeft = this.scrollStart - (x - this.startX);
        }, { passive: true });
        this.grid.addEventListener('touchend', () => {
            this.isDragging = false;
            this.syncDots();
        }, { passive: true });

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

        // Mouse drag (desktop)
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

        // Touch drag (mobile)
        this.grid.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].pageX - this.grid.offsetLeft;
            this.scrollStart = this.grid.scrollLeft;
        }, { passive: true });
        this.grid.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const x = e.touches[0].pageX - this.grid.offsetLeft;
            this.grid.scrollLeft = this.scrollStart - (x - this.startX);
        }, { passive: true });
        this.grid.addEventListener('touchend', () => {
            this.isDragging = false;
            this.syncDots();
        }, { passive: true });
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

// ===================================
// Certificate Lightbox Modal
// ===================================
function openCertModal(imgSrc, title) {
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('certModalImg');
    const modalTitle = document.getElementById('certModalTitle');
    if (!modal || !modalImg || !modalTitle) return;

    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalTitle.textContent = title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close on Escape key
    document.addEventListener('keydown', _certModalKeyHandler);
}

function closeCertModal() {
    const modal = document.getElementById('certModal');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', _certModalKeyHandler);

    // Clear src after animation ends
    setTimeout(() => {
        const modalImg = document.getElementById('certModalImg');
        if (modalImg) modalImg.src = '';
    }, 350);
}

function _certModalKeyHandler(e) {
    if (e.key === 'Escape') closeCertModal();
}

// ===================================
// Video Lightbox Modal
// ===================================
function openVideoModal(videoSrc, title) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    const titleEl = document.getElementById('videoModalTitle');
    if (!modal || !player || !titleEl) return;

    player.src = videoSrc;
    titleEl.textContent = title;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Try to play
    player.load();
    player.play().catch(() => { });

    document.addEventListener('keydown', _videoModalKeyHandler);
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoModalPlayer');
    if (!modal) return;

    if (player) {
        player.pause();
        player.currentTime = 0;
    }

    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', _videoModalKeyHandler);

    // Clear src after animation ends
    setTimeout(() => {
        if (player) player.src = '';
    }, 350);
}

function _videoModalKeyHandler(e) {
    if (e.key === 'Escape') closeVideoModal();
}

// =============================================
// AI Chat Widget — Gemini (via local proxy)
// =============================================
// API anahtarı server.py dosyasında güvenli şekilde saklanır.
const AI_SYSTEM_PROMPT = `You are a professional AI assistant representing Mahdi Shahrouei's portfolio website. Your ONLY role is to answer questions about Mahdi Shahrouei professionally, accurately, and helpfully.

IMPORTANT RULES:
- Always detect and respond in the same language the user writes in (Turkish or English).
- Keep responses concise, professional, and friendly — like a polished recruiter or the person himself.
- If a question is completely unrelated to Mahdi, politely redirect: "I'm here to help you learn about Mahdi Shahrouei. Feel free to ask anything about his background, projects, or skills!"
- Never fabricate information not listed below.
- Format answers clearly; use bullet points when listing multiple items.

=== ABOUT MAHDI SHAHROUEI ===
Full Name: Mahdi Shahrouei
Nationality: Iranian, currently in Turkey
Education: Computer Engineering — Sakarya University (started 2022)
Core Focus: Artificial Intelligence, Data Science, Machine Learning, Deep Learning, AI Agents

Personal Summary:
Mahdi sees Artificial Intelligence not merely as an academic discipline, but as a strategic tool for solving real-world problems. His goal is to build scalable, value-driven solutions using AI and intelligent agent systems. He also has hands-on experience in sponsorship coordination, e-commerce, and international trade — giving him a broad analytical and business perspective.

Languages: Turkish, English, Persian (Farsi)

=== PROJECTS (7 Projects) ===
1. IntraDia — AI-Powered Foreign Trade Platform
   Tools: Python, TensorFlow, LangFlow, Pandas
   Description: An AI-driven export decision support system that speeds up costly foreign trade processes. Includes meeting summarization, market analysis, and target market identification using automation and data-driven methods.

2. Meeting AI Agent — Audio Summarization & Reporting Agent
   Tools: AI Agents, Langflow, n8n
   Description: Automatically summarizes, stores, and reports audio recordings from business meetings and trade fairs.

3. Big Data Real-Time Salary Analytics Pipeline
   Tools: Apache Kafka, Spark Streaming, Flask, MySQL
   GitHub: https://github.com/mehdi8s/Big-Data-Real-Time-Salary-Analytics-Pipeline
   Description: A real-time pipeline processing 20,000+ salary records. Results visualized via a Flask dashboard.

4. Flight Ticket Price Prediction
   Tools: XGBoost, Random Forest, Scikit-learn, Optuna, SHAP, LIME
   GitHub: https://github.com/mehdi8s/Airline-Flight-Price-Prediction-Machine-learning-Project-
   Description: ML models trained on 300,000 flight records to predict ticket prices, with explainability via SHAP and LIME.

5. IoT Smart Home Automation System
   Tools: MediaPipe, OpenCV, ESP8266 (NodeMCU), Firebase Realtime Database
   Description: Detects hand gestures using computer vision and controls home devices via ESP8266 microcontrollers with Firebase for real-time monitoring.

6. AI-Powered Hairstyle & Color Recommendation Web App
   Tools: TensorFlow, PyTorch, ASP.NET Core 8 MVC, Microsoft SQL Server
   GitHub: https://github.com/mehdi8s/AI-Powered-Hairstyle-and-Color-Recommendation-Web-Application
   Description: Analyzes user-uploaded photos with AI to recommend hairstyles and colors based on facial features.

7. Hospital Database Management System
   Tools: PostgreSQL, Relational Database Design
   GitHub: https://github.com/mehdi8s/hospital-database-management-system-project
   Description: Relational DB for managing hospital staff, salaries, shifts, and specializations. Includes stored procedures, triggers, and functions.

=== TECHNICAL SKILLS ===
Programming Languages: Python (90%), JavaScript (75%), Java (70%)
AI & ML: TensorFlow (85%), PyTorch (80%), Scikit-learn (85%)
Tools & Frameworks: Git (85%), Docker (70%), SQL (75%)
Other: LangFlow, n8n, Apache Kafka, Spark Streaming, ASP.NET Core MVC, Firebase, MediaPipe, OpenCV, Flask

=== CERTIFICATES ===
- CS50X: Introduction to Computer Science — Harvard University (Sep 2023)
- Python for Data Science, AI & Development — Coursera / IBM (Dec 2024)
- Machine Learning — Digital Transformation Office of Turkey (May 2024)
- Artificial Intelligence From A to Z — Emir Kabir University of Technology (Aug 2024)
- Applied Foreign Trade Training — Istanbul Commerce University / Genç MÜSİAD (Feb 2025)
- English Pre-Intermediate Certificate — İSMEK (July 2023)
- Deep Learning for Computer Vision — Digital Transformation Office of Turkey (Aug 2024)
- Tools for Data Science — Coursera / IBM (Jun 2024)
- Data Science Methodology — Coursera / IBM (Jul 2024)
- What is Data Science? — Coursera / IBM (Apr 2024)
- EF SET English Certificate B2 — EF SET (Jun 2024)
- Export Processes and Government Support Training — Ministry of Commerce of Turkey (Apr 2024)

=== CONTACT INFORMATION ===
Email: mahdishahrouei@gmail.com
LinkedIn: https://www.linkedin.com/in/mahdi-shahrouei/
GitHub: https://github.com/mehdi8s
Phone / WhatsApp: +90 552 479 87 90

=== CAREER GOAL ===
Mahdi is actively seeking opportunities in Artificial Intelligence, Data Science, and Software Engineering. He is motivated by building intelligent systems that integrate technology with real business processes and create measurable value.`;

let aiChatHistory = [];
let aiChatIsOpen = false;
let aiChatInitialized = false;

function toggleAiChat() {
    const widget = document.getElementById('aiChatWidget');
    const chatWindow = document.getElementById('aiChatWindow');
    const navBtn = document.getElementById('aiChatToggle');
    aiChatIsOpen = !aiChatIsOpen;
    widget.classList.toggle('open', aiChatIsOpen);
    if (navBtn) navBtn.classList.toggle('open', aiChatIsOpen);
    chatWindow.setAttribute('aria-hidden', String(!aiChatIsOpen));

    if (aiChatIsOpen && !aiChatInitialized) {
        aiChatInitialized = true;
        _aiAddWelcomeMessage();
    }
    if (aiChatIsOpen) {
        setTimeout(() => document.getElementById('aiChatInput')?.focus(), 350);
    }
}

function _aiAddWelcomeMessage() {
    const lang = localStorage.getItem('portfolio-lang') || 'tr';
    const msg = lang === 'en'
        ? '👋 Hi! I\'m Mahdi\'s AI assistant. Ask me anything about his background, projects, skills, or how to get in touch!'
        : '👋 Merhaba! Ben Mahdi\'nin AI asistanıyım. Eğitimi, projeleri, yetenekleri veya iletişim bilgileri hakkında her şeyi sorabilirsiniz!';
    _aiRenderMessage('bot', msg);
}

function sendAiSuggestion(btn) {
    const lang = localStorage.getItem('portfolio-lang') || 'tr';
    const text = (lang === 'en' ? btn.dataset.en : btn.dataset.tr) || btn.textContent.trim();
    const suggestions = document.getElementById('aiSuggestions');
    if (suggestions) suggestions.style.display = 'none';
    _processAiMessage(text);
}

function sendAiMessage() {
    const input = document.getElementById('aiChatInput');
    const text = input?.value.trim();
    if (!text) return;
    input.value = '';
    const suggestions = document.getElementById('aiSuggestions');
    if (suggestions) suggestions.style.display = 'none';
    _processAiMessage(text);
}

async function _processAiMessage(userText) {
    _aiRenderMessage('user', userText);
    aiChatHistory.push({ role: 'user', content: userText });
    const typingId = _aiShowTyping();
    _aiSetInputEnabled(false);

    try {

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: AI_SYSTEM_PROMPT },
                    ...aiChatHistory
                ],
                temperature: 0.75,
                max_tokens: 512
            })
        });

        if (!response.ok) {
            const errJson = await response.json().catch(() => ({}));
            throw new Error(errJson?.error?.message || `HTTP ${response.status}`);
        }

        const data = await response.json();
        const replyText = data?.choices?.[0]?.message?.content || '';
        if (!replyText) throw new Error('EMPTY');

        aiChatHistory.push({ role: 'assistant', content: replyText });
        _aiRemoveTyping(typingId);
        _aiRenderMessage('bot', replyText);

    } catch (err) {
        _aiRemoveTyping(typingId);
        const lang = localStorage.getItem('portfolio-lang') || 'tr';
        let errorMsg;
        if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
            console.error('Gemini proxy fetch error:', err);
            errorMsg = lang === 'en'
                ? '⚠️ Network error. Make sure the local server (server.py) is running.'
                : '⚠️ Ağ hatası. Lütfen yerel sunucunun (server.py) çalıştığından emin olun.';
        } else if (err.message && (err.message.includes('quota') || err.message.includes('rate limit') || err.message.includes('429'))) {
            console.warn('Gemini rate limit / quota (429):', err.message);
            errorMsg = lang === 'en'
                ? '⏳ The AI service is temporarily rate-limited. Please wait a moment and try again.'
                : '⏳ AI servisi geçici olarak kota limitine ulaştı. Lütfen biraz bekleyip tekrar deneyin.';
        } else {
            console.error('Gemini proxy error:', err);
            errorMsg = lang === 'en'
                ? 'Sorry, I couldn\'t connect to the AI service right now. Please try again shortly.'
                : 'Üzgünüm, AI servisine şu an bağlanılamadı. Lütfen biraz sonra tekrar deneyin.';
        }
        aiChatHistory.pop();
        _aiRenderMessage('bot', errorMsg);
    } finally {
        _aiSetInputEnabled(true);
        document.getElementById('aiChatInput')?.focus();
    }
}

function _aiRenderMessage(role, text) {
    const container = document.getElementById('aiChatMessages');
    if (!container) return;

    const msgEl = document.createElement('div');
    msgEl.className = `ai-msg ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'ai-msg-avatar';
    avatar.textContent = role === 'bot' ? 'AI' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'ai-msg-bubble';
    bubble.innerHTML = text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    msgEl.appendChild(avatar);
    msgEl.appendChild(bubble);
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
}

function _aiShowTyping() {
    const container = document.getElementById('aiChatMessages');
    if (!container) return null;
    const id = 'typing-' + Date.now();
    const el = document.createElement('div');
    el.id = id;
    el.className = 'ai-msg bot';
    el.innerHTML = `<div class="ai-msg-avatar">AI</div><div class="ai-msg-bubble" style="padding:8px 14px;"><div class="ai-typing-indicator"><span></span><span></span><span></span></div></div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
    return id;
}

function _aiRemoveTyping(id) {
    if (id) document.getElementById(id)?.remove();
}

function _aiSetInputEnabled(enabled) {
    const input = document.getElementById('aiChatInput');
    const btn = document.getElementById('aiSendBtn');
    if (input) input.disabled = !enabled;
    if (btn) btn.disabled = !enabled;
}

