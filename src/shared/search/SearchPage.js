import React, { useEffect, useState, useContext } from 'react';
import styles from '../../books/books.module.css';
// import styles from './searchPage.module.css';
import Book from '../../books/book/Book';
import { servises } from '../../services/servises';
import { UserContext } from '../../ContextWrapper';


const SearchPage = (props) => {
    const { lang, ren} = useContext(UserContext);
    const [books, setBooks] = useState([]);
    const {searchValue, genres} = props.location;

    useEffect(() => {
        servises.getSearch(setBooks, searchValue, genres);
    }, [searchValue, genres, ren]);

    return books.length > 0 ?
        <div className={styles.Books}>
            <h2>{lang === 'en' ? 'Search' : 'Търсене'}</h2>
            <div className={styles.container}>
                {books.sort((a, b) => { if (a.title < b.title) { return -1 } }).map((book) => <Book key={book._id} title={book.title} image={book.image} book={book} />)}
            </div>
        </div> :
        <div className={styles.Books}>
            <h2>{lang === 'en' ? 'No Result...' : 'Няма Резултат...'}</h2>
        </div>
}


export default SearchPage;
