import React, { useState, useEffect, useContext } from 'react';
import styles from './adminOrdeerView.module.css';
import { servises } from '../../../services/servises';
import AdminProducts from './adminProducts/AdminProducts';
import { UserContext } from '../../../ContextWrapper';

const AdminOrderView = () => {
    const { lang } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        servises.getAllOrders(setOrders);
    }, []);


    return(
        <div className={styles.orders}>
            <h2>{lang === 'en' ? 'Orders': 'Поръчки'}</h2>
            {orders.map(order => <AdminProducts key={order._id} order={order} />)}
        </div>
    )
};

export default AdminOrderView;