import React, { useEffect, useState, useContext } from 'react';
import { servises } from '../../../../services/servises';
import styles from './userOrder.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../ContextWrapper';


const RenderProducts = ({ product }) => {
    const { lang } = useContext(UserContext);
    const { product: productId, amount, price } = product;
    const [book, setBook] = useState({});
    const { _id: bookId, image, title } = book;


    useEffect(() => {
        servises.getSpecificBook(setBook, productId);
    }, [productId]);

    return (
        <div className={styles.product}>
            <img src={image} alt="book-cover" />
            <div>
                <Link to={`/details/${bookId}`}><h4>{title}</h4></Link>
                <div className={styles['price-amount']}>
                    <div className={styles.amount}>{lang === 'en' ? 'amount' : 'количество'}: {amount}</div>
                    <div className={styles.amount}>{lang === 'en' ? 'price' : 'цена'}: {price}</div>
                </div>
            </div>
        </div>
    )
};

export default RenderProducts;