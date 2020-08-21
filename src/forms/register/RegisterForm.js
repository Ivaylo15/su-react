import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { servises } from '../../services/servises';
import styles from './register.module.css'
import { UserContext } from '../../ContextWrapper';


const RegisterForm = (props) => {

    const { lang, rendering } = useContext(UserContext);

    console.log(props)

    return (
        <Formik
            initialValues={{ email: '', firstname: '', lastname: '', city: '', image: '', addres: '', password: '', repassword: '' }}
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
                image: Yup.string(),
                addres: Yup.string()
                    .min(3, 'Addres must not be empty!')
                    .required('Required'),
                password: Yup.string()
                    .min(6, 'Password must be more then 6 char!')
                    .required('Required'),
                repassword: Yup.string()
                    .min(6, 'Password must be more then 6 char repass!')
                    .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                const body = {
                    username: values.email,
                    firstname: values.firstname,
                    lastname: values.lastname,
                    image: values.image,
                    city: values.city,
                    addres: values.addres,
                    password: values.password
                };
                servises.register(body, rendering, () => props.history.push('/login'));

            }}>
            <div className={styles.Forms}>
                <h1>{lang === 'en' ? 'Register' : 'Регистрация'}</h1>
                <Form>
                    <div className={styles["form-control"]}>
                        <label htmlFor="email">{lang === 'en' ? 'Email' : 'Имейл'}</label>
                        <Field name="email" type="email" />
                        <div>
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="firstname">{lang === 'en' ? 'First Name' : 'Име'}</label>
                        <Field name="firstname" type="text" />
                        <div>
                            <ErrorMessage name="firstname" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="lastname">{lang === 'en' ? 'Last Name' : 'Фамилия'}</label>
                        <Field name="lastname" type="text" />
                        <div>
                            <ErrorMessage name="lastname" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="image">{lang === 'en' ? 'Image' : 'Снимка'}</label>
                        <Field name="image" type="text" />
                        <div>
                            <ErrorMessage name="image" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="city">{lang === 'en' ? 'City' : 'Град'}</label>
                        <Field name="city" type="text" />
                        <div>
                            <ErrorMessage name="city" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="addres">{lang === 'en' ? 'Addres' : 'Адрес'}</label>
                        <Field name="addres" type="text" />
                        <div>
                            <ErrorMessage name="addres" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="password">{lang === 'en' ? 'Password' : 'Парола'}</label>
                        <Field name="password" type="password" />
                        <div>
                            <ErrorMessage name="password" />
                        </div>
                    </div>
                    <div className={styles["form-control"]}>
                        <label htmlFor="repassword">{lang === 'en' ? 'Repeat Password' : 'Повтори Парола'}</label>
                        <Field name="repassword" type="password" />
                        <div>
                            <ErrorMessage name="repassword" />
                        </div>
                    </div>
                    <button type="submit">{lang === 'en' ? 'Submit' : 'Предаи'}</button>
                </Form>
            </div>
        </Formik>
    )
}

export default RegisterForm;
