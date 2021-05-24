import {API_KEY} from "./keys.js";
import Polyline from '@mapbox/polyline';

class Places {
    static search(lat, lng, radius, type, keyword, price, setOptions, setImages, map, setNextPage, setDistances) {
        const meterRadius = radius * 1609.34;
        map.createMap(lat, lng, 13, meterRadius);
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("location", lat + "," + lng);
        url.searchParams.append("type", type)
        url.searchParams.append("opennow", true);
        url.searchParams.append("radius", meterRadius);
        url.searchParams.append("keyword", keyword);
        if(price[0] !== 0) url.searchParams.append("minprice", price[0]);
        if(price[1] !== 4) url.searchParams.append("maxprice", price[1]);
        
        fetch(url).then(res => {
            return res.json();
        }).then(res => {
            if(res.status === "OK") {
                setNextPage(res.next_page_token);
                setOptions(res.results);
                let promises = [];
                let imgArr = [];
                let distArr = [];
                for(let i = 0; i < res.results.length; i++) {
                    if(res.results[i].photos !== undefined) {
                        const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
                        url.searchParams.append("key", API_KEY);
                        url.searchParams.append("photoreference", res.results[i].photos[0].photo_reference);
                        url.searchParams.append("maxheight", 200);
                        
                        promises[i * 2] = fetch(url).then(res2 => {
                            imgArr[i] = res2.url;
                        });
                    }
                    else {
                        imgArr[i] = "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg";
                    }
                    const url2 = new URL("https://maps.googleapis.com/maps/api/directions/json");
                    url2.searchParams.append("key", API_KEY);
                    url2.searchParams.append("origin", lat + "," + lng);
                    url2.searchParams.append("destination", res.results[i].geometry.location.lat + "," + res.results[i].geometry.location.lng);
                    
                    promises[i * 2 + 1] = fetch(url2).then(res2 => {
                        return res2.json();
                    }).then(res2 => {
                        distArr[i] = {
                            value:res2.routes[0].legs[0].distance.value,
                            text:res2.routes[0].legs[0].distance.text,
                            poly:res2.routes[0].overview_polyline
                        }
                    });
                }   
                Promise.all(promises).then(() => {
                    setImages(imgArr);
                    setDistances(distArr);
                });
            }
            else alert("Search failed or returned zero results");
        });
    }

    static async searchByAddress(address, radius, type, keyword, price, setOptions, setImages, map, setNextPage, setDistances) {
        const url = new URL("https://maps.googleapis.com/maps/api/geocode/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("address", address);

        fetch(url).then(response => {
            return response.json();
        }).then(response => {
            if(response.status === "OK") this.search(response.results[0].geometry.location.lat, response.results[0].geometry.location.lng, radius, type, keyword, price, setOptions, setImages, map, setNextPage, setDistances);
            else alert("Search failed or returned zero results");
        });
    }

    static getDirections(poly) {
        return Polyline.decode(poly);
    }

    static loadMore(nextPage, setNextPage, options, setOptions, images, setImages, distances, setDistances) {
        const url = new URL("https://maps.googleapis.com/maps/api/place/nearbysearch/json");
        url.searchParams.append("key", API_KEY);
        url.searchParams.append("pagetoken", nextPage);
        fetch(url.href).then(res => {
            return res.json();
        }).then(res => {
            if(res.status === "OK") {
                setNextPage(res.next_page_token);
                setOptions([...options, ...res.results]);
                let promises = [];
                let imgArr = [];
                let distArr = [];
                for(let i = 0; i < res.results.length; i++) {
                    if(res.results[i].photos !== undefined) {
                        const url = new URL("https://maps.googleapis.com/maps/api/place/photo");
                        url.searchParams.append("key", API_KEY);
                        url.searchParams.append("photoreference", res.results[i].photos[0].photo_reference);
                        url.searchParams.append("maxheight", 200);
                        
                        promises[i * 2] = fetch(url).then(res2 => {
                            imgArr[i] = res2.url;
                        })
                    }
                    else {
                        imgArr[i] = "https://icon-library.net/images/no-image-icon/no-image-icon-0.jpg";
                    }
                    const url2 = new URL("https://maps.googleapis.com/maps/api/directions/json");
                    url2.searchParams.append("key", API_KEY);
                    url2.searchParams.append("origin", this.lat + "," + this.lng);
                    url2.searchParams.append("destination", res.results[i].geometry.location.lat + "," + res.results[i].geometry.location.lng);
                    
                    promises[i * 2 + 1] = fetch(url2).then(res2 => {
                        return res2.json();
                    }).then(res2 => {
                        distArr[i] = {
                            value:res2.routes[0].legs[0].distance.value,
                            text:res2.routes[0].legs[0].distance.text,
                            poly:res2.routes[0].overview_polyline
                        }
                    });
                }   
                Promise.all(promises).then(() => {
                    setImages([...images, ...imgArr]);
                    setDistances([...distances, ...distArr]);
                });
            }
            else alert("Search failed or returned zero results");
        });
    }
}

export default Places;