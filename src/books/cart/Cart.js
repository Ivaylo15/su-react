import React, { useContext, useState, useEffect } from 'react';
import styles from './cart.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import CartItems from './cartItems/CartItems';


const Cart = (props) => {
    const { lang, user, rendering } = useContext(UserContext);
    // const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        servises.getCart(user.cart, setBooks)
    }, [user.cart])

    const settingPrice = (price) => {
        setTotalPrice(totalPrice => totalPrice + price);
    };


    const removeItem = (bookId) => {
        console.log(bookId);
        console.log(user.cart)
        user.cart.splice(user.cart.indexOf(bookId), 1);
        console.log(user.cart)
        servises.putCart(user.cart, user._id);
        // dispatch({ type: 'isInCart', payload: false });
        rendering();
    };

    return (
        <div className={styles.cart}>
            <h2>{lang === 'en' ? "Cart" : "Количка"}</h2>
            <div className={styles["cart-layout"]}>
                <span className={styles.product}>{lang === 'en' ? "Product" : "Продукт"}</span>
                <span className={styles.price}>{lang === 'en' ? "For one" : "Ед. Цена"}</span>
                <span className={styles.amount}>{lang === 'en' ? "Amount" : "Количество"}</span>
                <span className={styles.price}>{lang === 'en' ? "Price" : "Цена"}</span>
                <span className={styles.remove}></span>
            </div>
            <div className>
                {books.map(book => <CartItems key={book._id} book={book} settingPrice={settingPrice} removeItem={removeItem} />)}
            </div>
            <div className={styles['check-out']}>
                <span>Tottal amount: {totalPrice.toFixed(2)}lv</span>
                <button>Купи</button>
            </div>
        </div>
    );
};

export default Cart;