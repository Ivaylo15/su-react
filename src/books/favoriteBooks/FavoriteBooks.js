import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../ContextWrapper';
import Book from '../book/Book';
import { servises } from '../../services/servises';
import styles from '../books.module.css';


const FavoriteBooks = () => {
    const { lang } = useContext(UserContext);
    const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    useEffect(() => {
        servises.getUser(setUser);
    }, []);

    useEffect(() => {
        servises.getFavoriteBooks(user.favoriteBooks, setBooks);
    }, [user.favoriteBooks]);
    
    return (
        <div className={styles.Books}>
            <h2>{lang === 'en' ? "Favorit" : "Любими"}</h2>
            <div className={styles.container}>
                {books !== null || undefined ?
                    books.sort((a, b) => { if (a.title < b.title) { return -1 } }).map((book) => <Book key={book._id} book={book} />)
                    : <div> {lang === 'en' ? "No Favorite" : "Няма Любими"} </div>}
            </div>
        </div>

    )
}

export default FavoriteBooks;