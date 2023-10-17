import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [adminEmail, SetadminEmail] = useState('');
    const [adminUid, SetadminUid] = useState('');
    return (
        <AuthContext.Provider value={{
            adminEmail, SetadminEmail,
            adminUid, SetadminUid
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };