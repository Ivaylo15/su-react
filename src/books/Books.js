import React, { useState, useEffect, useContext } from 'react';
import styles from './books.module.css';
import Book from './book/Book';
import { servises } from '../services/servises';
import { UserContext } from '../ContextWrapper';
import Loader from '../shared/loader/Loader';
// import bookData from '../bookData';


const Books = () => {
    const { lang, ren } = useContext(UserContext);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        servises.getBook(setBooks)
    }, [ren])
    return books.length > 0 ?
        <div className={styles.Books}>
            <h2>{lang === 'en' ? 'Books' : 'Книги'}</h2>
            <div className={styles.container}>
                {books.sort((a, b) => { if (a.title < b.title) { return -1 } }).map((book) => <Book key={book._id} book={book} />)}
            </div>
        </div> : <Loader />
}

export default Books;