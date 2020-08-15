import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { servises } from '../../services/servises';
import styles from './editUser.module.css'
import { UserContext } from '../../ContextWrapper';


const EditUser = (props) => {

    const { lang, user, rendering } = useContext(UserContext);
    const { _id: userId, username, firstname, lastname, city, addres } = user;

    console.log(props)

    return (
        <Formik
            initialValues={{ email: '', firstname: '', lastname: '', city: '', addres: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Invali email!')
                    .required('Required!'),
                firstname: Yup.string()
                    .min(3, 'First name must be more then 3 characters!')
                    .required('Required'),
                lastname: Yup.string()
                    .min(3, 'Last name must be more then 3 characters!')
                    .required('Required'),
                city: Yup.string()
                    .min(3, 'City must not be empty!')
                    .required('Required'),
                addres: Yup.string()
                    .min(3, 'Addres must not be empty!')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const body = {
                    username: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    city: values.city,
                    addres: values.addres,
                    password: values.password
                };
                servises.editUserInfo(body, userId, rendering, () => props.history.push('/profile'));

            }}>
            <div className={styles.Forms}>
                <h1>{lang === 'en' ? 'Register' : 'Регистрация'}</h1>
                <Form>
                    <div className={styles["form-control"]}>
                        <label htmlFor="email">{lang === 'en' ? 'Email' : 'Имейл'}</label>
                        <Field name="email" type="email" placeholder={username}/>
                        <div>
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="firstname">{lang === 'en' ? 'First Name' : 'Име'}</label>
                        <Field name="firstname" type="text" placeholder={firstname} />
                        <div>
                            <ErrorMessage name="firstname" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="lastname">{lang === 'en' ? 'Last Name' : 'Фамилия'}</label>
                        <Field name="lastname" type="lastname" placeholder={lastname} />
                        <div>
                            <ErrorMessage name="lastname" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="city">{lang === 'en' ? 'City' : 'Град'}</label>
                        <Field name="city" type="city" placeholder={city} />
                        <div>
                            <ErrorMessage name="city" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="addres">{lang === 'en' ? 'Addres' : 'Адрес'}</label>
                        <Field name="addres" type="addres" placeholder={addres} />
                        <div>
                            <ErrorMessage name="addres" />
                        </div>
                    </div>
                    <button type="submit">{lang === 'en' ? 'Submit' : 'Предаи'}</button>
                </Form>
            </div>
        </Formik>
    )
}

export default EditUser;
