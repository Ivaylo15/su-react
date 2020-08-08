import React, { useEffect, useState, useContext } from 'react';
import styles from './author.module.css';
import { UserContext } from '../../ContextWrapper';

const Author = ({ author }) => {
    const { lang } = useContext(UserContext);
    const [user, setUser] = useState({})


    useEffect(() => {
        fetch('//localhost:9999/api/user')
            .then(res => res.json())
            .then(res => {
                res.forEach(user => {

                    if (user._id === author) {
                        setUser(user)
                    }
                })

            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className={styles.Author}>
            <span>
                <small>{lang === "en" ? "Author" : "Автор"}: </small>
                {user.firstname}
            </span>
        </div>
    )
}

export default Author;