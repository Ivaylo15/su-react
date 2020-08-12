import React, { useState, useEffect } from 'react';
import styles from './cartItems.module.css';
import { Link } from 'react-router-dom';

const CartItems = ({ book, settingPrice, deleteItem }) => {
    const { _id, title, author, image, price } = book
    const [amount, setAmount] = useState(1);
    const [itemPrice, setItemPrice] = useState(price);

    useEffect(() => {
        let calPrice = parseFloat(price);
        if (amount > 0) {
            calPrice = parseFloat(price) * amount;
        }
        if (calPrice < itemPrice) {
            settingPrice(-parseFloat(price));
        } else {
            settingPrice(parseFloat(price))
        }
        setItemPrice(calPrice);
    }, [amount, price]);

    const handelChange = e => {
        setAmount(e.target.value)
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
                    <Link to={`/details/${_id}`}><span>{title}</span></Link>
                    <span>{author}</span>
                </div>
            </div>
            <div className={styles.price}>
                {price}лв
            </div>
            <div className={styles.amount}>
                <button className={styles['left-button']} onClick={() => { setAmount(amount => amount - 1) }}>-</button>
                <input onChange={handelChange} value={amount}></input>
                <button className={styles['right-button']} onClick={() => { setAmount(amount => amount + 1) }}>+</button>
            </div>
            <div className={styles.price}>
                {itemPrice.toFixed(2)}лв
            </div>
            <div className={styles.remove}>
                <button onClick={handeldeleteItem}>x</button>
            </div>
        </div>
    )
};

export default CartItems;