import styles from "./Logo.module.css";
import {Link} from "react-router-dom";

function Logo() {
    return (
         <Link to="/">
            <img src="/public/images/logo.png" alt="WorldWise logo" className={styles.logo}/>
        </Link>
    )
}

export default Logo;
