import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../specUserBook/specificUserBook.module.css';

const SpecificUserBook = ({ book }) => {

    const { _id, title, image, author, genres } = book;
    return (
        <div className={styles.Book}>
            <div className={styles.bookContainer}>
                <div className={styles.img}>
                    <Link to={'/details/' + _id} className={styles.Link}><img alt={title} src={image} /></Link>
                </div>
                <div className={styles.info}>
                    <div className={styles['info-link-box']}><Link to={'/details/' + _id} className={styles['info-link']}>{title}</Link></div>
                    <div className={styles['info-link-box']}><Link to={`/author/${author}`} className={styles['info-link']}>{author}</Link></div>
                    {genres !== undefined ?
                        <div className={styles['genres']}>
                            {genres.map(genre =>
                                <Link key={genre} to={`/genres/${genre}`}><div className={styles['genre']}>{genre}</div></Link>)}
                        </div>
                        : null}
                </div>
            </div>
        </div>
    )
}

export default SpecificUserBook;