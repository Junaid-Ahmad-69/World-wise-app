 import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
const CityItem = ({cityItem, onRemoveCity}) => {
    const {emoji, cityName, date, id, position} = cityItem
    return (
        <li>
            <Link className={styles.cityItem} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>
            {emoji}
            </span>
                <h3 className={styles.name}>{cityName} </h3>
                <time className={styles.date}>
                    {(formatDate(date))}
                </time>
                <button className={styles.deleteBtn} onClick={() => onRemoveCity(id)}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
