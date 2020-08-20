import React, { useContext } from 'react';
import styles from './author.module.css';
import { UserContext } from '../../ContextWrapper';
import { Link } from 'react-router-dom';

const Author = ({ author }) => {
    const { lang } = useContext(UserContext);

    return (
        <div className={styles.Author}>
            <Link to={'/user/' + author._id}>
                <span>
                    <small>{lang === "en" ? "Author" : "Автор"}: </small>
                    {author.firstname}
                </span>
            </Link>
        </div>
    )
}

export default Author;