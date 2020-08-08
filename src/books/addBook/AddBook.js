import React, { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './addBook.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';

const AddBook = (props) => {

    const [genres, setGenres] = useState([]);
    const { lang, rendering } = useContext(UserContext);

    const genresList = ['fantasy', 'sci-fi', 'historical', 'romance', 'mystery', 'adventure', 'horror', 'dystopian', 'thriller'];

    const setingGenres = (event) => {
        const newGenre = event.target.value;

        if (genres.indexOf(newGenre) > -1) {
            let newList = genres;
            newList.splice(genres.indexOf(newGenre), 1);
            setGenres(newList);
        } else {
            setGenres(genres => [...genres, newGenre]);
        };
        rendering();
    }

    return (
        <Formik
            initialValues={{ title: '', author: '', image: '', price: '', publisher: '', description: '' }}
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
                servises.postBook(body, rendering, () => props.history.push('/books'));

            }}>

            <div className={styles["book-form"]}>
                <h1>{lang === 'en' ? 'Add Book' : 'Добави Книга'}</h1>
                <Form>
                    <div className={styles["form-control"]}>
                        <label htmlFor="title">{lang === 'en' ? 'Title' : 'Заглавие'}</label>
                        <Field name="title" type="text" />
                        <div>
                            <ErrorMessage name="title" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="author">{lang === 'en' ? 'Author' : 'Автор'}</label>
                        <Field name="author" type="text" />
                        <div>
                            <ErrorMessage name="author" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="urlImage">{lang === 'en' ? 'Image' : 'Изображение'}</label>
                        <Field name="urlImage" type="text" />
                        <div>
                            <ErrorMessage name="urlImage" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="price">{lang === 'en' ? 'Price' : 'Цена'}</label>
                        <Field name="price" type="number" />
                        <div>
                            <ErrorMessage name="price" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="publisher">{lang === 'en' ? 'Publisher' : 'Издател'}</label>
                        <Field name="publisher" type="text" />
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
                        <Field className={styles.textarea} component="textarea" name="description" type="text" />
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

export default AddBook;