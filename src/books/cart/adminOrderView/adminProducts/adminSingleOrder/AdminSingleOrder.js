import React, { useState, useEffect, useContext } from 'react';
import styles from './adminSingleOrder.module.css';
import { servises } from '../../../../../services/servises';
import { UserContext } from '../../../../../ContextWrapper';
import RenderProducts from '../../../userOrders/userOrder/RenderProducts';

const AdminSingleOrder = (props) => {
    const { lang, rendering } = useContext(UserContext);
    let url = props.location.pathname.split('/')[2];
    const [order, setOrder] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { _id: orderId, status, user, orderedItems, payment, price, } = order;
    const [itmesFromOrder, setItmesFromOrder] = useState([]);
    const [bgPayment, setBgPayment] = useState([]);


    const { firstname, lastname, city, addres } = userInfo;

    useEffect(() => {
        servises.getSpecOrders(setOrder, url)
    }, [url]);

    useEffect(() => {
        servises.getSpecificUser(user, setUserInfo)
    }, [user]);

    useEffect(() => {
        servises.getCartIt2(orderedItems, setItmesFromOrder);
    }, [orderedItems]);

    useEffect(() => {
        const paymentType = () => {
            if (payment === 'cash') {
                setBgPayment('Брой');
            } else if (payment === 'card') {
                setBgPayment('Карта');
            } else {
                setBgPayment('Превод');
            }
        };

        paymentType();
    }, [payment])

    const handleStatusChange = (e) => {
        const status = e.target.value
        console.log(status)
        const body = {
            status: status
        };

        servises.changeOrderStatus(body, orderId, rendering);
    }

    return (
        <div className={styles.order}>
            <h2>{lang === 'en' ? 'Order Status' : 'Състояние на Поръчката'}</h2>
            <div className={styles['order-info']}>
                <div className={styles['prod-stat-price']}>
                    <div>
                        {
                            itmesFromOrder.map(item => <RenderProducts key={item._id} product={item} />)
                        }
                    </div>
                    <div className={styles['status-price']}>
                        <div>
                            <label htmlFor="status" >{lang === 'en' ? 'Status' : 'Статут'}: </label>
                            <select id="status" className={styles.status} onChange={handleStatusChange}>
                                <option value={status}>{status}</option>
                                <option value="sent">Sent</option>
                                <option value="delivered">Deliverd</option>
                            </select>
                        </div>
                        <div className={styles.payment}>
                            <span className={styles.price}>{lang === 'en' ? `payment: ${payment}` : `плащане: ${bgPayment}`}</span>
                            <span className={styles.price}>{lang === 'en' ? 'price' : 'цена'}: {price}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['client']}>{lang === 'en' ? 'client' : 'поръчител'}: <span>{firstname} {lastname}</span></div>
                <div className={styles['addres']}>{lang === 'en' ? 'addres' : 'адрес'}: <span>{lang === 'en' ? 'city' : 'гр.'} {city} {addres}</span></div>
            </div>
        </div>
    )
};

export default AdminSingleOrder;