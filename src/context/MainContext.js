import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "../Firebase";

export const MainContext = createContext();

export const useMain = () => {
    return useContext(MainContext);
}

export const MainContextProvider = (props) => {
    const { currentUser } = useAuth();
    const [following, setFollowing] = useState([]);
    const [isMounted, setIsMounted] = useState(true);

    const getFollowing = async () => {
        await firestore.collection("follows")
            .where("uid", "==", `${currentUser.uid}`)
            .onSnapshot((snapshot) => {
                if (snapshot.empty) {
                    if (isMounted) {
                        setFollowing([]);
                    }
                } else {
                    if (isMounted) {
                        setFollowing(
                            snapshot.docs.map((doc) => ({
                                id: doc.id,
                                followingUser: doc.data(),
                            }))
                        );
                    }
                }
            })
    }

    const value = {
        following,
    }


        ;
    useEffect(() => {
        setIsMounted(true);
        if(currentUser){
        getFollowing();
        }

        return () => {
            setIsMounted(false);
        };
    }, [currentUser]);


    return (
        <MainContext.Provider value={value}>
            {props.children}
        </MainContext.Provider>
    )
}