import React, { useState, useContext } from 'react';
import styles from './addComment.module.css';
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';



const AddComment = (props) => {
    const { lang, rendering } = useContext(UserContext);
    const [comment, setComment] = useState('');

    const handleChange = event => {
        setComment(event.target.value)
    }

    const { bookId } = props;

    const handleSubmit = event => {
        event.preventDefault();
        const data = {
            comment: comment,
            book: bookId
        }
        servises.postComment(data, rendering);
        setComment('');
    }


    return (
        <div className={styles.AddComment}>
            <h3>{lang === 'en' ? 'Add Comment' : 'Добави Коментар'}</h3>
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} value={comment}></textarea>
                <button type="submit">{lang === 'en' ? 'Comment' : 'Коментирай'}</button>
            </form>
        </div>
    )
};

export default AddComment;