import styles from "./Map.module.css"
import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet"
import {useEffect, useState} from "react";
import {useCities} from "../../Context/CitiesContext.jsx";
import {useNavigate} from "react-router-dom";
import {useGeolocation} from "../../Hooks/useGeolocation.js";
import Button from "../Button/Button.jsx";
import {useUrlPosition} from "../../Hooks/useUrlPosition.js";
import Spinner from "../Spinner/Spinner.jsx";

const Map = () => {
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const {cities} = useCities();
    const {
        isLoading: isLoadingPosition,
        position: geoLocationPosition,
        getPosition,
    } = useGeolocation();
    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng])
    useEffect(() => {
        if (geoLocationPosition) setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
    }, [geoLocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geoLocationPosition && <Button type="position"
                                             onClick={getPosition}>{isLoadingPosition ? "Loading..." : "Use your position"}</Button>}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji} {city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <MapCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    )
}

function MapCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => {
            // e is default event of useMapEvents which giv the latitude and longitude value when click on map
            // and then pass these values to the for parameter
            console.log(e)
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}

export default Map
