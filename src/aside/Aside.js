import React, { useContext, useState, useEffect } from 'react';
import styles from './aside.module.css';
import { UserContext } from '../ContextWrapper';
import { servises } from '../services/servises';
import AsideBookList from './asideBookList/AsideBookList';



const Aside = () => {
    const [users, setUsers] = useState([]);
    const { lang, ren } = useContext(UserContext);

    useEffect(() => {
        servises.getAllUsers(setUsers);
    }, [ren]);

    return (
        <aside className={styles.Aside}>
            <h3>{lang === 'en'  ? 'Favorite' : 'Любими'}</h3>
            <ul>
                {users.sort((a, b) => {return b.favoriteBooks.length - a.favoriteBooks.length} ).map(user => <AsideBookList key={user._id} userInfo={user} />)}
            </ul>
        </aside>
    )
}

export default Aside;
