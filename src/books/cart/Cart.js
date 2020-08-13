import React, { useContext, useState, useEffect } from 'react';
import styles from './cart.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import CartItems from './cartItems/CartItems';
import { Link } from 'react-router-dom';


const Cart = (props) => {
    const { lang, user, rendering } = useContext(UserContext);
    // const [user, setUser] = useState({});
    const [books, setBooks] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    // const [order, setOrder] = useState([]);

    useEffect(() => {
        servises.getCart(user.cart, setBooks)
    }, [user.cart])

    const settingPrice = (price) => {
        setTotalPrice(totalPrice => totalPrice + price);
    };

    // const settingOrder = (bookId, amount) => {
    //     let item = {};

    //     books.forEach(book => {
    //         if(book._id === bookId){
    //             item = {
    //                 book,
    //                 amount: amount
    //             }
    //         }else{
    //             item = {
    //                 book,
    //                 amount: 1
    //             }
    //         }
    //         console.log(item)
    //     })

    // for (let i = 0; i < books.length; i++) {
    //     if (books[i]['_id'] === bookId) {
    //         console.log('yo')
    //         item = {
    //             book: books[i],
    //             amount: amount
    //         };
    //         continue;
    //     } else {
    //         item = {
    //             book: books[i],
    //             amount: 1
    //         }
    //     }
    //     console.log(item)
    // }
    // }




    const deleteItem = (bookId) => {
        user.cart.splice(user.cart.indexOf(bookId), 1);
        servises.putCart(user.cart, user._id);
        rendering();
    };
    console.log(books.length)
    return (
        <div className={styles['cart-container']}>
            {
                books.length !== 0 ? <div className={styles.cart}>
                    <h2>{lang === 'en' ? "Cart" : "Количка"}</h2>
                    <div className={styles['check-out']}>
                        <span>Tottal amount: {totalPrice.toFixed(2)}lv</span>
                        <Link to={{ pathname: "/finishOrder", books, totalPrice }}><button>Купи</button></Link>
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
    );
};

export default Cart;