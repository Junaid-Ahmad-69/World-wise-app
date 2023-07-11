import {NavLink} from "react-router-dom";
import styles from "./Navbar.module.css"
import Logo from "../Logo/Logo.jsx";

export const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <Logo/>
            <ul>
                <NavLink to="/Pricing">Pricing</NavLink>
                <NavLink to="/product">Product</NavLink>
                <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
            </ul>
        </nav>
    )
}
