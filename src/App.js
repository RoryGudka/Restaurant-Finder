import './App.css';
import dummy from './DummyInfo.js';
import { React, useState, useEffect } from 'react';
import Places from './places.js';
import Map from './map.js';
import Search from './search.js';
import Collection from './collection.js';



function App() {
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const showDirections = (e) => {
    Places.getDirections(e.detail.oLat, e.detail.oLng, e.detail.dLat, e.detail.dLng).then(points => {
      map.showDirections(points);
    })
  }
  
  useEffect(() => {
    let map = new Map();
    map.createMap(38.0293, -78.4767, 13, 8046.7);
    Places.search(38.0293, -78.4767, 5, "restaurant", "", [0, 4], setOptions, setImages, map)
    setMap(map);
    document.addEventListener('showDirections', showDirections);
    return () => {
      document.removeEventListener('showDirections', showDirections);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('showDirections', showDirections);
    return () => {
      document.removeEventListener('showDirections', showDirections);
    }
  }, [map])

  useEffect(() => {
    if(options.length !== 0 && map !== null) {
      setMarkers(map.setMarkers(options));
    }
  }, [map, options]);

  //"imgURL":images[cur],
  let cur = 0;
  const joined = options.map(obj => ({...obj, "imgURL":images[cur], "marker":markers[cur++]}));
  return (
    <div>
      <Search map={map} Places={Places} setOptions={setOptions} setImages={setImages} />
      <Collection data={joined} />
    </div>
  );
}

export default App;
