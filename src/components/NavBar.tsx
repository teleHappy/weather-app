import React from 'react';
import { Link } from 'react-router-dom';
// import styles from './NavBar.module.css';

function NavBar({ selected }: { selected: string }) {
  
  const navArrayMap: string[][] = [
    ['current', '/', 'Now'],
    ['daily', '/daily', 'Daily'],
    ['hourly', '/hourly', 'Hourly'],
  ]

  return (
    <nav className={"navbar"}>
      <ul className={"nav_list"}>
        {navArrayMap.map((navItem, index) => {
          const navItemClass = "nav_item ";
          const selectedClass = navItem[0] === selected ? "selected" : "";

          return (<li className={navItemClass + selectedClass} key={index}><Link to={"/weather-app" + navItem[1]}>{navItem[2]}</Link></li>)
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
