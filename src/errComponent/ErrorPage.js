import React from 'react';
import styles from './error.module.css';

const ErrorPage = () => {
    return(
        <div className={styles.Error}>
            <h1>Somthing went wrong...</h1>
        </div>
    )
}

export default ErrorPage;