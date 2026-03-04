```javascript
// --- DATA ---
const flavors = [
    // Fruity (Kids)
    { name: "Strawberry Splash", price: 50, category: "fruity", image: "strawberry_splash.png" },
    { name: "Mango Magic", price: 55, category: "fruity", image: "mango_magic.png" },
    { name: "Blueberry Burst", price: 60, category: "fruity", image: "blueberry_burst.png" },
    { name: "Watermelon Chill", price: 50, category: "fruity", image: "watermelon_chill.png" },
    { name: "Pineapple Punch", price: 55, category: "fruity", image: "pineapple_punch.png" },
    { name: "Orange Zing", price: 50, category: "fruity", image: "mango_magic.png" },
    { name: "Kiwi Pop", price: 60, category: "fruity", image: "watermelon_chill.png" },
    { name: "Lychee Twist", price: 65, category: "fruity", image: "strawberry_splash.png" },

    // Creamy & Experimental (Trendy)
    { name: "Chocolate Fudge", price: 75, category: "creamy", image: "pineapple_punch.png" },
    { name: "Cookies & Cream", price: 80, category: "creamy", image: "blueberry_burst.png" },
    { name: "Vanilla Swirl", price: 60, category: "creamy", image: "mango_magic.png" },
    { name: "Caramel Drip", price: 75, category: "creamy", image: "pineapple_punch.png" },
    { name: "Nutella Crunch", price: 90, category: "creamy", image: "blueberry_burst.png" },

    { name: "Cola Freeze", price: 55, category: "experimental", image: "blueberry_burst.png" },
    { name: "Bubblegum Blast", price: 65, category: "experimental", image: "strawberry_splash.png" },
    { name: "Yogurt Berry Fusion", price: 85, category: "experimental", image: "mango_magic.png" },

    // Premium
    { name: "Belgian Dark Chocolate", price: 110, category: "premium", image: "blueberry_burst.png" },
    { name: "Pistachio Gold", price: 95, category: "premium", image: "watermelon_chill.png" },
    { name: "Matcha Mint", price: 90, category: "premium", image: "watermelon_chill.png" },
    { name: "Rose Milk Deluxe", price: 80, category: "premium", image: "strawberry_splash.png" }
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
                <button class="add-cart-icon" style="background:var(--primary-pink); color:white; border:none; width:40px; height:40px; border-radius:50%; cursor:pointer; font-size:1.2rem;" onclick="addToCart('${flavor.name}')">
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

renderMenu();

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
        buildPreview.src = selectedOption.dataset.img;
    }
}

baseSelect.addEventListener('change', updateBuild);
dipSelect.addEventListener('change', updateBuild);
sprinklesSelect.addEventListener('change', updateBuild);
```
