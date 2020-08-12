import React, { useState, useEffect, useContext } from 'react';
import { servises } from '../../../services/servises';
import { UserContext } from '../../../ContextWrapper';

const UserOrders = () => {
    const { user, lang } = useContext(UserContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        servises.getUserOrders(setOrders, user._id);
    }, [user._id]);
    console.log(orders)
    return (
        <div>
            yo
        </div>
    );
};

export default UserOrders;