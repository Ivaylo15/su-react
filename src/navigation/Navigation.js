import React, { useContext, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';
import { UserContext } from '../ContextWrapper';
import { servises } from '../services/servises';



const Navigation = (props) => {
    const { logged, lang, setingLang, user, ren, rendering } = useContext(UserContext);
    // const [user, setUser] = useState({});
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [orders, setOrders] = useState([]);
    const [genres, setGenres] = useState([]);
    //changing state so the buttons can change without changing the rest
    const [butRen, setButRen] = useState(0);
    const [searchValue, setSearcValue] = useState('');

    const genresList = ['fantasy', 'sci-fi', 'historical', 'romance', 'mystery', 'adventure', 'horror', 'dystopian', 'thriller'];

    const { _id: userId, role, cartIt, favoriteBooks } = user;


    useEffect(() => {
        // servises.getUser(setUser);
        servises.getSuggestedBooks(setSuggestedBooks);
        servises.getAllOrdersHeader(setOrders);
    }, [ren]);


    //button selection
    const settingButRen = (v) => {
        setButRen(ren => ren = ren + v)
    }

    const setingGenres = (event) => {
        const newGenre = event.target.value;

        if (genres.indexOf(newGenre) > -1) {
            let newList = genres;
            newList.splice(genres.indexOf(newGenre), 1);
            setGenres(newList);
            settingButRen(-1)
        } else {
            setGenres(genres => [...genres, newGenre]);
            settingButRen(1)
        };
    };

    const handleSearchChange = event => {
        setSearcValue(event.target.value);
    };

    const handleClick = e => {
        rendering();
    };
    console.log(butRen)

    return (
        <Fragment>
            <nav className={styles.Navigation}>
                <ul>
                    <Link to="/books" className={styles.listItem}>{lang === 'en' ? 'Books' : 'Книги'}</Link>
                    {!logged ?
                        <Fragment>
                            <Link to="/register" className={styles.listItem}>{lang === 'en' ? 'Register' : 'Регистрация'}</Link>
                            <Link to="/login" className={styles.listItem}>{lang === 'en' ? 'Login' : 'Вход'}</Link>

                        </Fragment>
                        :
                        <Fragment>
                            <Link to="/profile" className={styles.listItem}>{lang === 'en' ? 'Profile' : 'Профил'}</Link>
                            {
                                role === 'admin' ?
                                    <Fragment>
                                        <Link to="/addBook" className={styles.listItem}>{lang === 'en' ? 'Add Book' : 'Добави Книга'}</Link>
                                        <Link to="/viewSuggestedBooks" className={styles.listItem}>
                                            {lang === 'en' ? `Suggested Books` : `Предложени книги`}
                                            {suggestedBooks.length > 0 ?
                                                <span className={styles["sugg-book-count"]}>
                                                    {suggestedBooks.length}
                                                </span>
                                                : null}
                                        </Link>
                                        <Link to="/adminOrderView" className={styles.listItem}>
                                            {lang === 'en' ? 'Orders' : 'Поръчки'}
                                            {orders.length > 0 ?
                                                <span className={styles["sugg-book-count"]}>
                                                    {orders.length}
                                                </span>
                                                : null}
                                        </Link>
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <Link to="/suggestBook" className={styles.listItem}>{lang === 'en' ? 'Suggest Book' : 'Предложи Книга'}</Link>
                                        <Link to="/favoriteBooks" className={styles.listItem}>{lang === 'en' ? 'Favorite' : 'Любими'}{favoriteBooks !== undefined && favoriteBooks.length > 0 ?
                                            <span className={styles["sugg-book-count"]}>
                                                {favoriteBooks.length}
                                            </span> : null}
                                        </Link>
                                        <Link to="/cart" className={styles.listItem}>{lang === 'en' ? 'Cart' : 'Количка'} {cartIt !== undefined && cartIt.length > 0 ?
                                            <span className={styles["sugg-book-count"]}>
                                                {cartIt.length}
                                            </span> : null}
                                        </Link>
                                    </Fragment>
                            }

                            <Link to="/logout" className={styles.listItem}>{lang === 'en' ? 'Logout' : 'Изход'}</Link>
                        </Fragment>
                    }

                    <div className={styles.searchBox}>
                        <form>
                            <div className={styles.searchField}>
                                <input className={styles.search} type="text" placeholder="Search" onChange={handleSearchChange}></input>
                            </div>
                            <div className={styles.searchButton}>
                                <Link to={{ pathname: "/search", searchValue: searchValue, genres: genres }} >
                                    <button onClick={handleClick} ><img alt="search" src="https://img.icons8.com/material-sharp/24/000000/search.png" /></button>
                                </Link>
                            </div>
                        </form>
                        <div className={styles['search-tags']}>
                            {genresList.map(genre => {
                                if (genres.includes(genre)) {
                                    return <button className={styles["clicked"]} key={genre} type="button" value={genre} onClick={setingGenres}>{genre}</button>
                                } else {
                                    return <button className={styles["not-clicked"]} key={genre} type="button" value={genre} onClick={setingGenres}>{genre}</button>
                                }
                            })}
                        </div>
                    </div>

                    <button className={styles.lang} onClick={setingLang}>{lang === 'en' ? 'BG' : 'АНГ'}</button>
                </ul>
            </nav>

        </Fragment>
    )
}

export default Navigation;
