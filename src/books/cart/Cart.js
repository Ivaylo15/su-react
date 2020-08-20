import React, { useContext, useState, useEffect } from 'react';
import styles from './cart.module.css'
import { UserContext } from '../../ContextWrapper';
import { servises } from '../../services/servises';
import CartItems from './cartItems/CartItems';
import { Link } from 'react-router-dom';


const Cart = () => {
    const { lang, user, ren, rendering } = useContext(UserContext);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const settingPrice = () => {
            let calPrice = 0;
            user.cartIt.forEach(product => {
                console.log(product.price)
                calPrice += parseFloat(product.price);
            })
            setTotalPrice(calPrice);
        };

        settingPrice();
    }, [user.cartIt, ren]);


    const deleteItem = (productId) => {
        const body = {
            product: productId,
            user: user._id,
        }
        servises.deleteCartItem(productId, body, rendering);
    };
    return (
        <div>
            <div className={styles['cart-container']}>
                {
                    user.cartIt.length !== 0 && user.cartIt !== undefined ? <div className={styles.cart}>
                        <h2>{lang === 'en' ? "Cart" : "Количка"}</h2>
                        <div className={styles['check-out']}>
                            <span>Tottal amount: {totalPrice.toFixed(2)}lv</span>
                            <Link to={`/finishOrder/`}><button>Купи</button></Link>
                        </div>
                        <div className={styles["cart-layout"]}>
                            <span className={styles.product}>{lang === 'en' ? "Product" : "Продукт"}</span>
                            <span className={styles.price}>{lang === 'en' ? "For one" : "Ед. Цена"}</span>
                            <span className={styles.amount}>{lang === 'en' ? "Amount" : "Количество"}</span>
                            <span className={styles.price}>{lang === 'en' ? "Price" : "Цена"}</span>
                            <span className={styles.remove}></span>
                        </div>
                        <div>
                            {user.cartIt.map(product => <CartItems key={product._id} product={product} deleteItem={deleteItem} />)}
                        </div>
                    </div> : <div><h2>Cart is Empty</h2></div>
                }
            </div>
        </div>

    );
};

export default Cart;