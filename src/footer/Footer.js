import React, { useContext } from 'react';
import styles from './footer.module.css';
import { UserContext } from '../ContextWrapper';


const Footer = (props) => {

    const { logged } = useContext(UserContext);

    return (
        <footer className={styles.Footer}>
            {/* <ul>
                {!logged ?
                    <Fragment>
                        <PageLink url="/register" name='Register' />
                        <PageLink url="/login" name='Login' />
                    </Fragment>
                    :
                    <Fragment>
                        <PageLink url="/post" name='Post' />
                        <PageLink url="/profile" name='Profile' />
                        <PageLink url="/logout" name='Logout' />
                    </Fragment>
                }
                <Link to="/">
                    <img src="blue-origami-bird-flipped.png" alt="origami" />
                </Link>
            </ul> */}
            <p>Software University Project @ 2020</p>
        </footer>
    )
}

export default Footer;
