import React, { useState, useEffect } from 'react';
import { servises } from '../../../services/servises';
import ViewSuggestedBook from './viewSuggestedBook/ViewSuggestedBook';
import styles from './viewSuggestedBooks.module.css';

const ViewSuggestedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        servises.getSuggestedBooks(setBooks);
    }, []);

    return (
        <div className={styles['sugg-books']}>
            <h2>Suggested Books</h2>
            {books.map(book => <ViewSuggestedBook key={book._id} book={book} />)}
        </div>
    );
};

export default ViewSuggestedBooks;