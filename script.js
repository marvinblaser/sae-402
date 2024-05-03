let burger = document.querySelector(".burger-menu");
let menu = document.querySelector(".menu");
let cross = document.querySelector(".cross");

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
//         document.getElementById("elementToShow").style.display = "block";
//     } else {
//         // Masquez l'élément si l'utilisateur n'est pas dans la zone
//         document.getElementById("elementToShow").style.display = "none";
//     }
// }

// // Obtenir la position de l'utilisateur
// navigator.geolocation.getCurrentPosition(checkLocation, function(error) {
//     console.error("Erreur de géolocalisation :", error);
// });
