// script.js
class CareRepo {
    constructor() {
        this.cars = this.generateCars();
        this.favorites = new Set();
        this.currentView = 'grid';
        this.init();
    }

    init() {
        this.renderCars();
        this.setupEventListeners();
        this.animateHero();
    }

    generateCars() {
        const makes = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Ford', 'Audi', 'Lexus', 'Tesla'];
        const models = {
            'Toyota': ['Camry', 'RAV4', 'Corolla', 'Highlander'],
            'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot'],
            'BMW': ['3 Series', 'X5', '5 Series', 'X3'],
            'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE'],
            'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape'],
            'Audi': ['A4', 'Q5', 'A6', 'Q7'],
            'Lexus': ['RX', 'ES', 'NX', 'IS'],
            'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X']
        };
        const years = [2020, 2021, 2022, 2023, 2024, 2025];
        const locations = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Miami, FL'];
        const images = [
            'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop',
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop'
        ];

        const cars = [];
        for (let i = 0; i < 12; i++) {
            const make = makes[Math.floor(Math.random() * makes.length)];
            const model = models[make][Math.floor(Math.random() * models[make].length)];
            const year = years[Math.floor(Math.random() * years.length)];
            const price = Math.floor(Math.random() * 45000) + 15000;
            const originalPrice = Math.floor(price * (1 + Math.random() * 0.3));
            const mileage = Math.floor(Math.random() * 80000);
            const location = locations[Math.floor(Math.random() * locations.length)];
            
            cars.push({
                id: i + 1,
                make,
                model,
                year,
                price,
                originalPrice,
                mileage,
                location,
                image: images[i % images.length],
                badge: Math.random() > 0.7 ? 'certified' : Math.random() > 0.5 ? 'featured' : null,
                transmission: Math.random() > 0.5 ? 'Automatic' : 'Manual',
                fuel: ['Gasoline', 'Hybrid', 'Electric'][Math.floor(Math.random() * 3)]
            });
        }
        return cars;
    }

    renderCars() {
        const grid = document.getElementById('carsGrid');
        if (!grid) return;

        grid.innerHTML = this.cars.map(car => this.createCarCard(car)).join('');
    }

    createCarCard(car) {
        const isFavorite = this.favorites.has(car.id);
        const savings = car.originalPrice - car.price;
        
        return `
            <div class="car-card" data-id="${car.id}" onclick="viewCarDetails(${car.id})">
                <div class="car-image">
                    <img src="${car.image}" alt="${car.year} ${car.make} ${car.model}" loading="lazy">
                    ${car.badge ? `<span class="car-badge badge-${car.badge}">${car.badge}</span>` : ''}
                    <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(${car.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        </svg>
                    </button>
                </div>
                <div class="car-details">
                    <h3 class="car-title">${car.year} ${car.make} ${car.model}</h3>
                    <p class="car-subtitle">${car.transmission} · ${car.fuel}</p>
                    <div class="car-specs">
                        <div class="car-spec">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 2v20M2 12h20"/>
                            </svg>
                            ${car.mileage.toLocaleString()} mi
                        </div>
                        <div class="car-spec">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            ${car.year}
                        </div>
                    </div>
                    <div class="car-footer">
                        <div class="car-price">
                            $${car.price.toLocaleString()}
                            ${savings > 5000 ? `<span class="original">$${car.originalPrice.toLocaleString()}</span>` : ''}
                        </div>
                        <div class="car-location">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                            </svg>
                            ${car.location}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    setupEventListeners() {
        // View toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.currentView = e.currentTarget.dataset.view;
                this.toggleView();
            });
        });

        // Sort
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortCars(e.target.value);
            });
        }

        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterCars(e.target.value);
            });
        }

        // Body type filters
        document.querySelectorAll('.body-type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.body-type-btn').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Pagination
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (!e.currentTarget.disabled && !e.currentTarget.querySelector('svg')) {
                    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                    e.currentTarget.classList.add('active');
                }
            });
        });
    }

    toggleView() {
        const grid = document.getElementById('carsGrid');
        if (this.currentView === 'list') {
            grid.style.gridTemplateColumns = '1fr';
        } else {
            grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        }
    }

    sortCars(criteria) {
        const sorted = [...this.cars];
        switch(criteria) {
            case 'price-low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'mileage':
                sorted.sort((a, b) => a.mileage - b.mileage);
                break;
            default:
                sorted.sort((a, b) => b.year - a.year);
        }
        
        const grid = document.getElementById('carsGrid');
        grid.innerHTML = sorted.map(car => this.createCarCard(car)).join('');
    }

    filterCars(query) {
        const filtered = this.cars.filter(car => 
            car.make.toLowerCase().includes(query.toLowerCase()) ||
            car.model.toLowerCase().includes(query.toLowerCase()) ||
            car.year.toString().includes(query)
        );
        
        const grid = document.getElementById('carsGrid');
        grid.innerHTML = filtered.map(car => this.createCarCard(car)).join('');
        
        const count = document.querySelector('.results-count');
        if (count) {
            count.innerHTML = `Showing <strong>${filtered.length}</strong> results`;
        }
    }

    animateHero() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(40px)';
            
            setTimeout(() => {
                heroContent.style.transition = 'all 0.8s ease';
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

// Global functions
function toggleFavorite(carId) {
    const app = window.careRepo;
    if (app.favorites.has(carId)) {
        app.favorites.delete(carId);
    } else {
        app.favorites.add(carId);
    }
    app.renderCars();
}

function viewCarDetails(carId) {
    const car = window.careRepo.cars.find(c => c.id === carId);
    alert(`Viewing details for ${car.year} ${car.make} ${car.model}\n\nPrice: $${car.price.toLocaleString()}\nMileage: ${car.mileage.toLocaleString()} mi\nLocation: ${car.location}\n\nIn a real app, this would open a detailed car page.`);
}

function searchCars() {
    const input = document.getElementById('searchInput');
    if (input) {
        window.careRepo.filterCars(input.value);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    window.careRepo = new CareRepo();
});