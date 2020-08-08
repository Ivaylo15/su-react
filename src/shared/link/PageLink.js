import React from 'react';
import styles from './link.module.css';
import { Link } from 'react-router-dom';
// import './link.css';

class PageLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { name, url } = this.props;
        return (
            <li className={styles.listItem}><Link to={url}>{name}</Link></li>
            // <li className="listItem"><a href="#">Going to {number}</a></li>
        )
    }
}

export default PageLink;
