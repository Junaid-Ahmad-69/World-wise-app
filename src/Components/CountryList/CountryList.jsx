import Spinner from "../Spinner/Spinner.jsx";
import styles from "./CountryList.module.css"
import CountryItem from "../CountryItem/CountryItem.jsx";
import Message from "../Message/Message.jsx";
import {useCities} from "../../Context/CitiesContext.jsx";

const CountryList = () => {
    const {isLoading, cities} = useCities();
    if (isLoading) return <Spinner/>
    if (!cities.length) return <Message message="Add you first city by clicking on a city on the map"/>

    const country = cities.reduce((arr, city) => {
        if (!arr.map((country) => country.country).includes(city.country))
            return [...arr, {country: city.country, emoji: city.emoji}];
        else return arr;
    }, [])
    return (
        <ul className={styles.countryList}>
            {country.map((country) => <CountryItem country={country} key={country.country}/>)}
        </ul>
    )
}

export default CountryList
