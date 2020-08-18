import React, { useContext } from 'react';
import styles from './adminProducts.module.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../../ContextWrapper';

const AdminProducts = ({ order }) => {
    const { lang } = useContext(UserContext);
    const { _id, status } = order;

    return (
        <div className={styles.order}>
            <div className={styles['tit-stat']}>
                <Link to={`specOrder/${_id}`} ><h3>{lang === 'en' ? 'ID' : 'Номер'}: {_id}</h3></Link>
                <p>{lang === 'en' ? 'status' : 'статут'}:<span className={styles.status}> {status}</span></p>
            </div>
        </div>
    )
};

export default AdminProducts;