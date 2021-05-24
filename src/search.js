import { React, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const Search = props => {
    const [address, setAddress] = useState("");
    const [type, setType] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [radius, setRadius] = useState(5);
    const [price, setPrice] = useState([0, 4]);


    const radiusMarks = [
        {value:0, label:"0 Miles"},
        {value:30, label:"30 Miles"}
    ]
    const priceMarks = [
        {value:0, label:"0"},
        {value:1, label:"1"},
        {value:2, label:"2"},
        {value:3, label:"3"},
        {value:4, label:"4"}
    ]

    return (
        <Paper elevation={5} id="searchItemsWrapper">
            <div id="addressWrapper">
                <TextField fullWidth label="Address" value={address} onChange={e=>setAddress(e.target.value)} />
            </div>
            <div id="typeWrapper">
                <InputLabel id="typeSelect">Type</InputLabel>
                <Select fullWidth labelId="typeSelect" value={type} onChange={e=>setType(e.target.value)}>
                    <MenuItem value={0}>Restaurant</MenuItem>
                    <MenuItem value={1}>Cafe</MenuItem>
                    <MenuItem value={2}>Bar</MenuItem>
                </Select>
            </div>
            <div id="keywordWrapper">
                <TextField fullWidth style={{marginTop:'-18px'}} label="Keywords" value={keyword} onChange={e => setKeyword(e.target.value)} />
            </div>
            <br></br>
            <div id="radiusWrapper">
                <Typography id="radiusSlider" gutterBottom>Radius</Typography>
                <Slider min={0.25} max={30} step={0.25} value={radius} valueLabelDisplay="auto" aria-labelledby="radiusSlider" marks={radiusMarks} onChange={(e, val)=>{
                    props.map.setRadius(val * 1609.34);
                    setRadius(val);
                    }} />
            </div>
            <div id="priceWrapper">
                <Typography id="priceSlider" gutterBottom>Price</Typography>
                <Slider min={0} max={4} value={price} onChange={(e, val)=>setPrice(val)} valueLabelDisplay="auto" aria-labelledby="priceSlider" marks={priceMarks} />
            </div>
            <br></br>
            <div id='searchWrapper'>
                <Button variant="contained" color="primary" onClick={() => {
                    const typeStr = type === 0 ? "restaurant" : type === 1 ? "cafe" : "bar";
                    props.Places.searchByAddress(address, radius, typeStr, keyword, price, props.setOptions, props.setImages, props.map, props.setNextPage, props.setDistances);
                }}>Search</Button>
            </div>
        </Paper>
    )
}

export default Search;