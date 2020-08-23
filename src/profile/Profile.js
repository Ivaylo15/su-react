import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../ContextWrapper';
import { servises } from '../services/servises';
import styles from './profile.module.css';
import BookComment from '../books/comment/bookComment/BookComment';
import { Link } from 'react-router-dom';
import Loader from '../shared/loader/Loader';


const Profile = () => {
    const [comments, setComments] = useState([]);
    const { user, ren } = useContext(UserContext);
    const { _id, username } = user;

    useEffect(() => {
        servises.getUserComment(setComments, _id);
    }, [_id, ren]);


    return (
        comments.length >= 0 && user.order.length >= 0 ?
            <div className={styles.Profile}>
                <div className={styles.user} >
                    {user.image !== undefined ?
                        <img className={styles["prof-img"]} src={user.image} alt="profile-icon" />
                        :
                        <img className={styles["prof-img"]} src="https://thumbs.dreamstime.com/z/default-avatar-profile-icon-vector-user-image-179582665.jpg" alt="profile-icon" />
                    }
                    <div className={styles["personal-info"]}>
                        <p><Link to={`editUserInfo/${_id}`}>Change Personal Info</Link></p>
                        <p>
                            <span>Email: </span>
                            {username}
                        </p>
                        <p>
                            <Link to={`/allComments/${_id}`}>

                                <span>Comments: </span>
                                {comments.length}
                            </Link>
                        </p>
                        <p><Link to="userOrders"><span>My Orders: </span> {user.order.length}</Link></p>
                    </div>
                </div>
                <div className={styles["profile-comments"]}>
                    <h2>3 of your recent comments</h2>
                    {comments.length > 3 ?
                        comments.slice(comments.length - 3, comments.length).map((comment) => <BookComment key={comment._id} wholeComment={comment} />) :
                        comments.map((comment) => <BookComment key={comment._id} wholeComment={comment} />)}
                    {/* <Link to={`/allComments/${_id}`}><button>Show All Comments</button></Link> */}
                </div>
            </div> : <Loader />
    )
}

export default Profile;