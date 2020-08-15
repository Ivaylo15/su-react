import React, { useState, useContext } from 'react';
import styles from './finishOrder.module.css'
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';


const FinishOrder = (props) => {
    const { lang, user, rendering } = useContext(UserContext);
    const { totalPrice, books } = props.location;
    // const { totalPrice, books } = props;
    const [paymentType, setPaymantType] = useState('');
    const { city, addres } = user;

    const onChangeValue = e => {
        setPaymantType(e.target.value)
    }

    const handleSubmit = e => {
        const order = {
            products: books,
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
                    <label className={styles["container"]}>Наложен Платеж
                    <input type="radio" name="radio" value="cash" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                    <label className={styles["container"]}>Карта
                    <input type="radio" name="radio" value="card" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                    <label className={styles["container"]}>Банков Превод
                    <input type="radio" name="radio" value="transaction" />
                        <span className={styles["checkmark"]} name="radio"></span>
                    </label>
                </div>
                <div className={styles['finish']}>
                    <div className={styles['price']}>{totalPrice}лв.</div>
                    <button type="submit" onClick={handleSubmit}>Завърши</button>
                </div>
            </div>
        </div>
    )
};

export default FinishOrder;