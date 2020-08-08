import React from 'react';
import styles from './viewSuggestedBook.module.css';
import { Link } from 'react-router-dom';

const ViewSuggestedBook = ({ book }) => {
    const { title, author, link } = book;

    const removeSug = () => {
        
    }

    return (
        <div className={styles.Book}>
            <div className={styles.info}>
                <div className={styles['info-link-box']}>{title}</div>
                <div className={styles['info-link-box']}>{author}</div>
                <div className={styles['info-link-box']}><a href={link} target="_blank" rel="noopener noreferrer" className={styles['info-link']}>{link}</a></div>
            </div>
            <div className={styles.buttons}>
                <Link to="/addBook"><button>Add</button></Link>
                <button onClick={removeSug}>Remove</button>
            </div>
        </div>
    )
};

export default ViewSuggestedBook;