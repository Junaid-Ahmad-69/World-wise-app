// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import styles from "./Form.module.css";
import Button from "../Button/Button.jsx";
import BackButton from "../BackButton/BackButton.jsx";
import {useUrlPosition} from "../../Hooks/useUrlPosition.js";
import Message from "../Message/Message.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import {useCities} from "../../Context/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

function Form() {
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
    const [emoji, setEmoji] = useState("");
    const [geoCodingError, setGeoCodingError] = useState("")
    const {createCity, isLoading} = useCities()
    const navigate = useNavigate();
    const BASE_URL = `https://api.bigdatacloud.net/data/reverse-geocode-client`;

    useEffect(() => {
        if (!lat && !lng) return;

        async function fetchCityData() {
            try {
                setIsLoadingGeoLocation(true);
                setGeoCodingError("")
                const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
                const data = await res.json();
                if (!data.countryCode) throw new Error("That's doesn't seem to be a city. Click somewhere else")
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName);
                setEmoji(convertToEmoji(data.countryCode))
            } catch (error) {
                setGeoCodingError(error.message)
            } finally {
                setIsLoadingGeoLocation(false)
            }
        }

        fetchCityData()

    }, [lng, lat])


    async function handleSubmit(e) {
        e.preventDefault();
        if (!cityName && !date) return;
        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: {
                lat, lng
            }
        }
        await createCity(newCity)
        navigate("/app/cities")
    }

    if (isLoadingGeoLocation) return <Spinner/>
    if (!lat && !lng) return <Message message="Start by clicking on the map"/>
    if (geoCodingError) return <Message message={geoCodingError}/>
    return (
        <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker id="date" format="dd/MM/yyyy" selected={date} onChange={(date) => setDate(date)}/>
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">Notes about your trip to {cityName}</label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton/>
            </div>
        </form>
    );
}

export default Form;
