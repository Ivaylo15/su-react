import React, { useContext, Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PageLink from '../shared/link/PageLink';
// import NavWrapper from './navigationCss';
import styles from './navigation.module.css';
import { UserContext } from '../ContextWrapper';



const Navigation = (props) => {
    const { logged, lang, setingLang, user, rendering } = useContext(UserContext);
    const [genres, setGenres] = useState([]);
    const [butRen, setButRen] = useState(0);
    const [searchValue, setSearcValue] = useState('');

    const genresList = ['fantasy', 'sci-fi', 'historical', 'romance', 'mystery', 'adventure', 'horror', 'dystopian', 'thriller'];

    const { role } = user;

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
    }

    return (
        <Fragment>
            <nav className={styles.Navigation}>
                <ul>
                    <Link to="/">
                        {/* <img src="white-origami-bird.png" alt="origami" /> */}
                        {/* <img className={styles["main-image"]} src="https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="book" /> */}
                    </Link>
                    <PageLink url="/books" name={lang === 'en' ? 'Books' : 'Книги'} />
                    {!logged ?
                        <Fragment>
                            <PageLink url="/register" name={lang === 'en' ? 'Register' : 'Регистрация'} />
                            <PageLink url="/login" name={lang === 'en' ? 'Login' : 'Вход'} />
                        </Fragment>
                        :
                        <Fragment>
                            <PageLink url="/profile" name={lang === 'en' ? 'Profile' : 'Профил'} />
                            {
                                role === 'admin' ?
                                    <Fragment>
                                        <PageLink url="/addBook" name={lang === 'en' ? 'Add Book' : 'Добави Книга'} />
                                        <PageLink url="/viewSuggestedBooks" name={lang === 'en' ? 'Suggested Books' : 'Предложени книги'} />
                                    </Fragment>
                                    : <PageLink url="/suggestBook" name={lang === 'en' ? 'Suggest Book' : 'Предложи Книга'} />
                            }
                            <PageLink url="/favoriteBooks" name={lang === 'en' ? 'Favorite' : 'Любими'} />
                            <PageLink url="/logout" name={lang === 'en' ? 'Logout' : 'Изход'} />
                        </Fragment>
                    }

                    <div className={styles.searchBox}>
                        <form>
                            <div className={styles.searchField}>
                                <input className={styles.search} type="text" placeholder="Search" onChange={handleSearchChange}></input>
                            </div>
                            <div className={styles.searchButton}>
                                <Link to={{ pathname: "/search", searchValue: searchValue, genres: genres }} >
                                    <button type="submit" onClick={rendering} ><img alt="search" src="https://img.icons8.com/material-sharp/24/000000/search.png" /></button>
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
