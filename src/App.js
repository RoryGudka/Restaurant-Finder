import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet.js';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import {API_KEY, MAP_KEY} from "./keys.js";
import dummy from './DummyInfo.js';
import { React, useState, useEffect } from 'react';



function App() {
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [map, setMap] = useState([]);
/*
  useEffect(() => {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
    url.searchParams.append("key", API_KEY);
    url.searchParams.append("location", "38.0293,-78.4767");
    url.searchParams.append("type", "restaurant")
    url.searchParams.append("opennow", true);
    url.searchParams.append("radius", 50000);
    
    fetch(url).then(res => {
      return res.json();
    }).then(res => {
      setOptions(res.results);
      
      let promises = [];
      let imgArr = [];
      for(let i = 0; i < res.results.length; i++) {
        const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("photoreference", res.results[i].photos[0].photo_reference);
        url.searchParams.append("maxheight", 200);
        
        promises[i] = fetch(url).then(res2 => {
          imgArr[i] = res2.url;
        })
      }
      Promise.all(promises).then(() => {
        setImages(imgArr);
      });
    });
  }, []);
  */


  useEffect(() => {
    let map = L.map('map').setView([38.0293, -78.4767], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: MAP_KEY
    }).addTo(map);

    // Creates a red marker with the coffee icon
    var redMarker = L.AwesomeMarkers.icon({
      icon: 'coffee',
      prefix: 'fa',
      markerColor: 'red'
    });
        
    let marker = L.marker([38.0293,-78.4767], {icon: redMarker}).addTo(map);

    marker.bindPopup("test");

    var circle = L.circle([38.0293, -78.4767], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.05,
      radius: 5000
    }).addTo(map);
  });

  let cur = 0;
  const joined = options.map(obj => ({...obj, "imgURL":images[cur++]}));
  const content = dummy.map(obj => {
    const price = obj.price_level == undefined ? "" : obj.price_level === 1 ? "$" : obj.price_level === 2 ? "$$" : obj.price_level === 3 ? "$$$" : obj.price_level === 4 ? "$$$$" : "";
    return(
      <div>
        <li>{obj.name}: {obj.rating} stars, {price}</li>
        <img src={obj.imgURL} />
      </div>
    )
  });
  return (
    <div>
      
      {content}
      
    </div>
  );
}

export default App;
