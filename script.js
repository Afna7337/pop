// --- DATA ---
const flavors = [
    // Fruity (Kids)
    { name: "Strawberry Splash", price: 50, category: "fruity", image: "assets/images/strawberry_splash.png" },
    { name: "Mango Magic", price: 55, category: "fruity", image: "assets/images/mango_magic.png" },
    { name: "Blueberry Burst", price: 60, category: "fruity", image: "assets/images/blueberry_burst.png" },
    { name: "Watermelon Chill", price: 50, category: "fruity", image: "assets/images/watermelon_chill.png" },
    { name: "Pineapple Punch", price: 55, category: "fruity", image: "assets/images/pineapple_punch.png" },
    { name: "Orange Zing", price: 50, category: "fruity", image: "assets/images/mango_magic.png" },
    { name: "Kiwi Pop", price: 60, category: "fruity", image: "assets/images/watermelon_chill.png" },
    { name: "Lychee Twist", price: 65, category: "fruity", image: "assets/images/strawberry_splash.png" },

    // Creamy & Experimental (Trendy)
    { name: "Chocolate Fudge", price: 75, category: "creamy", image: "assets/images/pineapple_punch.png" },
    { name: "Cookies & Cream", price: 80, category: "creamy", image: "assets/images/blueberry_burst.png" },
    { name: "Vanilla Swirl", price: 60, category: "creamy", image: "assets/images/mango_magic.png" },
    { name: "Caramel Drip", price: 75, category: "creamy", image: "assets/images/pineapple_punch.png" },
    { name: "Nutella Crunch", price: 90, category: "creamy", image: "assets/images/blueberry_burst.png" },
    { name: "Cola Freeze", price: 55, category: "experimental", image: "assets/images/blueberry_burst.png" },
    { name: "Bubblegum Blast", price: 65, category: "experimental", image: "assets/images/strawberry_splash.png" },
    { name: "Yogurt Berry Fusion", price: 85, category: "experimental", image: "assets/images/mango_magic.png" },

    // Premium
    { name: "Belgian Dark Chocolate", price: 110, category: "premium", image: "assets/images/blueberry_burst.png" },
    { name: "Pistachio Gold", price: 95, category: "premium", image: "assets/images/watermelon_chill.png" },
    { name: "Matcha Mint", price: 90, category: "premium", image: "assets/images/watermelon_chill.png" },
    { name: "Rose Milk Deluxe", price: 80, category: "premium", image: "assets/images/strawberry_splash.png" }
];

// --- RENDER MENU ---
const menuGrid = document.getElementById('menu-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function renderMenu(filterItem = 'all') {
    menuGrid.innerHTML = '';

    const filtered = flavors.filter(f => {
        if (filterItem === 'all') return true;
        if (filterItem === 'kids') return f.category === 'fruity';
        if (filterItem === 'trendy') return f.category === 'creamy' || f.category === 'experimental';
        if (filterItem === 'premium') return f.category === 'premium';
        return false;
    });

    filtered.forEach(flavor => {
        let fontClass = 'trendy-font';
        if (flavor.category === 'fruity') fontClass = 'kids-font';
        if (flavor.category === 'premium') fontClass = 'premium-font';

        const card = document.createElement('div');
        card.className = 'flavor-card glass-panel';
        card.innerHTML = `
            <img src="${flavor.image}" alt="${flavor.name}" class="card-img">
            <h3 class="${fontClass}">${flavor.name}</h3>
            <div class="price" style="display:flex; justify-content:space-between; align-items:center;">
                <span>₹${flavor.price}</span>
                <button class="add-cart-icon" style="background:var(--primary-pink); color:white; border:none; width:40px; height:40px; border-radius:50%; cursor:pointer; font-size:1.2rem; transition:transform 0.2s;" onclick="addToCart('${flavor.name}')" title="Add to Cart">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// Initial render
renderMenu();

// Filter Event Listeners
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMenu(btn.dataset.filter);
    });
});

// --- TRACKER SIMULATION ---
const simBtn = document.getElementById('simulate-tracker');
const progress = document.querySelector('.tracker-progress');
const steps = document.querySelectorAll('.tracker-step');

simBtn.addEventListener('click', () => {
    simBtn.disabled = true;
    simBtn.innerText = 'Tracking...';

    let currentStep = 1;
    progress.style.width = '25%'; // Confirmed to Preparing length

    const interval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            let percentage = (currentStep / (steps.length - 1)) * 100;
            progress.style.width = `${percentage}%`;
        } else {
            clearInterval(interval);
            simBtn.innerText = 'Delivered!';
            setTimeout(() => {
                // reset
                progress.style.width = '0';
                steps.forEach((s, i) => { if (i > 0) s.classList.remove('active') });
                simBtn.innerText = 'Simulate Delivery';
                simBtn.disabled = false;
            }, 5000);
        }
    }, 1500); // 1.5s per step simulation
});

// --- BUILD YOUR POP ---
const baseSelect = document.getElementById('base-flavor');
const dipSelect = document.getElementById('dip-coating');
const sprinklesSelect = document.getElementById('sprinkles');
const buildPrice = document.getElementById('builder-price');
const buildPreview = document.getElementById('builder-pop-img');

function updateBuild() {
    let baseCost = parseInt(baseSelect.value);
    let dipCost = parseInt(dipSelect.value);
    let sprCost = parseInt(sprinklesSelect.value);
    buildPrice.innerText = baseCost + dipCost + sprCost;

    let selectedOption = baseSelect.options[baseSelect.selectedIndex];
    if (selectedOption.dataset.img) {
        buildPreview.src = 'assets/images/' + selectedOption.dataset.img;
    }
}

baseSelect.addEventListener('change', updateBuild);
dipSelect.addEventListener('change', updateBuild);
sprinklesSelect.addEventListener('change', updateBuild);

// --- NAME ON POP ---
const nameInput = document.getElementById('pop-name-input');
const nameDisplay = document.getElementById('stick-name-display');

nameInput.addEventListener('input', (e) => {
    let val = e.target.value.toUpperCase();
    nameDisplay.innerText = val || "YOUR NAME";
});

// --- SPIN WHEEL ---
const spinBtn = document.getElementById('spin-btn');
const wheel = document.getElementById('wheel');
const spinResult = document.getElementById('spin-result');

spinBtn.addEventListener('click', () => {
    spinBtn.disabled = true;
    spinResult.innerText = "Spinning...";

    let randomDegree = Math.floor(Math.random() * 360) + 1800;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    setTimeout(() => {
        spinBtn.disabled = false;
        let actualDeg = randomDegree % 360;
        let slice = Math.floor(actualDeg / 60);

        const rewards = [
            "10% OFF!", "15% OFF!", "FREE POP!", "OOPS!", "5% OFF!", "FREE DIP!"
        ];

        let result = rewards[slice];
        spinResult.innerText = "You won: " + result + " 🎉";
    }, 4000);
});

// --- SCROLL MELT EFFECT ---
const scrollDrip = document.querySelector('.scroll-drip');
window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY;
    let docHeight = document.body.scrollHeight - window.innerHeight;
    let scrollPercent = scrollPos / docHeight;

    if (scrollPercent >= 0 && scrollPercent <= 1) {
        let stretch = 1 + (scrollPercent * 6);
        scrollDrip.style.transform = `scaleY(${stretch})`;
    }
});

// --- CART & ORDER INTERACTION ---
window.addToCart = function (itemName) {
    let mobile = prompt('🛒 Adding ' + itemName + ' to Cart.\\nPlease enter your Mobile Number to place the order:');
    if (mobile && mobile.trim() !== '') {
        alert('Order Successful! We have received your order for ' + itemName + ' and will contact ' + mobile + ' shortly.');
    } else if (mobile !== null) {
        alert('Mobile number is required to place an order.');
    }
};

const orderNowBtn = document.getElementById('order-now-btn');
if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {
        let mobile = prompt('Please enter your Mobile Number to place the order:');
        if (mobile && mobile.trim() !== '') {
            alert('Order Successful! We have received your order. We will contact ' + mobile + ' shortly.');
        } else if (mobile !== null) {
            alert('Mobile number is required to place an order.');
        }
    });
}
