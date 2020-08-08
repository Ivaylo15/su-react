import React, { useState, useEffect } from 'react';
import { servises } from '../../services/servises';
import styles from './allComments.module.css'
import BookComment from '../../books/comment/bookComment/BookComment';

const AllComments = (props) => {
    const [comments, setComments] = useState([]);
    let url = props.location.pathname.split('/')[2];
    console.log(comments)


    useEffect(() => {
        servises.getUserComment(setComments, url)
    }, [url])

    return (
        <div className={styles['all-comments']}>
            <h2>All Comments</h2>
            {comments.map((comment) => <BookComment key={comment._id} wholeComment={comment} />)}
        </div>
    );
};

export default AllComments;