import {useContext, createContext, useReducer} from "react";

const AuthContext = createContext();

const initialValue = {
    user: null,
    isAuthenticated: false
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
    switch (action.type) {
        case "login":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case "logout":
            return initialValue;
        default:
            throw new Error("Unknown action")
    }
}


function AuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialValue)

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({type: "login", payload: FAKE_USER})
    }

    function logout() {
        dispatch({type: "logout"})
    }


    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        logout,
        login
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext is used outside of the AuthProvider");
    return context
}

export {AuthProvider, useAuth }