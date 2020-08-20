import React, { useState, useEffect, useContext } from 'react';
import { servises } from '../../services/servises';
import styles from './allComments.module.css'
import BookComment from '../../books/comment/bookComment/BookComment';
import { UserContext } from '../../ContextWrapper';

const AllComments = (props) => {
    const { lang, ren } = useContext(UserContext);
    const [comments, setComments] = useState([]);
    let url = props.location.pathname.split('/')[2];
    console.log(comments)


    useEffect(() => {
        servises.getUserComment(setComments, url)
    }, [url, ren])

    return (
        <div className={styles['all-comments']}>
            <h2>{lang === 'en' ? 'All Comments' : 'Всички Коментари'}</h2>
            {comments.map((comment) => <BookComment key={comment._id} wholeComment={comment} />)}
        </div>
    );
};

export default AllComments;