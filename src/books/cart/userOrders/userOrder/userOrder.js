import React, { useEffect, useState, useContext } from 'react';
import styles from './userOrder.module.css';
import RenderProducts from './RenderProducts';
import { servises } from '../../../../services/servises';
import { UserContext } from '../../../../ContextWrapper';

const UserOrder = ({ order }) => {
    const { lang } = useContext(UserContext);
    const { _id, status, orderedItems, payment, price, } = order;
    const [itmesFromOrder, setItmesFromOrder] = useState([]);
    const [bgPayment, setBgPayment] = useState([]);

    useEffect(() => {
        const paymentType = () => {
            if (payment === 'cash') {
                setBgPayment('Брой');
            } else if (payment === 'card') {
                setBgPayment('Карта');
            } else {
                setBgPayment('Превод');
            }
        }

        servises.getCartIt2(orderedItems, setItmesFromOrder);
        paymentType();
    }, [orderedItems, payment]);



    return (
        <div className={styles.order}>
            <div className={styles['tit-stat']}>
                <h3>{lang === 'en' ? 'ID' : 'Номер'}: {_id}</h3>
                <p>Статус:<span className={styles.status}> {status}</span></p>
            </div>
            <div className={styles['pro-price']}>
                <div>
                    {itmesFromOrder.map(item => <RenderProducts key={item._id} product={item} />)}
                </div>
                <div className={styles.payment}>
                    <span className={styles.price}>{lang === 'en' ? `payment: ${payment}` : `плащане: ${bgPayment}`}</span>
                    <span className={styles.price}>{lang === 'en' ? 'price' : 'цена'}: {price}</span>
                </div>
            </div>
        </div>
    )
};

export default UserOrder;