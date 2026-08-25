// ===================================
// Abu Assem Crane Rental - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // === Preloader ===
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1800);
    });

    // Fallback: hide preloader after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // === Navigation ===
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const allNavLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    allNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // === Hero Background Slider ===
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, 6000);

    // === Hero Particles ===
    const particlesContainer = document.getElementById('heroParticles');
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // === Counter Animation ===
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        const heroSection = document.getElementById('hero');
        const rect = heroSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load

    // === Scroll Reveal ===
    function addRevealClasses() {
        const revealElements = document.querySelectorAll(
            '.service-card, .fleet-card, .gallery-item, .about-feature, .rental-card, .contact-method, .section-header'
        );
        revealElements.forEach(el => {
            el.classList.add('reveal');
        });
    }
    addRevealClasses();

    function handleReveal() {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight - 50) {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index % 4 * 100); // Stagger effect
            }
        });
    }

    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Check on load

    // === Gallery Lightbox ===
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        galleryImages.push(img.src);

        item.addEventListener('click', () => {
            currentImageIndex = index;
            lightboxImg.src = galleryImages[currentImageIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
    });

    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex];
        }
        if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            lightboxImg.src = galleryImages[currentImageIndex];
        }
    });

    // === Contact Form - WhatsApp ===
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service');
        const serviceText = service.options[service.selectedIndex].text;
        const rentalType = document.getElementById('rental-type');
        const rentalTypeText = rentalType.options[rentalType.selectedIndex]?.text || '';
        const message = document.getElementById('message').value;

        let whatsappMsg = `مرحباً، أنا ${name}%0A`;
        whatsappMsg += `رقم الجوال: ${phone}%0A`;
        whatsappMsg += `الخدمة المطلوبة: ${serviceText}%0A`;
        if (rentalTypeText && rentalTypeText !== 'اختر نوع التأجير') {
            whatsappMsg += `نوع التأجير: ${rentalTypeText}%0A`;
        }
        if (message) {
            whatsappMsg += `تفاصيل إضافية: ${message}`;
        }

        window.open(`https://wa.me/966532309491?text=${whatsappMsg}`, '_blank');
    });

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const position = target.offsetTop - offset;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === Service Cards hover sound effect (visual only) ===
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // === Close mobile nav when clicking outside ===
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});
