window.addEventListener('scroll', function() {
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
    { name: "Sunset Fast Food", lat: 43.507605220646894, lon: 16.464597057670808, address: "Sunset Fast Food 1, Ul. Bruna Bušića 4" },
    { name: "Sunset Fast Food", lat: 43.502410807347225, lon: 16.4787282, address: "Sunset Fast Food 2, Šetalište Pape Ivana Pavla II 36" },
    { name: "Belvedere", lat: 43.51339125325193, lon: 16.47190242635596, address: "Belvedere, Velebitska ul. 123" },
    { name: "Rusulica", lat: 43.50548756254935, lon: 16.47405853960001, address: "Rusulica, Ul. Dinka Šimunovića 14" },
    { name: "Sinemori", lat: 43.507324182257, lon: 16.433861539611247, address: "Sinemori, Trumbićeva obala 13" }
];

// Loop through restaurants and add markers with custom icons and popups
restaurants.forEach(function (restaurant) {
    var marker = L.marker([restaurant.lat, restaurant.lon], { icon: defaultIcon }).addTo(map);

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

window.addEventListener('scroll', function() {
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

