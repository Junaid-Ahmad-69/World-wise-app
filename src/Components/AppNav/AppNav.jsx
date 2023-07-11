import styles from "./AppNav.module.css"
import {NavLink} from "react-router-dom";

export const AppNav = () => {
    return (
        <div className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="cities">Cities</NavLink>
                </li>
                <li>
                    <NavLink to="countries">Countries</NavLink>
                </li>
            </ul>
        </div>
    )
}
