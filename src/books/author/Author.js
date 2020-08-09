import React, { useEffect, useState, useContext } from 'react';
import styles from './author.module.css';
import { UserContext } from '../../ContextWrapper';
import { Link } from 'react-router-dom';

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
    }, [author]);

    return (
        <div className={styles.Author}>
            <Link to={'/user/' + user._id}>
                <span>
                    <small>{lang === "en" ? "Author" : "Автор"}: </small>
                    {user.firstname}
                </span>
            </Link>
        </div>
    )
}

export default Author;