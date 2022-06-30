import { auth } from '../../firebase';
import React, { useContext, useEffect, useState } from 'react';

const AuthContext = React.createContext();

/*export function AuthProvider({ children, value }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsuscribe;
    }, []);
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
};*/
export function AuthProvider({children, value}) {
    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    )
  }
export function useAuthValue() {
    return useContext(AuthContext)
};