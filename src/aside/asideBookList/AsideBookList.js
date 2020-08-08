import React from 'react';
import styles from '../asideBookList/asideBookList.module.css'
import { Link } from 'react-router-dom';

const AsideBookList = ({ userInfo }) => {
    const { _id, firstname, favoriteBooks } = userInfo;

    return (
        <li className={styles.listItem}>
            <Link to={'/user/' + _id}>
                <img alt="prfoile" src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg"></img> {favoriteBooks.length}
                <p>{firstname}</p>
            </Link>
        </li>
    )
}

export default AsideBookList;