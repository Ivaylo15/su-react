import React from 'react';
import SpecificUserBook from './specUserBook/SpecificUserBook';


const SpecificUserBooks = ({ favoriteBooks }) => {

    return (
        <div>
            {favoriteBooks !== undefined ? favoriteBooks.sort((a, b) => { if (a.title < b.title) { return -1 } }).map(book => <SpecificUserBook key={book._id} book={book} />) : null}
        </div>
    )
};

export default SpecificUserBooks;