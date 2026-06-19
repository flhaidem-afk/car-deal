/* ============================================
   CARREPO - PREMIUM USED CAR MARKETPLACE
   Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // ===== LOADING SCREEN =====
    const loadingScreen = document.getElementById('loading-screen');

    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1800);
    });

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    let lastScrollY = window.scrollY;

    function updateNavbar() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // ===== MOBILE HAMBURGER MENU =====
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within parent
                const parent = entry.target.parentElement;
                const siblings = parent ? parent.querySelectorAll('.reveal') : [];
                const siblingIndex = Array.from(siblings).indexOf(entry.target);
                const delay = siblingIndex * 100;

                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);

                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // ===== ANIMATED COUNTERS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

            element.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(updateCounter);
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                statNumbers.forEach((num, index) => {
                    setTimeout(() => animateCounter(num), index * 200);
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
        statsObserver.observe(statsBar);
    }

    // ===== BACK TO TOP BUTTON =====
    const backToTop = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== CAR FILTER TABS =====
    const filterTabs = document.querySelectorAll('.filter-tab');
    const carCards = document.querySelectorAll('.car-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            // Filter cards with animation
            carCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'none';
                    card.offsetHeight; // Trigger reflow
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // Add fadeInUp keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // ===== WISHLIST TOGGLE =====
    const wishlistButtons = document.querySelectorAll('.car-wishlist');

    wishlistButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.classList.toggle('active');
            const icon = this.querySelector('i');

            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');

                // Subtle pop animation
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });

    // ===== SEARCH FUNCTIONALITY =====
    const searchInput = document.getElementById('car-search');
    const searchBtn = document.getElementById('search-btn');
    const filterBrand = document.getElementById('filter-brand');
    const filterPrice = document.getElementById('filter-price');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const brandFilter = filterBrand.value.toLowerCase();
        const priceFilter = filterPrice.value;

        carCards.forEach(card => {
            const carName = card.querySelector('.car-name').textContent.toLowerCase();
            const carPriceText = card.querySelector('.price-value').textContent;
            const carPrice = parseInt(carPriceText.replace(/[^0-9]/g, ''));

            let matchesSearch = !searchTerm || carName.includes(searchTerm);
            let matchesBrand = !brandFilter || carName.includes(brandFilter);
            let matchesPrice = true;

            if (priceFilter) {
                if (priceFilter === '0-10000') {
                    matchesPrice = carPrice < 10000;
                } else if (priceFilter === '10000-20000') {
                    matchesPrice = carPrice >= 10000 && carPrice <= 20000;
                } else if (priceFilter === '20000-30000') {
                    matchesPrice = carPrice >= 20000 && carPrice <= 30000;
                } else if (priceFilter === '30000-50000') {
                    matchesPrice = carPrice >= 30000 && carPrice <= 50000;
                } else if (priceFilter === '50000+') {
                    matchesPrice = carPrice > 50000;
                }
            }

            if (matchesSearch && matchesBrand && matchesPrice) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });

        // Scroll to featured section
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
    }

    searchBtn.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== PARALLAX EFFECT FOR HERO =====
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image');

    if (heroImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                const parallaxValue = scrolled * 0.15;
                heroImage.style.transform = `translateY(${parallaxValue}px)`;
            }
        }, { passive: true });
    }

    // ===== CATEGORY CARD HOVER EFFECT =====
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--primary)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });

    // ===== FEATURE CARD ICON ANIMATION =====
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        const icon = card.querySelector('.feature-icon');

        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'rotateY(360deg)';
                icon.style.transition = 'transform 0.6s ease';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'rotateY(0deg)';
            }
        });
    });

    // ===== TESTIMONIAL CARD RATING ANIMATION =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');

    testimonialCards.forEach(card => {
        const stars = card.querySelectorAll('.testimonial-stars i');

        card.addEventListener('mouseenter', function() {
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.transform = 'scale(1.3)';
                    star.style.transition = 'transform 0.2s ease';
                    setTimeout(() => {
                        star.style.transform = 'scale(1)';
                    }, 200);
                }, index * 50);
            });
        });
    });

    // ===== NAV LINK HOVER SOUND EFFECT (visual feedback) =====
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.letterSpacing = '0.5px';
        });

        link.addEventListener('mouseleave', function() {
            this.style.letterSpacing = '';
        });
    });

    // ===== CAR CARD IMAGE LAZY LOAD ENHANCEMENT =====
    const carImages = document.querySelectorAll('.car-image-wrapper img');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';

                // Simulate load (images are already loaded via src, but this adds polish)
                setTimeout(() => {
                    img.style.opacity = '1';
                }, 100);

                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    carImages.forEach(img => {
        imageObserver.observe(img);
    });

    // ===== KEYBOARD NAVIGATION SUPPORT =====
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ===== PERFORMANCE: Debounce scroll events =====
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

    // Apply debounce to heavy scroll handlers
    const debouncedUpdateNavbar = debounce(updateNavbar, 10);
    const debouncedUpdateActiveNav = debounce(updateActiveNav, 10);
    const debouncedToggleBackToTop = debounce(toggleBackToTop, 10);

    // Replace original scroll listeners with debounced versions
    window.removeEventListener('scroll', updateNavbar);
    window.removeEventListener('scroll', updateActiveNav);
    window.removeEventListener('scroll', toggleBackToTop);

    window.addEventListener('scroll', debouncedUpdateNavbar, { passive: true });
    window.addEventListener('scroll', debouncedUpdateActiveNav, { passive: true });
    window.addEventListener('scroll', debouncedToggleBackToTop, { passive: true });

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c CarRepo ', 'background: linear-gradient(135deg, #3B82F6, #60A5FA); color: white; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Premium Used Car Marketplace ', 'color: #60A5FA; font-size: 14px;');
    console.log('%c Built with pure HTML, CSS & JavaScript ', 'color: #94A3B8; font-size: 12px;');
});