import React, { useEffect, useState } from 'react';
import styles from '../../books/books.module.css';
import Book from '../../books/book/Book';
import { servises } from '../../services/servises';


const GenresView = (props) => {
    const [books, setBooks] = useState([]);

    let url = props.location.pathname.split('/')[2];


    useEffect(() => {
        console.log('effect')
        servises.getBooksByGenre(setBooks, url);
    }, [url]);

    return books.length > 0 ?
        <div className={styles.Books}>
            <h2>{url}</h2>
            <div className={styles.container}>
                {books.sort((a, b) => { if (a.title < b.title) { return -1 } }).map((book) => <Book key={book._id} title={book.title} image={book.image} book={book} />)}
            </div>
        </div> :
        <div className={styles.Books}>
            {/* <h2>{lang === 'en' ? 'No Result...' : 'Няма Резултат...'}</h2> */}
        </div>
}


export default GenresView;
