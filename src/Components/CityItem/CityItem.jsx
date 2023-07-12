import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";
import {useCities} from "../../Context/CitiesContext.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: "long",
    }).format(new Date(date));
const CityItem = ({cityItem}) => {
    const {currentCity, deleteCity} = useCities()
    const {emoji, cityName, date, id, position} = cityItem;

    function handleRemoveCity (e){
        e.preventDefault();
        deleteCity(id)
    }
    return (
        <li>
            <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`}
                  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <span className={styles.emoji}>
            {emoji}
            </span>
                <h3 className={styles.name}>{cityName} </h3>
                <time className={styles.date}>
                    {(formatDate(date))}
                </time>
                <button className={styles.deleteBtn} onClick={handleRemoveCity}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
