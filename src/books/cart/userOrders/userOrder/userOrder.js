import React, { useEffect, useState } from 'react';
import styles from './userOrder.module.css';
import { servises } from '../../../../services/servises';
import { Link } from 'react-router-dom';

const UserOrder = ({ order }) => {
    console.log(order)
    const { _id, status, products, price, } = order;
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        servises.getOrderdBooks(products, setAllProducts)
    }, [products]);

    let renderProducts = allProducts.map(product => {
        return (<div key={product._id} className={styles.product}>
                <img src={product.image} alt="book-cover" />
                <Link to={`/details/${product._id}`}><h4>{product.title}</h4></Link>
        </div>)
    })

    console.log(allProducts);

    return (
        <div className={styles.order}>
            <div className={styles['tit-stat']}>
                <h3>Номер: {_id}</h3>
                <p>статус:<span className={styles.status}> {status}</span></p>
            </div>
            <div className={styles['pro-price']}>
                <div>{renderProducts}</div>
                <span className={styles.price}>цена: {price}</span>
            </div>
        </div>
    )
};

export default UserOrder;