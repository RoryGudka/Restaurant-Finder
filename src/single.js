import Paper from '@material-ui/core/Paper';

const Single = props => {
    const rating = (5 - props.data.rating) / 0.05;
    const price = props.data.price_level === undefined ? "" : props.data.price_level === 1 ? "$" : props.data.price_level === 2 ? "$$" : props.data.price_level === 3 ? "$$$" : props.data.price_level === 4 ? "$$$$" : "";
    return (
        <div onClick={() => {
            props.data.marker.openPopup();
            props.data.marker._map.setView([props.data.marker._latlng.lat, props.data.marker._latlng.lng], 18);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }}> 
            <Paper style={{borderRadius:'10px', margin:'40px 0'}} elevation={3}>
                <img className="photo" src={props.data.imgURL} alt="" />
                <div style={{padding:'5px'}}>
                    <p style={{margin:'5px'}}><b>{props.data.name}</b></p>
                    <div className="starContainer" style={{margin:'5px'}}>
                        <img src="stars.jpg" className="stars" alt="" />
                        <div className="starCover" style={{width:rating + '%'}}></div>
                    </div> 
                    <p style={{display:"inline-block", margin:'5px'}}>({props.data.rating}) {price}</p>
                    <p style={{display:"inline-block", margin:'5px'}}>{props.data.distText}</p>
                </div>
            </Paper>
            <div className="singleCover"></div>
        </div>
        
    )
}

export default Single;