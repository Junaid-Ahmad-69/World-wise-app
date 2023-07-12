
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
import {CitiesProvider} from "./Context/CitiesContext.jsx";


const App = () => {
    return (
        <CitiesProvider>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="app" element={<AppLayout/>}>
                        <Route index element={<Navigate replace to="cities"/>}/>
                        <Route path="cities" element={<CityList/>}/>
                        <Route path="cities/:id" element={<City/>}/>
                        <Route path="countries" element={<CountryList />}/>
                        <Route path="form" element={<Form/>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        </CitiesProvider>
    )
}

export default App

