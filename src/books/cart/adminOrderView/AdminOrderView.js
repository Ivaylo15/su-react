import React, { useState, useEffect } from 'react';
import styles from './adminOrdeerView.module.css';
import { servises } from '../../../services/servises';
import AdminProducts from './adminProducts/AdminProducts';

const AdminOrderView = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        servises.getAllOrders(setOrders);
    }, []);

    console.log(orders);

    return(
        <div className={styles.orders}>
            <h2>Поръчки</h2>
            {orders.map(order => <AdminProducts key={order._id} order={order} />)}
        </div>
    )
};

export default AdminOrderView;