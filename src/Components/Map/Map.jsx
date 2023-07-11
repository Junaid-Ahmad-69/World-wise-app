import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";

const Map = () => {
    const navigate = useNavigate();
    const [searchParam, setSearchParam] = useSearchParams();
    const lat = searchParam.get("lat")
    const lng = searchParam.get("lng")
    return (
        <div className={styles.mapContainer} onClick={() => {
            navigate("form")
        }}>
            Map
            <button onClick={() => {
                setSearchParam({lat: 24, lng: 333})
            }}>Change location</button>
        </div>
    )
}

export default Map
