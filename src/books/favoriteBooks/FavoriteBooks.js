import React, { useContext } from 'react';
import { UserContext } from '../../ContextWrapper';
import Book from '../book/Book';
import styles from '../books.module.css';


const FavoriteBooks = () => {
    const { lang, user } = useContext(UserContext);

    return (
        <div className={styles.Books}>
            {
                user.favoriteBooks.length > 0 && user.favoriteBooks !== undefined ? <div>
                    <h2>{lang === 'en' ? "Favorit" : "Любими"}</h2>
                    <div className={styles.container}>
                        {
                            user.favoriteBooks.sort((a, b) => { if (a.title < b.title) { return -1 } }).map((book) => <Book key={book._id} book={book} />)
                        }
                    </div>
                </div> : <div> <h2>{lang === 'en' ? "No Favorite" : "Няма Любими"} </h2></div>
            }
        </div>

    )
}

export default FavoriteBooks;