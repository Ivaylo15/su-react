import React, { useState, useEffect, useContext } from 'react';
import { servises } from '../../../services/servises';
import ViewSuggestedBook from './viewSuggestedBook/ViewSuggestedBook';
import styles from './viewSuggestedBooks.module.css';
import { UserContext } from '../../../ContextWrapper';

const ViewSuggestedBooks = () => {
    const { ren, lang } = useContext(UserContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        servises.getSuggestedBooks(setBooks);
    }, [ren]);

    return (
        <div className={styles['sugg-books']}>
            <h2>{lang === 'en' ? 'Suggested Books' : 'Предложени Книги'}</h2>
            {books.map(book => <ViewSuggestedBook key={book._id} book={book} />)}
        </div>
    );
};

export default ViewSuggestedBooks;