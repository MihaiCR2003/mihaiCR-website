// Current language
let currentLang = 'ro';

// Function to change language
function changeLanguage(lang) {
    currentLang = lang;
    
    // Update active state of language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.lang-btn:not([onclick*="${lang}"])`).classList.remove('active');
    document.querySelector(`.lang-btn[onclick*="${lang}"]`).classList.add('active');

    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Sample recipe data
const recipes = [
    {
        id: 1,
        title: {
            ro: 'Sarmale Moldovenești',
            de: 'Moldawische Kohlrouladen'
        },
        category: {
            ro: 'Feluri Principale',
            de: 'Hauptgerichte'
        },
        image: 'sarmale.jpg'
    },
    // Add more recipes here
];

// Function to create recipe cards
function createRecipeCards() {
    const recipesGrid = document.querySelector('.recipes-grid');
    recipesGrid.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card fade-in';
        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title[currentLang]}">
            <div class="recipe-content">
                <h3>${recipe.title[currentLang]}</h3>
                <p>${recipe.category[currentLang]}</p>
            </div>
        `;
        recipesGrid.appendChild(card);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Initialize the website
document.addEventListener('DOMContentLoaded', () => {
    // Set initial language
    changeLanguage('ro');
    
    // Create initial recipe cards
    createRecipeCards();

    // Add scroll animation to navigation
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
});