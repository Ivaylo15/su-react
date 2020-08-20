import React, { useContext } from 'react';
import styles from './bookComment.module.css';
import Author from '../../author/Author';
import { UserContext } from '../../../ContextWrapper';
import { Link } from 'react-router-dom';

const BookComment = ({ wholeComment }) => {
    const { user, rendering } = useContext(UserContext);
    const { _id: commentId, comment, book, author } = wholeComment;
    const { _id: bookId, image } = book;

    const removeComment = () => {
        console.log(commentId)
        const body = {
            id: commentId,
            author: author._id
        }
        fetch(`//localhost:9999/api/comment/${commentId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                console.log(res);
                rendering();
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={styles.BookComment}>
            <Link to={`/details/${bookId}`} title={bookId} className={styles.Link}><img alt="shoud be a cover" src={image} /></Link>
            <p>{comment}</p>
            <div className={styles["comment-author"]}>
                <Author author={author} />
                {user._id === author._id || user.role === 'admin' ? <button onClick={removeComment}>x</button> : null}
            </div>
        </div>
    )
}

export default BookComment;