import React, { useState, useEffect, useContext } from 'react';
import { servises } from '../../services/servises';
import styles from './specificUser.module.css'
import SpecificUserBooks from './specUserBooks/SpecificUserBooks';
import { UserContext } from '../../ContextWrapper';



const SpecificUser = (props) => {
    const { lang } = useContext(UserContext);
    const [user, setUser] = useState({});
    let url = props.location.pathname.split('/')[2];

    const { firstname, lastname, image, favoriteBooks } = user;

    useEffect(() => {
        servises.getSpecificUser(url, setUser);
    }, [url]);

    return (
        <div className={styles['specific-user']}>
            {image !== undefined ?
                <img alt="prfoile" src={image}></img>
                : <img alt="prfoile" src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg"></img>
            }
            <p>{firstname} {lastname} {lang === 'en' ? 'Favorite Books' : 'Любими Книги'}: </p>
            {favoriteBooks !== undefined && favoriteBooks.length > 0 ?
                <SpecificUserBooks favoriteBooks={favoriteBooks} />
                : <p>{lang === 'en' ? 'No favorite books added' : 'Няма добавени любими книги'}</p>
            }
        </div>
    )
}

export default SpecificUser;