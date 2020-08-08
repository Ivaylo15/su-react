import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './suggestBook.module.css';
import { UserContext } from '../../../ContextWrapper';
import { servises } from '../../../services/servises';

const SuggestBook = (props) => {
    const { lang, rendering } = useContext(UserContext);

    return (
        <Formik
            initialValues={{ title: '', author: '', link: '' }}
            validationSchema={Yup.object({
                title: Yup.string()
                    .required('Required'),
                author: Yup.string()
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmiting }) => {
                const body = {
                    title: values.title,
                    author: values.author,
                    link: values.link
                };
                servises.postSuggestedBook(body, rendering, () => props.history.push('/books'));

            }}>

            <div className={styles["book-form"]}>
                <h1>{lang === 'en' ? 'Suggest Book' : 'Предложи Книга'}</h1>
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
                        <label htmlFor="link">{lang === 'en' ? 'Link' : 'Линк'}</label>
                        <Field name="link" type="text" />
                        <div>
                            <ErrorMessage name="author" />
                        </div>
                    </div>
                    <button type="submit">{lang === 'en' ? 'Submit' : 'Предаи'}</button>
                </Form>
            </div>
        </Formik>
    )
};

export default SuggestBook;