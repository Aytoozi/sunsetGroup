document.addEventListener('DOMContentLoaded', () => {
    const translations = {}; // Will be populated with JSON data
    const defaultLang = 'hr'; // Default language

    // Fetch translations from JSON file
    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            Object.assign(translations, data);
            setLanguage(defaultLang); // Set default language on load
        });

    // Set the language based on the button clicked
    window.setLanguage = function (lang) {
        // Update button position based on language selection
        const btn = document.getElementById('btnlang');
        btn.style.left = lang === 'hr' ? '52px' : '0';

        // Update translations in the document
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const translation = translations[lang] && translations[lang][key];
            el.textContent = translation || key;
        });
    };
});

window.addEventListener('scroll', function () {
    const navbar = document.querySelector('nav');

    // Toggle the 'sticky' class based on scroll position
    if (window.scrollY > 0) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// Initialize the map centered on Split
var map = L.map('map').setView([43.508133, 16.440193], 13);

// Use OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(map);

// Define default Leaflet icon
var defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

// Larger icon for hover effect
var enlargedIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [35, 51],
    iconAnchor: [17, 51]
});

// Array of restaurant data
var restaurants = [
    {
        name: 'Sunset Fast Food',
        lat: 43.507605220646894,
        lon: 16.464597057670808,
        address: 'Ul. Bruna Bušića 4'
    },
    {
        name: 'Sunset Fast Food',
        lat: 43.50480062496474,
        lon: 16.45658973260964,
        address: 'Spinčićeva ul. bb'
    },
    {
        name: 'Belvedere',
        lat: 43.51339125325193,
        lon: 16.47190242635596,
        address: 'Velebitska ul. 123'
    },
    {
        name: 'Rusulica',
        lat: 43.50548756254935,
        lon: 16.47405853960001,
        address: 'Ul. Dinka Šimunovića 14'
    },
    {
        name: 'Sinemori',
        lat: 43.507324182257,
        lon: 16.433861539611247,
        address: 'Trumbićeva obala 13'
    }
];

// Loop through restaurants and add markers with custom icons and popups
restaurants.forEach(function (restaurant) {
    var marker = L.marker([restaurant.lat, restaurant.lon], {
        icon: defaultIcon
    }).addTo(map);

    // Create a popup for each marker
    marker.bindPopup(`<b>${restaurant.name}</b><br>${restaurant.address}`);

    // On hover, enlarge the marker and open the popup
    marker.on('mouseover', function () {
        this.setIcon(enlargedIcon); // Change to larger icon
        this.openPopup();
    });

    // On mouseout, revert to default icon and close the popup
    marker.on('mouseout', function () {
        this.setIcon(defaultIcon); // Revert to default icon
        this.closePopup();
    });
});

window.addEventListener('scroll', function () {
    const benefits = document.querySelectorAll('.benefit');
    const triggerPoint = window.innerHeight / 1.2;

    benefits.forEach(benefit => {
        const benefitTop = benefit.getBoundingClientRect().top;
        const benefitBottom = benefit.getBoundingClientRect().bottom;

        // Show benefit when it enters the viewport
        if (benefitTop < triggerPoint) {
            benefit.classList.add('show');
            benefit.classList.remove('hide');
        }

        // Hide benefit when scrolled back up past it
        if (benefitBottom < 0 || benefitTop > window.innerHeight) {
            benefit.classList.add('hide');
            benefit.classList.remove('show');
        }
    });
});

window.addEventListener('scroll', function () {
    const logo = document.getElementById('logoImg');

    logo.style.opacity = 0;

    // Wait for the fade out transition to complete before changing the logo source

    if (window.scrollY === 0) {
        logo.src = 'images/logos/sunset group jhg-17.png'; // Default logo when scroll is at the top
    } else {
        logo.src = 'images/logos/sunset group-14.png'; // Different logo when scrolling
    }

    // Fade the logo back in after changing the source
    logo.style.opacity = 1;
    // Matches the 0.3s transition time

    const benefitCards = document.querySelectorAll('.benefit');
    benefitCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (cardPosition < screenPosition) {
            card.classList.add('show');
            card.classList.remove('hide');
        } else {
            card.classList.add('hide');
            card.classList.remove('show');
        }
    });
});

let calcScrollValue = () => {
    let scrollProgress = document.getElementById('progress');
    let progressValue = document.getElementById('progress-value');
    let pos = document.documentElement.scrollTop;
    let calcHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollValue = Math.round((pos * 100) / calcHeight);
    if (pos > 100) {
        scrollProgress.style.display = 'grid';
    } else {
        scrollProgress.style.display = 'none';
    }
    scrollProgress.addEventListener('click', () => {
        document.documentElement.scrollTop = 0;
    });
    scrollProgress.style.background = `conic-gradient(rgb(215,123,17)  ${scrollValue}%, #faca4a ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('mobile-nav');

// Function to toggle navigation and change the hamburger to an "X"
function toggleNavigation() {
    navLinks.classList.toggle('active'); // Toggle the mobile navigation menu
    hamburger.classList.toggle('active'); // Toggle the "X" class for the hamburger

    // Toggle the logo, section-1, and progress button visibility based on navLinks state
    const logoHeader = document.querySelector('.logoHeader');
    const section1 = document.getElementById('section-1');
    const progressBtn = document.getElementById('progress'); // Progress button

    if (navLinks.classList.contains('active')) {
        logoHeader.style.display = 'none'; // Hide logo when nav is active
        section1.style.display = 'none'; // Hide section-1 when nav is active
        progressBtn.style.visibility = 'hidden'; // Hide progress button when nav is active
    } else {
        logoHeader.style.display = 'block'; // Show logo when nav is inactive
        section1.style.display = 'block'; // Show section-1 when nav is inactive
        progressBtn.style.visibility = 'visible'; // Show progress button when nav is inactive
    }
}

// Event listener for the hamburger icon
hamburger.addEventListener('click', toggleNavigation);

// Close the menu and reset the hamburger when a link is clicked
navLinks.addEventListener('click', event => {
    if (event.target.tagName === 'A') {
        navLinks.classList.remove('active'); // Close the menu
        hamburger.classList.remove('active'); // Reset the hamburger to its original state

        // Show the logo, section-1, and progress button when a link is clicked
        const logoHeader = document.querySelector('.logoHeader');
        const section1 = document.getElementById('section-1');
        const progressBtn = document.getElementById('progress');
        logoHeader.style.display = 'block';
        section1.style.display = 'block';
        progressBtn.style.visibility = 'visible';
    }
});
