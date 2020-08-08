import React, { useState, useEffect } from 'react';
import { servises } from '../../services/servises';
import styles from './specificUser.module.css'
import SpecificUserBooks from './specUserBooks/SpecificUserBooks';



const SpecificUser = (props) => {
    const [user, setUser] = useState({});

    let url = props.location.pathname.split('/')[2];

    const { firstname, lastname, favoriteBooks } =user

    useEffect(() => {
        servises.getSpecificUser(url, setUser);
    }, [url]);
    return (
        <div className={styles['specific-user']}>
            <img alt="prfoile" src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg" />
            <p>{firstname} {lastname} Book List : </p>
            <SpecificUserBooks favoriteBooks={favoriteBooks} />
        </div>
    )
}

export default SpecificUser;