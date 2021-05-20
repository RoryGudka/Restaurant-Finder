import '@fortawesome/fontawesome-free/css/all.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet.js';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import {MAP_KEY} from "./keys.js";

class Map {
    constructor() {
        this.map = null;
    }

    createMap(lat, lng, zoom) {
        if(this.map !== null) {
            this.map.remove();
        }

        let map = L.map('map').setView([lat, lng], zoom);
        this.map = map;

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: MAP_KEY
        }).addTo(map);

        // Creates a red marker with the coffee icon
        const redMarker = L.AwesomeMarkers.icon({
            icon: 'home',
            prefix: 'fa',
            markerColor: 'blue'
        });
        const marker = L.marker([lat, lng], {icon: redMarker}).addTo(map);
        marker.bindPopup("Current Location");
        var circle = L.circle([lat, lng], {
            color: 'lightblue',
            fillColor: '#00f',
            fillOpacity: 0.05,
            radius: 5000
        }).addTo(map);
    }

    setMarkers(options) {
        let markers = [];
        for(let i = 0; i < options.length; i++) {
            const price = options[i].price_level == undefined ? "" : options[i].price_level === 1 ? "$" : options[i].price_level === 2 ? "$$" : options[i].price_level === 3 ? "$$$" : options[i].price_level === 4 ? "$$$$" : "";
            const rating = (5 - options[i].rating) / 0.05;
            let type = "";
            for(let j = 0; j < options[i].types.length; j++) {
                if(options[i].types[j] == "restaurant") type = "utensils";
                else if(options[i].types[j] == "cafe") type = "coffee";
                else if(options[i].types[j] == "bar") type = "beer";
                if(type !== "") j = options[i].types.length;
            }
            if(type === "") type = "utensils";
            // Creates a red marker with the coffee icon
            const redMarker = L.AwesomeMarkers.icon({
                icon: type,
                prefix: 'fa',
                markerColor: 'red'
            });
            const marker = L.marker([options[i].geometry.location.lat, options[i].geometry.location.lng], {icon: redMarker}).addTo(this.map);
            marker.bindPopup('<b>' + options[i].name + '</b><br>' + '<div class="starContainer"><img src="stars.jpg" class="stars"><div class="starCover" style="width:' + rating + '%"></div></div>' + '(' + options[i].rating + ') ' + price);
            markers.push(marker);
        } 
        return markers;
    }

    
}

export default Map;