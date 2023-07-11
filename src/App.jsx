import {useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import Product from "./Pages/Product/Product.jsx";
import Pricing from "./Pages/Pricing/Pricing.jsx";
import Homepage from "./Pages/Homepage/Homepage.jsx";
import {PageNotFound} from "./Pages/PageNotFound/PageNotFound.jsx";
import {AppLayout} from "./Pages/AppLayout/AppLayout.jsx";
import Login from "./Pages/Login/Login.jsx";
import CityList from "./Components/CityList/CityList.jsx";
import CountryList from "./Components/CountryList/CountryList.jsx";
import City from "./Components/City/City.jsx";
import Form from "./Components/Form/Form.jsx";

const BASE_URL = "http://localhost:9000"
const App = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const response = await fetch(`${BASE_URL}/cities`)
                const cityData = await response.json();
                setCities(cityData)
            } catch (e) {
                console.log(e)
            } finally {
                setIsLoading(false)

            }
        }

        fetchCities()
    }, []);

    // Delete Items
    function handleRemoveCity(id) {
        setCities(cities.filter(city => city.id !== id))
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="app" element={<AppLayout/>}>
                        <Route index element={<Navigate replace to="cities"/>}/>
                        <Route path="cities" element={<CityList isLoading={isLoading} cities={cities}
                                                                onRemoveCity={handleRemoveCity}/>}/>
                        <Route path="cities/:id" element={<City/>}/>
                        <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
                        <Route path="form" element={<Form/>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

