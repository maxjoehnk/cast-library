import * as React from 'react';
import { useEffect, useState } from 'react';
import './library.scss';

const LibraryView = () => {
    const [libraries, setLibraries] = useState([]);

    useEffect(() => {
        fetch('/api/library')
            .then(res => res.json())
            .then(lib => setLibraries(lib));
    }, []);

    return <div className="library-view">
        {libraries.filter(l => l.media.length > 0).map(lib => <Library library={lib}/>)}
    </div>;
};

const Library = ({ library }) => {
    return <div className="library">
        <h2 className="library__title">{library.title}</h2>
        <div className="library__media">
            {library.media.map(item => <LibraryItem item={item}/>)}
        </div>
    </div>;
};

const LibraryItem = ({ item }) => {
    return <div className="library-item">
        <h3 className="library-item__title">{item.title}</h3>
        <img className="library-item__cover" src={item.cover}/>
    </div>;
};

export default LibraryView;