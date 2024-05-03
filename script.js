let burger = document.querySelector(".burger-menu");
let menu = document.querySelector(".menu");
let cross = document.querySelector(".cross");
let cross_popup = document.querySelector(".cross-popup");
let map_popup = document.querySelector(".map-popup");
let map_menu = document.querySelector(".map-menu");

cross_popup.addEventListener("click", function(){
    map_popup.style.opacity = "0"
    map_popup.style.zIndex = "-1"
})
map_menu.addEventListener("click", function(){
    map_popup.style.opacity = "1"
    map_popup.style.zIndex = "50"
    menu.style.left = "-100%"
})

burger.addEventListener("click", function(){
    menu.style.left = "0%"
})
cross.addEventListener("click", function(){
    menu.style.left = "-100%"
})


// // Coordonnées spécifiques (latitude et longitude)
// var specificLatitude = 47.72986334201951;
// var specificLongitude = 7.301729263688992;

// // Rayon de la zone (en mètres)
// var zoneRadius = 10; // Par exemple, 100 mètres

// // Fonction pour vérifier si la position de l'utilisateur est dans la zone spécifique
// function checkLocation(position) {
//     var latitude = position.coords.latitude;
//     var longitude = position.coords.longitude;

//     // Calculer la distance en latitude et longitude
//     var deltaLatitude = Math.abs(latitude - specificLatitude);
//     var deltaLongitude = Math.abs(longitude - specificLongitude);

//     // Convertir la différence en latitude et longitude en distance en mètres (approximativement)
//     var distance = Math.sqrt(Math.pow(deltaLatitude * 111000, 2) + Math.pow(deltaLongitude * 111000, 2));

//     // Vérifier si la distance est inférieure ou égale au rayon de la zone
//     if (distance <= zoneRadius) {
//         // Affichez l'élément si l'utilisateur est dans la zone
//     } else {
//         // Masquez l'élément si l'utilisateur n'est pas dans la zone
//     }
// }

// // Obtenir la position de l'utilisateur
// navigator.geolocation.getCurrentPosition(checkLocation, function(error) {
//     console.error("Erreur de géolocalisation :", error);
// });




var map = L.map('map').setView([47.74973052576295, 7.336601220694807], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Check if geolocation is supported by the browser
if (navigator.geolocation) {
    // Prompt user for permission to access their location
    navigator.geolocation.getCurrentPosition(
      // Success callback function
      function(position){
        // Get the user's latitude and longitude coordinates
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        // Do something with the location data, e.g. display on a map
        console.log(`Latitude: ${lat}, longitude: ${lng}`);
        L.marker([lat, lng]).addTo(map)
        .bindPopup('Your location')
      },
      // Error callback function
      function(error) {
        // Handle errors, e.g. user denied location sharing permissions
        console.error("Error getting user location:", error);
      }
    );
  } else {
    // Geolocation is not supported by the browser
    console.error("Geolocation is not supported by this browser.");
  }