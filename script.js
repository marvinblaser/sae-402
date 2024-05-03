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


var specificLocations = [
    { latitude: 47.745182428813486, longitude: 7.336843972538822, zone: "Zone 1" },
    { latitude: 47.74828815789348, longitude: 7.34131985574736, zone: "Zone 2" },
    { latitude: 47.743271058471, longitude: 7.342539279245852, zone: "Zone 3" }
];

var zoneRadius = 10;

function checkLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    for (var i = 0; i < specificLocations.length; i++) {
        var specificLatitude = specificLocations[i].latitude;
        var specificLongitude = specificLocations[i].longitude;
        var zone = specificLocations[i].zone;

        var deltaLatitude = Math.abs(latitude - specificLatitude);
        var deltaLongitude = Math.abs(longitude - specificLongitude);

        var distance = Math.sqrt(Math.pow(deltaLatitude * 111000, 2) + Math.pow(deltaLongitude * 111000, 2));

        if (distance <= zoneRadius) {
            console.log("L'utilisateur est dans la", zone);
            switch (zone) {
                case "Zone 1":
                    location.href = "https://sae-402.vercel.app/piano/piano.html"
                    break;
                case "Zone 2":
                    location.href = "https://sae-402.vercel.app/space-invaders/index.html"
                    break;
                case "Zone 3":
                    location.href = "https://sae-402.vercel.app/dino-run/index.html"
                    break;
            }
            return;
        }
    }
}

navigator.geolocation.watchPosition(checkLocation, function(error) {
    console.error("Erreur de géolocalisation :", error);
});





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
    iconSize:     [35, 40],
    iconAnchor:   [12, 41],
    popupAnchor:  [0, -41]
});

var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

var marker;

if (navigator.geolocation) {
    var watchId = navigator.geolocation.watchPosition(
        function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            if (marker) {
                map.removeLayer(marker);
            }

            marker = L.marker([lat, lng], {icon: pin}).addTo(map).bindPopup('Your location');

            map.setView([lat, lng]);
        }
    );
} else {
    console.error("Geolocation is not supported by this browser.");
}
