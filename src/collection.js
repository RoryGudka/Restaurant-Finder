import Column from './column.js';
import Single from './single.js';

const Collection = props => {
    const content = props.data.map(option => {
        return (
            <Single data={option} />
        )
    })

    let collection = [];
    for(let i = 0; i < content.length; i += Math.ceil(content.length / 4)) {
        let subCollection = [];
        for(let j = i; j < i + Math.ceil(content.length / 4) && j < content.length; j++) {
            subCollection.push(content[j]);
        }
        collection.push(
            <Column container content={subCollection} />
        )
    }
    return (
        <div id="collection">
            {collection}
        </div>
    )
}

export default Collection;