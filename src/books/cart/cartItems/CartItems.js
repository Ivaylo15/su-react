import React, { useState, useEffect, useContext } from 'react';
import styles from './cartItems.module.css';
import { Link } from 'react-router-dom';
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';

const CartItems = ({ product, deleteItem }) => {
    const { lang, rendering } = useContext(UserContext);
    const { _id, product: productId, amount: firstAmount, price: totalPrice } = product;
    const [book, setBook] = useState({});
    const [amount, setAmount] = useState(firstAmount);
    const { _id: bookId, title, author, image, price } = book;



    useEffect(() => {
        servises.getSpecificBook(setBook, productId);
    }, [productId]);

    useEffect(() => {
        const handleAmount = () => {
            const body = {
                amount: amount,
                price: parseFloat(price) * amount
            };
            servises.changeAmount(body, _id);
        }

        handleAmount();
    }, [amount, price, _id]);

    const handelChange = e => {
        setAmount(e.target.value);
        rendering();
    };



    const decAmount = () => {
        setAmount(amount => amount - 1);
        rendering();
    };

    const incAmount = () => {
        setAmount(amount => amount + 1);
        rendering();
    };

    const handeldeleteItem = () => {
        deleteItem(_id);
    }


    return (
        <div className={styles['cart-item']}>

            <div className={styles['cart-book-info']}>
                <div className={styles['cart-image']}>
                    <img src={image} alt="book-cover" />
                </div>
                <div className={styles['cart-book-text']}>
                    <Link to={`/details/${bookId}`}><span>{title}</span></Link>
                    <span>{author}</span>
                </div>
            </div>
            <div className={styles.price}>
                {price}лв
            </div>
            <div className={styles.amount}>
                <button className={styles['left-button']} onClick={decAmount}>-</button>
                <input onChange={handelChange} value={amount}></input>
                <button className={styles['right-button']} onClick={incAmount}>+</button>
            </div>
            <div className={styles.price}>
                {parseFloat(totalPrice).toFixed(2)}{lang === 'en' ? 'lv' : 'лв'}.
            </div>
            <div className={styles.remove}>
                <button onClick={handeldeleteItem}>x</button>
            </div>
        </div>
    )
};

export default CartItems;