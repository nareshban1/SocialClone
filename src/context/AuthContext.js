import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider} from "../Firebase"


export const UserContext = createContext();

export const useAuth = () => {
    return useContext(UserContext);
}

export const UserContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();


    const signInGoogle = async () => {
        return await auth.signInWithPopup(provider);

    }

    const logout = async () => {
        return await auth.signOut();

    }


    const value = {
        currentUser,
        signInGoogle,
        logout
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            
        })
        return unsubscribe;
    }, [currentUser])


    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}