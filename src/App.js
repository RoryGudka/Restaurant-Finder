import './App.css';
import { React, useState, useEffect } from 'react';
import Places from './places.js';
import Map from './map.js';
import Search from './search.js';
import Sort from './sort.js';
import Collection from './collection.js';



function App() {
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [distances, setDistances] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [nextPage, setNextPage] = useState("");

  const showDirections = (e) => {
    map.showDirections(JSON.parse(e.detail.poly));
  }
  
  useEffect(() => {
    let map = new Map();
    map.createMap(38.0293, -78.4767, 13, 8046.7);
    Places.search(38.0293, -78.4767, 5, "restaurant", "", [0, 4], setOptions, setImages, map, setNextPage, setDistances)
    setMap(map);
  }, []);

  useEffect(() => {
    document.addEventListener('showDirections', showDirections);
    return () => {
      document.removeEventListener('showDirections', showDirections);
    }
  }, [map])

  let cur = 0;
  const joined = options.map(obj => ({...obj, "imgURL":images[cur], "distVal":distances[cur] !== undefined && distances[cur].value, "distText":distances[cur] !== undefined && distances[cur].text, "poly":distances[cur] !== undefined && distances[cur].poly, "marker":markers[cur++]}));

  useEffect(() => {
    if(options.length !== 0 && map !== null && distances.length === options.length) {
      setMarkers(map.setMarkers(joined, markers));
    }
  }, [map, options, distances]);

  
  return (
    <div>
      <Search map={map} Places={Places} setOptions={setOptions} setImages={setImages} setNextPage={setNextPage} setDistances={setDistances} />
      <Sort nextPage={nextPage} setNextPage={setNextPage} loadMore={Places.loadMore} lat={map !== null && map.lat} lng={map !== null && map.lng} options={options} images={images} setOptions={setOptions} setImages={setImages} distances={distances} setDistances={setDistances} joined={joined} />
      <Collection data={joined} />
    </div>
  );
}

export default App;
