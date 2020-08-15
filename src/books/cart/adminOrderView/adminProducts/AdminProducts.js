import React from 'react';
import styles from './adminProducts.module.css';
import { Link } from 'react-router-dom';

const AdminProducts = ({ order }) => {
    const { _id, status } = order;

    return (
        <div className={styles.order}>
            <div className={styles['tit-stat']}>
                <Link to={`specOrder/${_id}`} ><h3>Номер: {_id}</h3></Link>
                <p>статус:<span className={styles.status}> {status}</span></p>
            </div>
        </div>
    )
};

export default AdminProducts;