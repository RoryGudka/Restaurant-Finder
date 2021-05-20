const Column = props => {
    console.log(props.content);
    return (
        <div className='column'>
            {props.content}
        </div>
    )
}

export default Column;