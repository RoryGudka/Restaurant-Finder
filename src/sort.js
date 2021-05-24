import {useEffect, useState} from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button'

const Sort = props => {
    const [selection, setSelection] = useState("rating")
    const [options, setOptions] = useState(props.options);

    useEffect(() => {
        let different = false;
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
    }, [props.options])

    const sortByRating = () => {
        let newOptions = [];
        let newImages = [];
        for(let i = 0; i < props.options.length; i++) {
            let placed = false;
            for(let j = 0; j < newOptions.length; j++) {
                if(props.options[i].rating > newOptions[j].rating) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
    }

    const sortByDistance = () => {
        let newOptions = [];
        let newImages = [];
        for(let i = 0; i < props.options.length; i++) {
            let placed = false;
            for(let j = 0; j < newOptions.length; j++) {
                const curDist = Math.sqrt(Math.pow(props.options[i].geometry.location.lat - props.lat, 2) + Math.pow(props.options[i].geometry.location.lng - props.lng, 2));
                const newDist = Math.sqrt(Math.pow(newOptions[j].geometry.location.lat - props.lat, 2) + Math.pow(newOptions[j].geometry.location.lng - props.lng, 2));
                if(curDist < newDist) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
    }

    const sortByName = () => {
        let newOptions = [];
        let newImages = [];
        for(let i = 0; i < props.options.length; i++) {
            let placed = false;
            for(let j = 0; j < newOptions.length; j++) {
                if(props.options[i].name < newOptions[j].name) {
                    newOptions.splice(j, 0, props.options[i]);
                    newImages.splice(j, 0, props.images[i]);
                    j = newOptions.length;
                    placed = true;
                }
            }
            if(!placed) {
                newOptions.push(props.options[i]);
                newImages.push(props.images[i]);
            }
        }
        props.setOptions(newOptions);
        props.setImages(newImages);
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
                    props.loadMore(props.nextPage, props.setNextPage, props.options, props.setOptions, props.images, props.setImages)
                }}>Load More Results</Button>
            </div>
        </div>
    )
}

export default Sort;