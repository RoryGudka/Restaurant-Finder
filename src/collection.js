import Column from './column.js';
import Single from './single.js';

const Collection = props => {
    const content = props.data.map(option => {
        return (
            <Single data={option} />
        )
    })

    let subCollections = [[], [], [], []];
    for(let i = 0; i < content.length; i++) {
        if(i % 4 == 0) subCollections[0].push(content[i]);
        else if(i % 4 == 1) subCollections[1].push(content[i]);
        else if(i % 4 == 2) subCollections[2].push(content[i]);
        else subCollections[3].push(content[i]);
    }
    const collection = subCollections.map(content => <Column container content={content} />)
    return (
        <div id="collection">
            {collection}
        </div>
    )
}

export default Collection;