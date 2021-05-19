import { React, useState, useEffect } from 'react';
import './App.css';
import dummy from './DummyInfo.js';


function App() {
  const [options, setOptions] = useState([]);
  const [images, setImages] = useState([]);
/*
  useEffect(() => {
    const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
    url.searchParams.append("key", "AIzaSyBCMFBFFQb_NoAvgJa3TMWx-S4OSiynaQg");
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
        url.searchParams.append("key", "AIzaSyBCMFBFFQb_NoAvgJa3TMWx-S4OSiynaQg");
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
