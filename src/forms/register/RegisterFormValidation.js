import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { servises } from '../../services/servises';
import styles from './register.module.css'


const RegisterFormValidation = () => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Must be 15 characters or less!')
                .min(3, 'Must be more then 3 characters!')
                .required('Required!'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less!')
                .min(3, 'Must be more then 3 characters!')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email addres!')
                .required('Required!')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className={styles.Forms}>
            <form onSubmit={formik.handleSubmit} >
                <div className={styles["form-control"]}>
                    <label htmlFor="firstName">First Name</label>
                    <input name="firstName" {...formik.getFieldProps('firstName')} />
                    {formik.touched.firstName && formik.errors.firstName ? <div> {formik.errors.firstName} </div> : null}
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" {...formik.getFieldProps('lastName')} />
                    {formik.touched.lastName && formik.errors.lastName ? <div> {formik.errors.lastName} </div> : null}
                </div>
                <div className={styles["form-control"]}>
                    <label htmlFor="email">Email Addres</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? <div> {formik.errors.email} </div> : null}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default RegisterFormValidation;
