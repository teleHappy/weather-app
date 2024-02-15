import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

function NavBar({selected}: {selected: string}) {
    return (
        <nav className={styles.navbar}>
          <ul className={styles.nav_list}>
            <li className={`${styles.nav_item} ${styles.selected}`}><Link to="/">Now</Link></li>
            <li className={styles.nav_item}><Link to="/hourly">Hourly</Link></li>
            <li className={styles.nav_item}><a href="#">Daily</a></li>
          </ul>
        </nav>
    );
}

export default NavBar;