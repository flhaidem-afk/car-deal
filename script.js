/**
 * AutoVault - Premium Car Marketplace
 * Complete JavaScript Application
 */

const AutoVault = {
    state: {
        currentTheme: 'dark',
        cars: [],
        filteredCars: [],
        favorites: new Set(),
        currentModalCar: null
    },

    // ============================================
    // Vehicle Data
    // ============================================
    vehicleData: [
        {
            id: 1, brand: 'bmw', model: 'M3 Competition', year: 2025, price: 78900,
            mileage: 1200, fuel: 'gasoline', transmission: 'automatic', type: 'sports',
            image: 'https://images.unsplash.com/photo-1555215695-3004980adade?w=600&h=400&fit=crop',
            badges: ['new', 'featured'], dealer: 'BMW of Downtown', rating: 4.9,
            specs: { engine: '3.0L Twin-Turbo I6', power: '503 HP', acceleration: '3.8s', topSpeed: '180 mph' },
            features: ['M Carbon Ceramic Brakes', 'Adaptive M Suspension', 'Harman Kardon Audio', 'Head-Up Display', 'Wireless Charging', 'Apple CarPlay']
        },
        {
            id: 2, brand: 'mercedes', model: 'S-Class S580', year: 2025, price: 125000,
            mileage: 3500, fuel: 'gasoline', transmission: 'automatic', type: 'luxury',
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&h=400&fit=crop',
            badges: ['certified'], dealer: 'Mercedes-Benz Beverly Hills', rating: 4.8,
            specs: { engine: '4.0L V8 Biturbo', power: '496 HP', acceleration: '4.4s', topSpeed: '155 mph' },
            features: ['AIRMATIC Suspension', 'Burmester 4D Audio', 'MBUX Hyperscreen', 'Massage Seats', 'Night Vision', 'Digital Light']
        },
        {
            id: 3, brand: 'tesla', model: 'Model S Plaid', year: 2025, price: 135000,
            mileage: 800, fuel: 'electric', transmission: 'automatic', type: 'electric',
            image: 'https://images.unsplash.com/photo-1617788138017-40f8afb4b4d8?w=600&h=400&fit=crop',
            badges: ['new', 'featured'], dealer: 'Tesla Los Angeles', rating: 4.9,
            specs: { engine: 'Tri Motor', power: '1020 HP', acceleration: '1.99s', topSpeed: '200 mph' },
            features: ['Full Self-Driving', 'Yoke Steering', '17" Cinematic Display', 'Autopilot', 'Over-the-Air Updates', 'Glass Roof']
        },
        {
            id: 4, brand: 'audi', model: 'RS7 Sportback', year: 2024, price: 125000,
            mileage: 5200, fuel: 'gasoline', transmission: 'automatic', type: 'luxury',
            image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop',
            badges: ['certified'], dealer: 'Audi West Hollywood', rating: 4.7,
            specs: { engine: '4.0L V8 Twin-Turbo', power: '591 HP', acceleration: '3.5s', topSpeed: '190 mph' },
            features: ['Quattro AWD', 'Air Suspension', 'Bang & Olufsen Audio', 'Matrix LED', 'Virtual Cockpit', 'Night Vision']
        },
        {
            id: 5, brand: 'porsche', model: '911 Carrera S', year: 2025, price: 132000,
            mileage: 2100, fuel: 'gasoline', transmission: 'automatic', type: 'sports',
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
            badges: ['new'], dealer: 'Porsche Center LA', rating: 5.0,
            specs: { engine: '3.0L Twin-Turbo H6', power: '443 HP', acceleration: '3.3s', topSpeed: '191 mph' },
            features: ['PASM Sport Suspension', 'Sport Chrono Package', 'BOSE Audio', 'Sport Exhaust', 'Rear-Axle Steering', 'Wet Mode']
        },
        {
            id: 6, brand: 'lexus', model: 'RX 500h F Sport', year: 2025, price: 68000,
            mileage: 1500, fuel: 'hybrid', transmission: 'automatic', type: 'suv',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop',
            badges: ['new'], dealer: 'Lexus of Santa Monica', rating: 4.6,
            specs: { engine: '2.4L Turbo Hybrid', power: '366 HP', acceleration: '5.9s', topSpeed: '130 mph' },
            features: ['Direct4 AWD', 'Mark Levinson Audio', 'Panoramic Roof', 'Heated/Ventilated Seats', 'Lexus Safety System+', 'Heads-Up Display']
        },
        {
            id: 7, brand: 'toyota', model: 'Land Cruiser 2024', year: 2024, price: 58000,
            mileage: 8900, fuel: 'hybrid', transmission: 'automatic', type: 'suv',
            image: 'https://images.unsplash.com/photo-1551844930-05d774fb0a6f?w=600&h=400&fit=crop',
            badges: ['certified'], dealer: 'Toyota Downtown', rating: 4.5,
            specs: { engine: '2.4L Turbo Hybrid', power: '326 HP', acceleration: '6.7s', topSpeed: '130 mph' },
            features: ['Full-Time 4WD', 'Crawl Control', 'Multi-Terrain Select', 'JBL Audio', 'Roof Rack', 'Tow Package']
        },
        {
            id: 8, brand: 'honda', model: 'Accord Touring', year: 2025, price: 42000,
            mileage: 3200, fuel: 'hybrid', transmission: 'automatic', type: 'sedan',
            image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?w=600&h=400&fit=crop',
            badges: ['featured'], dealer: 'Honda of Hollywood', rating: 4.4,
            specs: { engine: '2.0L Hybrid', power: '204 HP', acceleration: '7.1s', topSpeed: '125 mph' },
            features: ['Honda Sensing 360', 'Bose Audio', 'Wireless CarPlay', 'Heated Seats', 'Moonroof', 'Wireless Charging']
        },
        {
            id: 9, brand: 'ford', model: 'F-150 Raptor', year: 2025, price: 82000,
            mileage: 4500, fuel: 'gasoline', transmission: 'automatic', type: 'truck',
            image: 'https://images.unsplash.com/photo-1551830820-330a71b99dcf?w=600&h=400&fit=crop',
            badges: ['new'], dealer: 'Ford of Burbank', rating: 4.7,
            specs: { engine: '3.5L EcoBoost V6', power: '450 HP', acceleration: '5.2s', topSpeed: '120 mph' },
            features: ['FOX Live Valve Shocks', 'Trail Control', 'Pro Power Onboard', 'B&O Audio', '360-Degree Camera', 'Trail Turn Assist']
        },
        {
            id: 10, brand: 'chevrolet', model: 'Corvette Z06', year: 2025, price: 115000,
            mileage: 600, fuel: 'gasoline', transmission: 'automatic', type: 'sports',
            image: 'https://images.unsplash.com/photo-1544636331-e26889cd82e8?w=600&h=400&fit=crop',
            badges: ['new', 'featured'], dealer: 'Chevy of Van Nuys', rating: 4.9,
            specs: { engine: '5.5L V8 Flat-Plane', power: '670 HP', acceleration: '2.6s', topSpeed: '195 mph' },
            features: ['Z07 Performance Package', 'Carbon Ceramic Brakes', 'Magnetic Ride Control', 'Bose Audio', 'Head-Up Display', 'Performance Data Recorder']
        },
        {
            id: 11, brand: 'bmw', model: 'X7 M60i', year: 2024, price: 105000,
            mileage: 7800, fuel: 'gasoline', transmission: 'automatic', type: 'suv',
            image: 'https://images.unsplash.com/photo-1607853202273-797f1be6074d?w=600&h=400&fit=crop',
            badges: ['certified'], dealer: 'BMW of Downtown', rating: 4.6,
            specs: { engine: '4.4L V8 Twin-Turbo', power: '523 HP', acceleration: '4.5s', topSpeed: '155 mph' },
            features: ['Executive Lounge Seating', 'Bowers & Wilkins Audio', 'Rear Entertainment', 'Air Suspension', 'Laser Headlights', 'Night Vision']
        },
        {
            id: 12, brand: 'audi', model: 'e-tron GT', year: 2025, price: 110000,
            mileage: 1200, fuel: 'electric', transmission: 'automatic', type: 'electric',
            image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
            badges: ['new'], dealer: 'Audi West Hollywood', rating: 4.8,
            specs: { engine: 'Dual Motor Electric', power: '522 HP', acceleration: '3.9s', topSpeed: '152 mph' },
            features: ['Quattro AWD', 'Air Suspension', 'Bang & Olufsen Audio', 'Matrix LED', 'Virtual Cockpit', 'Fast Charging']
        }
    ],

    // ============================================
    // Initialization
    // ============================================
    init() {
        this.state.cars = this.vehicleData;
        this.state.filteredCars = this.vehicleData;

        this.initLoading();
        this.initTheme();
        this.initNavbar();
        this.initMobileMenu();
        this.initSmoothScroll();
        this.initActiveNav();
        this.initScrollReveal();
        this.initBackToTop();
        this.initCounters();
        this.renderCars();
        this.initFilters();
        this.initHeroSearch();
        this.initCategoryCards();
        this.initCalculator();
        this.initContactForm();
        this.initNewsletter();
        this.initModal();
    },

    // ============================================
    // Loading Screen
    // ============================================
    initLoading() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (!loadingScreen) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 2000);
        });

        if (document.readyState === 'complete') {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 2000);
        }
    },

    // ============================================
    // Theme Toggle
    // ============================================
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        const savedTheme = localStorage.getItem('autovault-theme') || 'dark';
        this.setTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = this.state.currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
        });
    },

    setTheme(theme) {
        this.state.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('autovault-theme', theme);

        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    // ============================================
    // Navbar
    // ============================================
    initNavbar() {
        const navbar = document.getElementById('navbar');
        if (!navbar) return;

        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });

        navbar.style.transition = 'transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
    },

    // ============================================
    // Mobile Menu
    // ============================================
    initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        if (!hamburger || !mobileMenu) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    },

    // ============================================
    // Smooth Scroll
    // ============================================
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    },

    // ============================================
    // Active Navigation
    // ============================================
    initActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });

        sections.forEach(section => observer.observe(section));
    },

    // ============================================
    // Scroll Reveal
    // ============================================
    initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(el => observer.observe(el));
    },

    // ============================================
    // Back to Top
    // ============================================
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.pageYOffset > 500);
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // ============================================
    // Animated Counters
    // ============================================
    initCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    const suffix = el.textContent.includes('%') ? '%' : '';
                    this.animateCounter(el, target, 2000, suffix);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element, target, duration, suffix) {
        suffix = suffix || '';
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(target * eased);
            element.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    },

    // ============================================
    // Render Cars
    // ============================================
    renderCars() {
        const grid = document.getElementById('carsGrid');
        if (!grid) return;

        grid.innerHTML = this.state.filteredCars.map(car => this.createCarCard(car)).join('');

        // Add click handlers
        grid.querySelectorAll('.car-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.car-favorite')) return;
                const carId = parseInt(card.getAttribute('data-id'));
                this.openCarModal(carId);
            });
        });

        // Add favorite handlers
        grid.querySelectorAll('.car-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const carId = parseInt(btn.getAttribute('data-id'));
                this.toggleFavorite(carId, btn);
            });
        });

        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            resultsCount.textContent = 'Showing ' + this.state.filteredCars.length + ' vehicles';
        }
    },

    createCarCard(car) {
        const badgesHtml = car.badges.map(badge =>
            '<span class="car-badge ' + badge + '">' + badge + '</span>'
        ).join('');

        const isFavorite = this.state.favorites.has(car.id);

        return `
            <div class="car-card" data-id="${car.id}">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.brand} ${car.model}" loading="lazy">
                    <div class="car-badges">${badgesHtml}</div>
                    <button class="car-favorite ${isFavorite ? 'active' : ''}" data-id="${car.id}" aria-label="Add to favorites">
                        <i class="fas fa-heart"></i>
                    </button>
                </div>
                <div class="car-info">
                    <div class="car-header">
                        <div>
                            <h3 class="car-title">${car.brand.charAt(0).toUpperCase() + car.brand.slice(1)} ${car.model}</h3>
                            <span class="car-year">${car.year}</span>
                        </div>
                        <span class="car-price">$${car.price.toLocaleString()}</span>
                    </div>
                    <div class="car-specs">
                        <span class="car-spec"><i class="fas fa-tachometer-alt"></i> ${car.mileage.toLocaleString()} mi</span>
                        <span class="car-spec"><i class="fas fa-gas-pump"></i> ${car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1)}</span>
                        <span class="car-spec"><i class="fas fa-cog"></i> ${car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</span>
                    </div>
                    <div class="car-footer">
                        <span class="car-dealer"><i class="fas fa-check-circle"></i> ${car.dealer}</span>
                        <span class="btn btn-sm btn-primary car-btn">View Details</span>
                    </div>
                </div>
            </div>
        `;
    },

    toggleFavorite(carId, btn) {
        if (this.state.favorites.has(carId)) {
            this.state.favorites.delete(carId);
            btn.classList.remove('active');
        } else {
            this.state.favorites.add(carId);
            btn.classList.add('active');
        }
    },

    // ============================================
    // Filters
    // ============================================
    initFilters() {
        const toggle = document.getElementById('filtersToggle');
        const panel = document.getElementById('filtersPanel');
        if (toggle && panel) {
            toggle.addEventListener('click', () => {
                panel.classList.toggle('active');
                toggle.querySelector('.fa-chevron-down').style.transform =
                    panel.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
            });
        }

        const filterIds = ['filterBrand', 'filterType', 'filterPrice', 'filterYear', 'filterFuel', 'filterTransmission'];
        filterIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('change', () => this.applyFilters());
        });

        const resetBtn = document.getElementById('resetFilters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                filterIds.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
                this.applyFilters();
            });
        }
    },

    applyFilters() {
        const brand = document.getElementById('filterBrand')?.value || '';
        const type = document.getElementById('filterType')?.value || '';
        const priceRange = document.getElementById('filterPrice')?.value || '';
        const year = document.getElementById('filterYear')?.value || '';
        const fuel = document.getElementById('filterFuel')?.value || '';
        const transmission = document.getElementById('filterTransmission')?.value || '';

        this.state.filteredCars = this.state.cars.filter(car => {
            if (brand && car.brand !== brand) return false;
            if (type && car.type !== type) return false;
            if (year && car.year !== parseInt(year)) return false;
            if (fuel && car.fuel !== fuel) return false;
            if (transmission && car.transmission !== transmission) return false;

            if (priceRange) {
                if (priceRange === '100000+') {
                    if (car.price < 100000) return false;
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    if (car.price < min || car.price > max) return false;
                }
            }

            return true;
        });

        this.renderCars();
    },

    // ============================================
    // Hero Search
    // ============================================
    initHeroSearch() {
        const btn = document.getElementById('heroSearchBtn');
        if (!btn) return;

        btn.addEventListener('click', () => {
            const brand = document.getElementById('heroBrand')?.value || '';
            const price = document.getElementById('heroPrice')?.value || '';
            const fuel = document.getElementById('heroFuel')?.value || '';

            // Scroll to featured section
            document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });

            // Apply filters after scroll
            setTimeout(() => {
                if (brand) document.getElementById('filterBrand').value = brand;
                if (price) document.getElementById('filterPrice').value = price;
                if (fuel) document.getElementById('filterFuel').value = fuel;
                this.applyFilters();

                // Open filters panel
                const panel = document.getElementById('filtersPanel');
                if (panel) panel.classList.add('active');
            }, 500);
        });
    },

    // ============================================
    // Category Cards
    // ============================================
    initCategoryCards() {
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });

                setTimeout(() => {
                    const typeSelect = document.getElementById('filterType');
                    if (typeSelect) {
                        typeSelect.value = category;
                        this.applyFilters();
                    }
                    const panel = document.getElementById('filtersPanel');
                    if (panel) panel.classList.add('active');
                }, 500);
            });
        });
    },

    // ============================================
    // Finance Calculator
    // ============================================
    initCalculator() {
        const inputs = ['calcPrice', 'calcDown', 'calcRate', 'calcTerm'];
        const ranges = ['calcPriceRange', 'calcDownRange'];

        // Sync range and number inputs
        const priceInput = document.getElementById('calcPrice');
        const priceRange = document.getElementById('calcPriceRange');
        if (priceInput && priceRange) {
            priceRange.addEventListener('input', () => {
                priceInput.value = priceRange.value;
                this.calculatePayment();
            });
            priceInput.addEventListener('input', () => {
                priceRange.value = priceInput.value;
                this.calculatePayment();
            });
        }

        const downInput = document.getElementById('calcDown');
        const downRange = document.getElementById('calcDownRange');
        if (downInput && downRange) {
            downRange.addEventListener('input', () => {
                downInput.value = downRange.value;
                this.calculatePayment();
            });
            downInput.addEventListener('input', () => {
                downRange.value = downInput.value;
                this.calculatePayment();
            });
        }

        // Calculate on all inputs
        inputs.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => this.calculatePayment());
        });

        this.calculatePayment();
    },

    calculatePayment() {
        const price = parseFloat(document.getElementById('calcPrice')?.value) || 0;
        const down = parseFloat(document.getElementById('calcDown')?.value) || 0;
        const rate = parseFloat(document.getElementById('calcRate')?.value) || 0;
        const term = parseInt(document.getElementById('calcTerm')?.value) || 60;

        const loanAmount = price - down;
        const monthlyRate = rate / 100 / 12;
        const numPayments = term;

        let monthlyPayment = 0;
        if (rate === 0) {
            monthlyPayment = loanAmount / numPayments;
        } else {
            monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                (Math.pow(1 + monthlyRate, numPayments) - 1);
        }

        const totalCost = monthlyPayment * numPayments + down;
        const totalInterest = totalCost - price;

        const monthlyEl = document.getElementById('monthlyPayment');
        const loanEl = document.getElementById('loanAmount');
        const interestEl = document.getElementById('totalInterest');
        const totalEl = document.getElementById('totalCost');

        if (monthlyEl) monthlyEl.textContent = '$' + Math.round(monthlyPayment).toLocaleString();
        if (loanEl) loanEl.textContent = '$' + loanAmount.toLocaleString();
        if (interestEl) interestEl.textContent = '$' + Math.round(totalInterest).toLocaleString();
        if (totalEl) totalEl.textContent = '$' + Math.round(totalCost).toLocaleString();
    },

    // ============================================
    // Contact Form
    // ============================================
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.validateContactForm(form)) {
                document.getElementById('contactSuccessModal')?.classList.add('active');
                form.reset();
            }
        });

        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateContactField(input));
            input.addEventListener('input', () => this.clearContactError(input));
        });
    },

    validateContactForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        requiredFields.forEach(field => {
            if (!this.validateContactField(field)) isValid = false;
        });

        const email = form.querySelector('#contactEmail');
        if (email && email.value && !this.isValidEmail(email.value)) {
            this.showContactError(email, 'Please enter a valid email');
            isValid = false;
        }

        return isValid;
    },

    validateContactField(field) {
        const value = field.value.trim();
        if (!value) {
            this.showContactError(field, 'This field is required');
            return false;
        }
        this.clearContactError(field);
        return true;
    },

    showContactError(field, message) {
        field.classList.add('error');
        const errorEl = document.getElementById(field.id + 'Error');
        if (errorEl) errorEl.textContent = message;
    },

    clearContactError(field) {
        field.classList.remove('error');
        const errorEl = document.getElementById(field.id + 'Error');
        if (errorEl) errorEl.textContent = '';
    },

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // ============================================
    // Newsletter
    // ============================================
    initNewsletter() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (input && input.value && this.isValidEmail(input.value)) {
                this.showToast('Thank you for subscribing!');
                form.reset();
            } else {
                this.showToast('Please enter a valid email address');
            }
        });
    },

    // ============================================
    // Car Modal
    // ============================================
    openCarModal(carId) {
        const car = this.state.cars.find(c => c.id === carId);
        if (!car) return;

        this.state.currentModalCar = car;
        const modal = document.getElementById('carModal');
        const body = document.getElementById('modalBody');
        if (!modal || !body) return;

        body.innerHTML = this.createModalContent(car);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    createModalContent(car) {
        const badgesHtml = car.badges.map(badge =>
            '<span class="car-badge ' + badge + '">' + badge + '</span>'
        ).join('');

        const featuresHtml = car.features.map(f =>
            '<li><i class="fas fa-check"></i> ' + f + '</li>'
        ).join('');

        return `
            <div class="modal-gallery">
                <img src="${car.image}" alt="${car.brand} ${car.model}">
                <div class="modal-gallery-nav">
                    <span class="modal-gallery-dot active"></span>
                    <span class="modal-gallery-dot"></span>
                    <span class="modal-gallery-dot"></span>
                </div>
            </div>
            <div class="modal-details">
                <div class="modal-header">
                    <div>
                        <div class="car-badges" style="position:static;margin-bottom:12px;">${badgesHtml}</div>
                        <h2 class="modal-title">${car.brand.charAt(0).toUpperCase() + car.brand.slice(1)} ${car.model}</h2>
                        <span class="car-year">${car.year} &bull; ${car.dealer}</span>
                    </div>
                    <span class="modal-price">$${car.price.toLocaleString()}</span>
                </div>
                <div class="modal-specs-grid">
                    <div class="modal-spec">
                        <i class="fas fa-engine"></i>
                        <div>
                            <span>Engine</span>
                            <span>${car.specs.engine}</span>
                        </div>
                    </div>
                    <div class="modal-spec">
                        <i class="fas fa-bolt"></i>
                        <div>
                            <span>Power</span>
                            <span>${car.specs.power}</span>
                        </div>
                    </div>
                    <div class="modal-spec">
                        <i class="fas fa-tachometer-alt"></i>
                        <div>
                            <span>0-60 mph</span>
                            <span>${car.specs.acceleration}</span>
                        </div>
                    </div>
                    <div class="modal-spec">
                        <i class="fas fa-gauge-high"></i>
                        <div>
                            <span>Top Speed</span>
                            <span>${car.specs.topSpeed}</span>
                        </div>
                    </div>
                    <div class="modal-spec">
                        <i class="fas fa-gas-pump"></i>
                        <div>
                            <span>Fuel Type</span>
                            <span>${car.fuel.charAt(0).toUpperCase() + car.fuel.slice(1)}</span>
                        </div>
                    </div>
                    <div class="modal-spec">
                        <i class="fas fa-cog"></i>
                        <div>
                            <span>Transmission</span>
                            <span>${car.transmission.charAt(0).toUpperCase() + car.transmission.slice(1)}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-features">
                    <h4>Key Features</h4>
                    <ul class="features-list">${featuresHtml}</ul>
                </div>
                <div class="modal-actions">
                    <a href="#contact" class="btn btn-primary btn-lg" onclick="AutoVault.closeModal()">
                        <i class="fas fa-phone"></i> Contact Seller
                    </a>
                    <button class="btn btn-outline btn-lg" onclick="AutoVault.showToast('Test drive scheduled! We will contact you shortly.')">
                        <i class="fas fa-calendar-check"></i> Schedule Test Drive
                    </button>
                </div>
            </div>
        `;
    },

    closeModal() {
        const modal = document.getElementById('carModal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
    },

    initModal() {
        const modal = document.getElementById('carModal');
        const closeBtn = document.getElementById('modalClose');
        const contactModalClose = document.getElementById('contactModalClose');
        const contactModal = document.getElementById('contactSuccessModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        }

        if (contactModalClose && contactModal) {
            contactModalClose.addEventListener('click', () => {
                contactModal.classList.remove('active');
            });
            contactModal.addEventListener('click', (e) => {
                if (e.target === contactModal) contactModal.classList.remove('active');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
                if (contactModal) contactModal.classList.remove('active');
            }
        });
    },

    // ============================================
    // Toast Notifications
    // ============================================
    showToast(message) {
        const existing = document.querySelector('.toast-notification');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background: var(--color-bg-card);
            border: 1px solid var(--color-border);
            border-radius: 12px;
            padding: 14px 28px;
            color: var(--color-text);
            font-size: 0.95rem;
            z-index: 10000;
            box-shadow: var(--shadow-lg);
            transition: transform 0.3s ease;
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(100px)';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// ============================================
// Global Init
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    AutoVault.init();
});