import { createContext, useContext } from "react";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider value={{signed: true}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext