import React, { useState, useEffect } from 'react';
import { servises } from '../../../services/servises';

const AdminOrderView = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        servises.getAllOrders(setOrders);
    }, []);

    console.log(orders);

    return(
        <div>
            Admin View
        </div>
    )
};

export default AdminOrderView;