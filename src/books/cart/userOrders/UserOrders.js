import React, { useState, useEffect, useContext } from 'react';
import { servises } from '../../../services/servises';
import styles from './userOrders.module.css';
import { UserContext } from '../../../ContextWrapper';
import UserOrder from './userOrder/userOrder';

const UserOrders = () => {
    const { user, lang } = useContext(UserContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        servises.getUserOrders(setOrders, user._id);
    }, [user._id]);

    return (
        <div className={styles.orders}>
            <h2>{lang === 'en' ? 'Orders' : 'Поръчки'}</h2>
            {orders.map(order => <UserOrder key={order._id} order={order} />)}
        </div>
    );
};

export default UserOrders;