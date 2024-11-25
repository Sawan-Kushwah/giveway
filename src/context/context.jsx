// AuthContext.js
import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(localStorage.length === 0 ? false : true);


    return (
        <AuthContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
