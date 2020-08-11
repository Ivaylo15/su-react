import React, { useContext, useEffect, useState, useReducer, Fragment } from 'react';
import styles from './details.module.css';
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import AddComment from '../comment/addComment/AddComment';
import BookComment from '../comment/bookComment/BookComment';
import { Link } from 'react-router-dom';

const initialState = {
    user: {},
    book: {},
    comments: [],
    inCart: false,
    favorite: false,
    score: '',
    userScore: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'getUser':
            return { ...state, user: action.payload };
        case 'getBook':
            return { ...state, book: action.payload };
        case 'getComments':
            return { ...state, comments: action.payload };
        case 'isInCart':
            return { ...state, inCart: action.payload, };
        case 'isFavorite':
            return { ...state, favorite: action.payload, };
        case 'userScore':
            let userScore = '';
            if (action.payload !== undefined) {
                action.payload.forEach((score) => {
                    if (score.userId === action.userId) {
                        userScore = score.score;
                    }
                });
            }
            return { ...state, userScore }
        case 'score':
            let curScore = 0;
            if (action.payload !== undefined) {
                if (action.payload.length === 0) {
                    return { ...state, score: 'No one voted' };
                }
                action.payload.forEach(score => {
                    curScore += parseFloat(score.score);
                })
                curScore = curScore / action.payload.length;
            }
            return { ...state, score: curScore.toFixed(1) };
        default:
            throw new Error();
    }
}


const Deatils = (props) => {
    const { logged, lang, ren, rendering } = useContext(UserContext);
    const [state, dispatch] = useReducer(reducer, initialState);
    //triggering useEffect
    const [newScore, setNewScore] = useState('');
    let url = props.location.pathname.split('/')[2];
    const { _id: userId, cart, favoriteBooks, role } = state.user;
    const { _id: bookId, title, image, author, publisher, description, price, genres, raiting } = state.book;

    useEffect(() => {
        servises.getUserDispatch(dispatch);
    }, [dispatch]);

    useEffect(() => {
        servises.getSpecificBookDispatch(dispatch, url);
    }, [url, dispatch]);

    useEffect(() => {
        servises.getComments(dispatch, url);
    }, [ren, url]);

    useEffect(() => {
        const isFavorite = () => {
            if (favoriteBooks !== undefined) {
                favoriteBooks.forEach(userBook => {
                    if (userBook === bookId) {
                        dispatch({ type: 'isFavorite', payload: true });
                        console.log('fav');
                    }
                });
            };
        };
        isFavorite();
    }, [bookId, favoriteBooks]);

    useEffect(() => {
        const isInCart = () => {
            if (cart !== undefined) {
                cart.forEach(userBook => {
                    if (userBook === bookId) {
                        dispatch({ type: 'isInCart', payload: true });
                        console.log('cart');
                    }
                });
            };
        };
        isInCart();
    }, [bookId, cart]);

    useEffect(() => {
        dispatch({ type: 'userScore', payload: raiting, userId: userId });
        console.log('getscore')
    }, [raiting, userId, newScore])

    useEffect(() => {
        dispatch({ type: 'score', payload: raiting });
        console.log('sum raiting')
    }, [raiting, newScore]);

    const addCart = () => {
        cart.push(bookId);
        servises.putCart(cart, userId);
        dispatch({ type: 'isInCart', payload: true });
        rendering();
    };

    const removeCart = () => {
        cart.splice(cart.indexOf(bookId), 1);
        servises.putCart(cart, userId);
        dispatch({ type: 'isInCart', payload: false });
        rendering();
    }

    const addFavorite = () => {
        favoriteBooks.push(bookId);
        servises.putFavoriteBook(favoriteBooks, userId);
        dispatch({ type: 'isFavorite', payload: true });
        rendering();
    };

    const removeFavorite = () => {
        favoriteBooks.splice(favoriteBooks.indexOf(bookId), 1);
        servises.putFavoriteBook(favoriteBooks, userId);
        dispatch({ type: 'isFavorite', payload: false });
        rendering();
    };

    const deleteBook = () => {
        servises.deleteBook(url, () => props.history.push('/books'))
    };

    const settingScore = event => {
        const score = event.target.value;
        setNewScore(score);

        const body = {
            userId: userId,
            score: score
        };
        if (raiting.length === 0) {
            raiting.push(body);
        } else {
            console.log('seconde check')

            for (let i = 0; i < raiting.length; i++) {
                if (raiting[i]['userId'] === userId) {
                    raiting.splice(i, 1);
                    break;
                }
            }
            raiting.push(body);
        }
        servises.putBookRating(raiting, bookId);
    };
    console.log(state.inCart)
    return (
        <div className={styles['product-view']}>
            <h2>{lang === 'en' ? 'Details' : 'Детайли'}</h2>
            <div className={styles.product}>
                <div className={styles['product-image']}>
                    <img alt={title} src={image} />
                </div>
                <div className={styles['product-infromation']}>
                    <div className={styles['product-title']}>{title}</div>
                    <div className={styles['product-author']}>{lang === 'en' ? 'author' : 'автор'}:<Link to={`/author/${author}`} className={styles['info-link']}> {author}</Link></div>
                    <div className={styles['product-publisher']}>{lang === 'en' ? 'publisher' : 'издател'}: <Link to={`/publisher/${publisher}`} className={styles['info-link']}> {publisher}</Link></div>
                    <div className={styles['product-description']}>{description}</div>
                    <div className={styles['product-price']}>{lang === 'en' ? `price: ${price}lv` : `цена: ${price}лв`}</div>
                    {genres !== undefined ?
                        <div
                            className={styles['product-genres']}>{lang === 'en' ? 'genres' : 'жанрове'}: {genres.map(genre =>
                                <Link key={genre} to={`/genres/${genre}`} ><div className={styles['product-genre']}>{genre}</div></Link>)}
                        </div>
                        : null
                    }
                    <div className="score">score: {state.score}</div>
                </div>
                {logged ?
                    <div className={styles['product-buttons']}>
                        <select onChange={settingScore} value={state.userScore}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                        {
                            state.favorite ?
                                <button onClick={removeFavorite}>{lang === 'en' ? 'remove favorite' : 'премахни от любими'}</button> :
                                <button onClick={addFavorite}>{lang === 'en' ? 'favorite' : 'любими'}</button>
                        }
                        {
                            role === 'admin' ? <button onClick={deleteBook}>{lang === 'en' ? 'delete' : 'изтрий'}</button> : null
                        }
                        {
                            role === 'admin' ? <Link to={`/editBook/${url}`} ><button>{lang === 'en' ? 'edit book' : 'промени книга'}</button></Link> : null
                        }
                        {
                            role === 'user' ?
                                <Fragment>
                                    {
                                        state.inCart ?
                                            <button onClick={removeCart}>{lang === 'en' ? 'Remove Cart' : 'Премахни'}</button>
                                            : <button onClick={addCart}>{lang === 'en' ? 'Add Cart' : 'Добави'}</button>
                                    }
                                </Fragment>
                                : null
                        }
                    </div> : null
                }
            </div>
            {logged ?
                <div>
                    <AddComment bookId={bookId} />
                </div> :
                <div class={styles['not-logged']}>
                    <Link to="/login">{lang === 'en' ? 'Log in to comment' : 'Влез за коментар'}</Link>
                </div>
            }
            <div>
                {state.comments.length > 0 && state.comments !== undefined ? state.comments.map((comment) => <BookComment key={comment._id} wholeComment={comment} image={image} />) : <p>No Comments</p>}
            </div>
        </div>
    )
}

export default Deatils;