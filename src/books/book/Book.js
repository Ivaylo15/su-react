import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../book/book.module.css';

const Book = ({book}) => {

    const { _id, title, image} = book;
    return (
        <div className={styles.Book}>
            <div className={styles.bookContainer}>
                <div className={styles.img}>
                    <Link to={'/details/' + _id}  className={styles.Link}><img alt={title} src={image} /></Link>
                </div>
                <div className={styles.title}>
                    <Link to={'/details/' + _id}  className={styles.Link}>{title}</Link>
                </div>
            </div>
        </div>
    )
}

export default Book;