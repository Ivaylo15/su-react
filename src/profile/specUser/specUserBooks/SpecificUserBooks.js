import React, { useState, useEffect } from 'react';
import { servises } from '../../../services/servises';
import SpecificUserBook from './specUserBook/SpecificUserBook';


const SpecificUserBooks = ({ favoriteBooks }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        servises.getFavoriteBooks(favoriteBooks, setBooks);

    }, [favoriteBooks]);

    return (
        <div>
            {books !== undefined ? books.sort((a, b) => { if (a.title < b.title) { return -1 } }).map(book => <SpecificUserBook key={book._id} book={book} />) : null}
        </div>
    )
};

export default SpecificUserBooks;