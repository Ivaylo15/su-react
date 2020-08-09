import React, { useContext } from 'react';
import styles from './viewSuggestedBook.module.css';
import { Link } from 'react-router-dom';
import { servises } from '../../../../services/servises';
import { UserContext } from '../../../../ContextWrapper';

const ViewSuggestedBook = ({ book }) => {
    const { rendering, lang } = useContext(UserContext);
    const { _id, title, author, link } = book;

    const removeSug = () => {
        servises.deleteSuggestedBook(_id, rendering)
    }

    return (
        <div className={styles.Book}>
            <div className={styles.info}>
                <div className={styles['info-link-box']}>{title}</div>
                <div className={styles['info-link-box']}>{author}</div>
                <div className={styles['info-link-box']}><a href={link} target="_blank" rel="noopener noreferrer" className={styles['info-link']}>{link}</a></div>
            </div>
            <div className={styles.buttons}>
                <Link to="/addBook"><button>{lang === 'en' ? 'Add' : 'Добави'}</button></Link>
                <button onClick={removeSug}>{lang === 'en' ? 'Remove' : 'Изтрий'}</button>
            </div>
        </div>
    )
};

export default ViewSuggestedBook;