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




var map = L.map('map').setView([47.74973052576295, 7.336601220694807], 15);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var first_game = L.marker([47.74517815858541, 7.336845007529663]).addTo(map).bindPopup("1st Game");
var second_game = L.marker([47.74829163081054, 7.3413309769544215]).addTo(map).bindPopup("2nd Game");
var third = L.marker([47.74326626503717, 7.34248483050478]).addTo(map).bindPopup("3rd Game");


var latlngs = [
    [47.74518506270431, 7.33685555644084],
    [47.745217492657254, 7.337139679910473],
    [47.74560009131443, 7.337408998259031],
    [47.745592439368856, 7.337936255307616],
    [47.74577581618694, 7.337912038915831],
    [47.74599006948327, 7.338719993961501],
    [47.74646193375209, 7.339209318848317],
    [47.74634715635069, 7.3397365758969],
    [47.74704346871129, 7.34001727393692],
    [47.74715314343303, 7.340347283744305],
    [47.74761989607686, 7.3399565825057],
    [47.747869849314384, 7.340241073718965],
    [47.74827028210114, 7.341322140329371],
    [47.748296301968495, 7.341398282651669],
    [47.747746903905835, 7.342060812354868],
    [47.74766540362383, 7.342064002056753],
    [47.74690897755831, 7.342983186163047],
    [47.74631272609473, 7.342718440904489],
    [47.7461005046161, 7.341830235382743],
    [47.74586074541286, 7.341568503467863],
    [47.744439702508245, 7.342445256036417],
    [47.743869941406494, 7.342720249096022],
    [47.7432842960981, 7.342534398303128]
];

var pin = L.icon({
    iconUrl: 'stock/img/pin.png',
    iconSize:     [35, 40], // size of the icon
    iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -41] // point from which the popup should open relative to the iconAnchor
});

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

if (navigator.geolocation) {
    // Demander à l'utilisateur l'autorisation d'accéder à sa position
    var watchId = navigator.geolocation.watchPosition(
        // Fonction de rappel en cas de succès
        function(position) {
            // Récupérer les coordonnées de latitude et longitude de l'utilisateur
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            // Créer un marqueur avec la position de l'utilisateur
            var marker = L.marker([lat, lng], {icon: pin}).addTo(map).bindPopup('Your location');

            // Mettre à jour la position du marqueur avec les nouvelles coordonnées
            marker.setLatLng([lat, lng]);

            // Centrer la carte sur la nouvelle position de l'utilisateur
            map.setView([lat, lng]);
        },
        // Fonction de rappel en cas d'erreur
        function(error) {
            // Gérer les erreurs, par exemple si l'utilisateur refuse le partage de sa position
            console.error("Error getting user location:", error);
        }
    );
} else {
    // La géolocalisation n'est pas prise en charge par le navigateur
    console.error("Geolocation is not supported by this browser.");
}