import React, { useContext, useState, useEffect } from 'react';
import styles from './bookComment.module.css';
import Author from '../../author/Author';
import axios from 'axios';
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';
import { Link } from 'react-router-dom';




const BookComment = ({ wholeComment }) => {
    const { user, rendering } = useContext(UserContext);
    const [book, setBook] = useState({});
    // const [reComment, setReComment] = useState({});

    const { _id, comment, book: bookId, author } = wholeComment;

    useEffect(() => {
        servises.getSpecificBook(setBook, bookId)
    }, [bookId]);

    const { image } = book;
    const removeComment = () => {
        console.log(_id)
        const params = {
            id: _id,
            author: author
        }
        return axios.delete(`//localhost:9999/api/comment/${_id}`, params,
            {
                withCredentials: true,
                credentials: 'include'
            }
        )
            .then(res => {
                console.log(res);
                rendering();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={styles.BookComment}>
            <Link to={'/details/' + bookId} title={bookId} className={styles.Link}><img alt="shoud be a cover" src={image} /></Link>
            <p>{comment}</p>
            <div className={styles["comment-author"]}>
                <Author author={author} />
                {user._id === author || user.role === 'admin' ? <button onClick={removeComment}>x</button> : null}
            </div>
        </div>
    )
}

export default BookComment;