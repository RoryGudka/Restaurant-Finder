import {useEffect, useState} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button'

const Sort = props => {
    const [selection, setSelection] = useState("rating")
    const [options, setOptions] = useState(props.options);

    useEffect(() => {
        let different = false;
        
        if(props.images.length === props.options.length && props.distances.length === props.options.length) {
            if(options.length === props.options.length) {
                for(let i = 0; i < options.length; i++) {
                    let found = false;
                    for(let j = 0; j < props.options.length; j++) {
                        if(options[i].name === props.options[j].name) found = true;
                    }
                    if(!found) different = true;
                }
                if(different) {
                    setOptions(props.options);
                    if(selection === "rating") sortByRating();
                    else sortByDistance();
                }
            }
            else {
                setOptions(props.options);
                if(selection === "rating") sortByRating();
                else sortByDistance();
            }
        }
    })

    const sortByRating = () => {
        let newOptions = [];
        let newImages = [];
        let newDistances = [];
        for(let i = 0; i < props.joined.length; i++) {
            let placed = false;
            for(let j = 0; j < newOptions.length; j++) {
                if(props.joined[i].rating > newOptions[j].rating) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    newDistances.splice(j, 0, props.distances[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
                newDistances.push(props.distances[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
        props.setDistances(newDistances);
    }

    const sortByDistance = () => {
        let newOptions = [];
        let newImages = [];
        let newDistances = [];
        for(let i = 0; i < props.joined.length; i++) {
            let placed = false;
            for(let j = 0; j < newDistances.length; j++) {
                if(props.joined[i].distVal < newDistances[j].value) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    newDistances.splice(j, 0, props.distances[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
                newDistances.push(props.distances[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
        props.setDistances(newDistances);
    }

    const sortByName = () => {
        let newOptions = [];
        let newImages = [];
        let newDistances = [];
        for(let i = 0; i < props.joined.length; i++) {
            let placed = false;
            for(let j = 0; j < newOptions.length; j++) {
                if(props.joined[i].name < newOptions[j].name) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    newDistances.splice(j, 0, props.distances[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
                newDistances.push(props.distances[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
        props.setDistances(newDistances);
    }

    

    const handleSelection = (e, newSelection) => {
        if(newSelection !== null) {
            if(newSelection === "rating") sortByRating();
            else if(newSelection === "name") sortByName();
            else sortByDistance();
            setSelection(newSelection);
        }
    };

    return (
        <div>
            <div style={{textAlign:"center"}}>
                <p id="sortLabel">Sort by:</p>
                <ToggleButtonGroup value={selection} exclusive onChange={handleSelection}>
                    <ToggleButton style={{color:"black"}} value="rating">Rating</ToggleButton>
                    <ToggleButton style={{color:"black"}} value="distance">Distance</ToggleButton>
                    <ToggleButton style={{color:"black"}} value="name">Name</ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div id="loadMoreWrapper">
                <Button variant="contained" color="primary" onClick={() => {
                    props.loadMore(props.nextPage, props.setNextPage, props.options, props.setOptions, props.images, props.setImages, props.distances, props.setDistances);
                }}>Load More Results</Button>
            </div>
        </div>
    )
}

export default Sort;