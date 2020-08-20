import React, { useContext, useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './edditBook.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';

const EditBook = (props) => {
    const [genres, setGenres] = useState([]);
    const { lang, rendering } = useContext(UserContext);
    const [book, setBook] = useState({});

    let url = props.location.pathname.split('/')[2];


    const genresList = ['fantasy', 'sci-fi', 'historical', 'romance', 'mystery', 'adventure', 'horror', 'dystopian', 'thriller'];

    useEffect(() => {
        servises.getSpecificBook(setBook, url)
    }, [url]);

    const { title, author, image, price, publisher, description, genres: bookGenres } = book;
    console.log(book)


    useEffect(() => {
        if (bookGenres !== undefined) {
            setGenres(bookGenres);
        }
    }, [bookGenres])

    const setingGenres = (event) => {
        const newGenre = event.target.value;

        if (genres.indexOf(newGenre) > -1) {
            let newList = genres;
            newList.splice(genres.indexOf(newGenre), 1);
            setGenres(newList);
        } else {
            setGenres(genres => [...genres, newGenre]);
        };
        rendering()
    };

    return (
        <Formik
            initialValues={{ title: title, author: author, image: image, price: price, publisher: publisher, description: description }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Required'),
                author: Yup.string()
                    .required('Required'),
                urlImage: Yup.string()
                    .required('Required'),
                price: Yup.number()
                    .required('Required'),
                publisher: Yup.string()
                    .required('Required'),
                description: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmiting }) => {
                const body = {
                    title: values.title,
                    author: values.author,
                    image: values.urlImage,
                    price: values.price,
                    publisher: values.publisher,
                    description: values.description,
                    genres: genres
                };
                servises.editBook(body, url, rendering, () => props.history.push('/books'));
            }}>

            <div className={styles["book-form"]}>
                <h1>{lang === 'en' ? 'Edit Book' : 'Промени Книга'}</h1>
                <Form>
                    <div className={styles["form-control"]}>
                        <label htmlFor="title">{lang === 'en' ? 'Title' : 'Заглавие'}</label>
                        <Field name="title" type="text"  placeholder={title} />
                        <div>
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="author">{lang === 'en' ? 'Author' : 'Автор'}</label>
                        <Field name="author" type="text" placeholder={author} />
                        <div>
                            <ErrorMessage name="author" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="urlImage">{lang === 'en' ? 'Image' : 'Изображение'}</label>
                        <Field name="urlImage" type="text" placeholder={image} />
                        <div>
                            <ErrorMessage name="urlImage" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="price">{lang === 'en' ? 'Price' : 'Цена'}</label>
                        <Field name="price" type="number" placeholder={price} />
                        <div>
                            <ErrorMessage name="price" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="publisher">{lang === 'en' ? 'Publisher' : 'Издател'}</label>
                        <Field name="publisher" type="text" placeholder={publisher} />
                        <div>
                            <ErrorMessage name="publisher" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="genres">{lang === 'en' ? 'Genres' : 'Жанрове'}</label>
                        <div className={styles["form-genres"]}>
                            {genresList.map(genre => {
                                if (genres.includes(genre)) {
                                    return <button className={styles["clicked"]} key={genre} type="button" value={genre} onClick={setingGenres}>{genre}</button>
                                } else {
                                    return <button className={styles["not-clicked"]} key={genre} type="button" value={genre} onClick={setingGenres}>{genre}</button>
                                }
                            })}
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="description">{lang === 'en' ? 'Description' : 'Описнаие'}</label>
                        <Field className={styles.textarea} component="textarea" name="description" type="text" placeholder={description} />
                        <div>
                            <ErrorMessage name="description" />
                        </div>
                    </div>
                    <button type="submit">{lang === 'en' ? 'Submit' : 'Предаи'}</button>
                </Form>
            </div>
        </Formik>
    )
}

export default EditBook;