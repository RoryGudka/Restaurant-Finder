import {API_KEY} from "./keys.js";
import Polyline from '@mapbox/polyline';

class Places {
    static search(lat, lng, radius, type, keyword, price, setOptions, setImages, map, setNextPage) {
        const meterRadius = radius * 1609.34;
        map.createMap(lat, lng, 13, meterRadius);
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("location", lat + "," + lng);
        url.searchParams.append("type", type)
        url.searchParams.append("opennow", true);
        url.searchParams.append("radius", meterRadius);
        url.searchParams.append("keyword", keyword);
        if(price[0] != 0) url.searchParams.append("minprice", price[0]);
        if(price[1] != 4) url.searchParams.append("maxprice", price[1]);
        
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            if(res.status === "OK") {
                setNextPage(res.next_page_token);
                setOptions(res.results);
                let promises = [];
                let imgArr = [];
                for(let i = 0; i < res.results.length; i++) {
                    if(res.results[i].photos !== undefined) {
                        const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
                        url.searchParams.append("key", API_KEY);
                        url.searchParams.append("photoreference", res.results[i].photos[0].photo_reference);
                        url.searchParams.append("maxheight", 200);
                        
                        promises[i] = fetch(url).then(res2 => {
                            imgArr[i] = res2.url;
                        })
                    }
                    else {
                        imgArr[i] = "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg";
                    }
                }   
                Promise.all(promises).then(() => {
                    setImages(imgArr);
                });
            }
            else alert("Search failed or returned zero results");
        });
    }

    static async searchByAddress(address, radius, type, keyword, price, setOptions, setImages, map, setNextPage) {
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("address", address);
        console.log(address);

        fetch(url).then(response => {
            return response.json();
        }).then(response => {
            if(response.status == "OK") this.search(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, radius, type, keyword, price, setOptions, setImages, map, setNextPage);
            else alert("Search failed or returned zero results");
        });
    }

    static getDirections(oLat, oLng, dLat, dLng) {
        const url = new URL("https://maps.googleapis.com/maps/api/directions/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("origin", oLat + "," + oLng);
        url.searchParams.append("destination", dLat + "," + dLng);

        return fetch(url).then(response => {
            return response.json();
        }).then(response => {
            return Promise.resolve(Polyline.decode(response.routes[0].overview_polyline.points));
        });
    }

    static loadMore(nextPage, setNextPage, options, setOptions, images, setImages) {
        console.log(nextPage);
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("pagetoken", nextPage);
        console.log(url.href);
        fetch(url.href).then(res => {
            return res.json();
        }).then(res => {
            if(res.status === "OK") {
                setNextPage(res.next_page_token);
                setOptions([...options, ...res.results]);
                let promises = [];
                let imgArr = [];
                for(let i = 0; i < res.results.length; i++) {
                    if(res.results[i].photos !== undefined) {
                        const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
                        url.searchParams.append("key", API_KEY);
                        url.searchParams.append("photoreference", res.results[i].photos[0].photo_reference);
                        url.searchParams.append("maxheight", 200);
                        
                        promises[i] = fetch(url).then(res2 => {
                            imgArr[i] = res2.url;
                        })
                    }
                    else {
                        imgArr[i] = "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg";
                    }
                }   
                Promise.all(promises).then(() => {
                    setImages([...images, ...imgArr]);
                });
            }
            else alert("Search failed or returned zero results");
        });
    }
}

export default Places;