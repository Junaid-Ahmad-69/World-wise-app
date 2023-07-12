import {createContext, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext();


const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
}

function reducer(state, action) {
    switch (action.type) {

        case "loading":
            return {
                ...state,
                isLoading: true,
            }

        case "cities/loaded":
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            }

        case "city/loaded":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            }

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            }

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {},
            }

        case "rejected":
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            throw new Error("Unknown action type");
    }


}

const BASE_URL = "http://localhost:9000"
const CitiesProvider = ({children}) => {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        async function fetchCities() {
            dispatch({type: "loading"})
            try {
                const response = await fetch(`${BASE_URL}/cities`)
                const cityData = await response.json();
                dispatch({type: "cities/loaded", payload: cityData})
            } catch {
                dispatch({type: "rejected", payload: `There was an error while loading the cities....`})
            }
        }

        fetchCities()
    }, []);

    async function getCities(id) {
        if (Number(id) === currentCity.id) return;
        dispatch({type: "loading"})
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`)
            const cityData = await response.json();
            dispatch({type: "city/loaded", payload: cityData})
        } catch {
            dispatch({type: "rejected", payload: `There was an error while loading the city....`})
        }
    }

    async function createCity(newCity) {
        // dispatch({type: "loading"})
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const cityData = await response.json();

            dispatch({type: "city/created", payload: cityData})
        } catch {
            dispatch({type: "rejected", payload: `There was an error while creating the city....`})
        }
    }

    async function deleteCity(id) {
        dispatch({type: "loading"})
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            dispatch({type: "city/deleted", payload: id})
        } catch {
            dispatch({type: "rejected", payload: `There was an error while deleting the city....`})
        }
    }

    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCities,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error("CitiesContext are used outside of the CitiesProvider")
    return context
}

export {CitiesProvider, useCities}
