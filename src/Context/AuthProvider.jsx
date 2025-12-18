import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../config/firebase";
import axios from "axios";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleAuthError = (err) => {
        let message = err.message || "Something went wrong.";
        if (err.code) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    message = "This email is already registered.";

                    break;
                case "auth/invalid-email":
                    message = "Invalid email address.";
                    break;
                case "auth/weak-password":
                    message = "Password should be at least 6 characters.";
                    break;
                case "auth/user-not-found":
                    message = "User not found.";
                    break;
                case "auth/wrong-password":
                    message = "Incorrect password.";
                    break;
                case "auth/too-many-requests":
                    message = "Too many login attempts. Please try again later.";
                    break;
                case "auth/invalid-credential":
                    message = "Incorrect password.";
                    break;
                default:
                    message = err.message;
            }
        }
        setError(message);
        throw new Error(message);
    };

    const registerUser = async (email, password, name, photoURL) => {
        setLoading(true);
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            if (name || photoURL) {
                await updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: photoURL || "",
                });
            }

            setUser(auth.currentUser);
            return userCredential;
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    const signInUser = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };
    const signInWithGoogle = async () => {
        setLoading(true);
        setError(null);
        try {
            return await signInWithPopup(auth, googleProvider);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    //update profile
    const updateUserProfile = async (name, photoURL) => {
        try {
            if (!auth.currentUser) throw new Error("No User logged in.");
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: photoURL,
            });
            setUser(auth.currentUser);
        } catch (err) {
            handleAuthError(err);
        }
    };

    const logOut = async () => {
        setLoading(true);
        setError(null);
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const userInfo = {
                    name: currentUser.displayName,
                    email: currentUser.email,
                    photoURL: currentUser.photoURL,
                };
                await axios.post("http://localhost:3000/users", userInfo);
            }
        });
        return () => unSubscribe();
    }, []);
    const authInfo = {
        user,
        loading,
        error,
        setError,
        registerUser,
        signInUser,
        signInWithGoogle,
        updateUserProfile,
        logOut,
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
