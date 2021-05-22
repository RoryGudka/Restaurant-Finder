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

  /*
  useEffect(() => {
    Places.search(38.0293, -78.4767, 5000, "restaurant", setOptions, setImages)
  }, []);
  */
  
  useEffect(() => {
    console.log(Places.addressToGeocode("charlottesville"))
    let map = new Map();
    map.createMap(38.0293, -78.4767, 13)
    setMap(map);
    setOptions(dummy);
  }, []);

  useEffect(() => {
    if(options.length !== 0 && map !== null) {
      setMarkers(map.setMarkers(options));
    }
  }, [map, options]);

  //"imgURL":images[cur],
  let cur = 0;
  const joined = options.map(obj => ({...obj, "marker":markers[cur++]}));
  return (
    <div>
      <Search />
      <Collection data={joined} />
    </div>
  );
}

export default App;
