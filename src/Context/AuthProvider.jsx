import { useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
    signOut,
} from "firebase/auth";
import {auth} from "../config/firebase.js";
import {AuthContext} from "./AuthContext.jsx";

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const googleProvider = new GoogleAuthProvider();
    const createUserAccount = async (email, password, name, photoUrl) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;
            await updateProfile(newUser, {
                displayName: name,
                photoURL: photoUrl
            })


            setUser({...newUser, displayName:name, photoURL:photoUrl});
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };



    const signInUser = async (email, password) => {
        setLoading(true), setError(null);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            setUser(result.user);
            return result.user
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const googleSignUser = async () => {
        setLoading(true); setError(null);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result.user;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        await signOut(auth);
        setUser(null);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        error,
        createUserAccount,
        signInUser,
        logoutUser,
        googleSignUser,
    };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
}

export default AuthProvider