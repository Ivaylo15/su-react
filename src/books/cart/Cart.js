import React, { useContext, useState, useEffect } from 'react';
import styles from './cart.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import CartItems from './cartItems/CartItems';
import { Link } from 'react-router-dom';
import FinishOrder from './finishOreder/FinishOrder';


const Cart = (props) => {
    const { lang, user, rendering } = useContext(UserContext);
    // const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [buy, setBuy] = useState(false);
    // const [order, setOrder] = useState([]);

    useEffect(() => {
        servises.getCart(user.cart, setBooks)
    }, [user.cart])

    const settingPrice = (price) => {
        setTotalPrice(totalPrice => totalPrice + price);
    };

    const deleteItem = (bookId) => {
        user.cart.splice(user.cart.indexOf(bookId), 1);
        servises.putCart(user.cart, user._id);
        rendering();
    };

    // const handleBuy = e => {
    //     setBuy(!buy)
    // }
    return (
        <div>
            {true ?
                <div className={styles['cart-container']}>
                    {
                        books.length !== 0 ? <div className={styles.cart}>
                            <h2>{lang === 'en' ? "Cart" : "Количка"}</h2>
                            <div className={styles['check-out']}>
                                <span>Tottal amount: {totalPrice.toFixed(2)}lv</span>
                                <Link to={{ pathname: "/finishOrder", books, totalPrice }}><button>Купи</button></Link>
                                {/* <button onClick={handleBuy}>Купи</button> */}
                            </div>
                            <div className={styles["cart-layout"]}>
                                <span className={styles.product}>{lang === 'en' ? "Product" : "Продукт"}</span>
                                <span className={styles.price}>{lang === 'en' ? "For one" : "Ед. Цена"}</span>
                                <span className={styles.amount}>{lang === 'en' ? "Amount" : "Количество"}</span>
                                <span className={styles.price}>{lang === 'en' ? "Price" : "Цена"}</span>
                                <span className={styles.remove}></span>
                            </div>
                            <div>
                                {books.map(book => <CartItems key={book._id} book={book} settingPrice={settingPrice} deleteItem={deleteItem} />)}
                            </div>
                        </div> : <div><h2>Cart is Empty</h2></div>
                    }
                </div>
            : <FinishOrder books={books} totalPrice={totalPrice}/>}
        </div>

    );
};

export default Cart;