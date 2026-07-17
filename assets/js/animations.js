// ============================================
// Delux Paint Online — Animation Engine
// Scroll reveals, particles, counters, confetti
// ============================================

(function () {
    'use strict';

    // ---- Theme Management (Dark / Light) ----
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    initTheme();

    // ---- Scroll Reveal (Intersection Observer) ----
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ---- Stagger Children ----
    function staggerChildren(parentSelector, childSelector, baseDelay) {
        const parents = document.querySelectorAll(parentSelector);
        parents.forEach(parent => {
            const children = parent.querySelectorAll(childSelector);
            children.forEach((child, i) => {
                child.style.transitionDelay = `${baseDelay + i * 0.07}s`;
            });
        });
    }

    // ---- Number Counter Animation ----
    function animateCounters() {
        const counters = document.querySelectorAll('[data-counter]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-counter'), 10);
                    const suffix = el.getAttribute('data-suffix') || '';
                    const prefix = el.getAttribute('data-prefix') || '';
                    const duration = 2000;
                    const startTime = performance.now();

                    function update(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out quad
                        const eased = 1 - (1 - progress) * (1 - progress);
                        const current = Math.floor(eased * target);
                        el.textContent = prefix + current.toLocaleString() + suffix;
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        } else {
                            el.textContent = prefix + target.toLocaleString() + suffix;
                        }
                    }

                    requestAnimationFrame(update);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    // ---- Particle Background ----
    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let width, height;
        let animFrame;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1
            };
        }

        function init() {
            resize();
            particles = [];
            const count = Math.min(Math.floor(width * height / 18000), 80);
            for (let i = 0; i < count; i++) {
                particles.push(createParticle());
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
                ctx.fill();
            });

            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animFrame = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', () => {
            resize();
        });

        init();
        draw();
    }

    // ---- Navbar Scroll Effect ----
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // ---- Smooth Scroll ----
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }

    // ---- Toast Notification System ----
    function showToast(message, icon, duration) {
        icon = icon || 'bi-check-circle-fill';
        duration = duration || 3000;

        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `<i class="bi ${icon}"></i><span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('toast-out');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // ---- Confetti Effect ----
    function launchConfetti() {
        const container = document.createElement('div');
        container.className = 'confetti-container';
        document.body.appendChild(container);

        const colors = ['#6366f1', '#f59e0b', '#22d3ee', '#ec4899', '#10b981', '#a78bfa'];

        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = (Math.random() * 8 + 4) + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 1.5 + 's';
            container.appendChild(confetti);
        }

        setTimeout(() => container.remove(), 5000);
    }

    // ---- Page Loader ----
    function initPageLoader() {
        const loader = document.querySelector('.page-loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => loader.remove(), 500);
            }, 300);
        });
    }

    // ---- Parallax on Scroll ----
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, { passive: true });
    }

    // ---- Magnetic Button Effect ----
    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-hero, .btn-primary');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });
    }

    // ---- Fallback Image Placeholder ----
    function initImageFallbacks() {
        document.addEventListener('error', function (e) {
            if (e.target.tagName === 'IMG') {
                // Prevent infinite loop if placeholder itself fails
                if (!e.target.dataset.fallbackTried) {
                    e.target.dataset.fallbackTried = 'true';
                    e.target.src = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQibsRwO1naOYLYziKEVQO5zjCLQ8HCBYerRs6J9cC9we9zRYWOtoReieQ&s=10';
                }
            }
        }, true); // Use capture phase as error events do not bubble
    }

    // ---- Theme Toggle (Dark / Light) Button Injection ----
    function initThemeToggle() {
        const container = document.querySelector('.cart-wishlist-icons');
        if (!container) return;

        if (document.getElementById('theme-toggle')) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.className = 'theme-toggle-btn ms-2';
        toggleBtn.setAttribute('aria-label', 'Toggle Theme');

        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        toggleBtn.innerHTML = currentTheme === 'light'
            ? '<i class="bi bi-moon-stars-fill"></i>'
            : '<i class="bi bi-sun-fill"></i>';

        container.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', function () {
            const oldTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = oldTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            toggleBtn.innerHTML = newTheme === 'light'
                ? '<i class="bi bi-moon-stars-fill"></i>'
                : '<i class="bi bi-sun-fill"></i>';

            showToast(`Switched to ${newTheme} mode!`, newTheme === 'light' ? 'bi-sun-fill' : 'bi-moon-stars-fill');
        });
    }

    // ---- Initialize All ----
    function init() {
        initImageFallbacks();
        initPageLoader();
        initNavbarScroll();
        initSmoothScroll();
        initScrollReveal();
        animateCounters();
        initParticles();
        initParallax();
        initThemeToggle();

        // Delay magnetic for performance
        setTimeout(initMagneticButtons, 1000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose globally
    window.KPAnimations = {
        showToast: showToast,
        launchConfetti: launchConfetti,
        initScrollReveal: initScrollReveal,
        animateCounters: animateCounters
    };
})();
