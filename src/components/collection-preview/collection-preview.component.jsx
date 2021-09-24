import React from "react";

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items }) => (
    <div className='collection-preview'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <div className='preview'>   
            {
                items
                .filter((item, idx) => idx < 4)// make sure we only display the 1st 4 (0 to 3) items for each collection
                .map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))
            }
        </div>
    </div>
);

export default CollectionPreview;