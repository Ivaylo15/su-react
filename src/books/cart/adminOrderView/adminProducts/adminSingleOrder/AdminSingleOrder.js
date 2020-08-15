import React, { useState, useEffect, useContext } from 'react';
import styles from './adminSingleOrder.module.css';
import { servises } from '../../../../../services/servises';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../../ContextWrapper';

const AdminSingleOrder = (props) => {
    const { lang, rendering } = useContext(UserContext);
    let url = props.location.pathname.split('/')[2];
    const [order, setOrder] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const { _id: orderId, status, user, products, price, } = order;
    const [allProducts, setAllProducts] = useState([]);
    const { firstname, lastname, city, addres } = userInfo;

    useEffect(() => {
        servises.getSpecOrders(setOrder, url)
    }, [url]);

    useEffect(() => {
        servises.getSpecificUser(user, setUserInfo)
    }, [user]);

    useEffect(() => {
        servises.getOrderdBooks(products, setAllProducts)
    }, [products]);

    const handleStatusChange = (e) => {
        const status = e.target.value
        console.log(status)
        const body = {
            status: status
        };

        servises.changeOrderStatus(body, orderId, rendering);
    }

    let renderProducts = allProducts.map(product => {
        return (<div key={product._id} className={styles.product}>
            <img src={product.image} alt="book-cover" />
            <div className={styles['tit-amo']}>
                <Link to={`/details/${product._id}`}><h4>{product.title}</h4></Link>
                <div className={styles['amount']}>amaount: 2</div>
            </div>
        </div>)
    });

    console.log(userInfo);

    return (
        <div className={styles.order}>
            <h2>Order Status</h2>
            <div className={styles['order-info']}>
                <div className={styles['prod-stat-price']}>
                    <div>{renderProducts}</div>
                    <div className={styles['status-price']}>
                        <div>
                            <label htmlFor="status" >status:</label>
                            <select id="status" className={styles.status} onChange={handleStatusChange}>
                                <option value={status}>{status}</option>
                                <option value="sent">Sent</option>
                                <option value="delivered">Deliverd</option>
                            </select>
                        </div>
                        <span className={styles.price}>цена: {price}</span>
                    </div>
                </div>
                <div className={styles['client']}>поръчител: <span>{firstname} {lastname}</span></div>
                <div className={styles['addres']}>адрес: <span>гр.{city} {addres}</span></div>
            </div>
        </div>
    )
};

export default AdminSingleOrder;