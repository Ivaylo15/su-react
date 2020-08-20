import React, { useState, useContext, useEffect } from 'react';
import styles from './finishOrder.module.css'
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';


const FinishOrder = (props) => {
    const { lang, user, rendering } = useContext(UserContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentType, setPaymantType] = useState('');
    const { city, addres, cartIt } = user;

    useEffect(() => {
        const settingPrice = () => {
            let calPrice = 0;
            cartIt.forEach(product => {
                calPrice += parseFloat(product.price);
            })
            setTotalPrice(calPrice);
        };

        settingPrice();
    }, [cartIt]);

    console.log(cartIt)
    const onChangeValue = e => {
        setPaymantType(e.target.value)
    }

    const handleSubmit = e => {
        const order = {
            orderedItems: cartIt,
            price: totalPrice,
            payment: paymentType,
        }
        servises.postOrder(order, rendering, () => props.history.push('/profile'));
    }

    return (
        <div className={styles['finish-order']}>
            <div className={styles['addres']}>
                <div className={styles['city']}>{city}</div>
                <div className={styles['city-addres']}>{addres}</div>
            </div>
            <div className={styles['check-out']}>
                <div className={styles['radio-container']} onChange={onChangeValue}>
                    <label className={styles["container"]}>{lang === 'en' ? 'Cash' : 'Наложен Платеж'}
                    <input type="radio" name="radio" value="cash" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                    <label className={styles["container"]}>{lang === 'en' ? 'Card' : 'Карта'}
                    <input type="radio" name="radio" value="card" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                    <label className={styles["container"]}>{lang === 'en' ? 'Transaction' : 'Банков Превод'}
                    <input type="radio" name="radio" value="transaction" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                </div>
                <div className={styles['finish']}>
                    <div className={styles['price']}>{parseFloat(totalPrice).toFixed(2)}{lang === 'en' ? 'lv' : 'лв'}.</div>
                    <button type="submit" onClick={handleSubmit}>{lang === 'en' ? 'Order' : 'Завърши'}</button>
                </div>
            </div>
        </div>
    )
};

export default FinishOrder;