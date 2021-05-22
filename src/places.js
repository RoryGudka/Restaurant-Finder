import {API_KEY} from "./keys.js";

class Places {
    static search(lat, lng, radius, type, setOptions, setImages) {
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("location", lat + "," + lng);
        url.searchParams.append("type", type)
        url.searchParams.append("opennow", true);
        url.searchParams.append("radius", radius);
        
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
    }

    static addressToGeocode(address) {
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("address", address);
        fetch(url).then(response => {
            return response.json();
        }).then(response => {
            return response;
        });
    }
}

export default Places;