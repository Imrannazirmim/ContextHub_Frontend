import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    sendPasswordResetEmail,
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

    const saveUserToBackend = async (firebaseUser) => {
        const userInfo = {
            name: firebaseUser.displayName || "User",
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL || "",
        };

        try {
            await axios.post("https://contesthub-server-chi.vercel.app/users", userInfo);
            console.log("User saved to backend:", userInfo.email);
        } catch (err) {
            console.error("Failed to save user to backend:", err.response?.data || err.message);
        }
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
            await userCredential.user.reload();
            const updatedUser = auth.currentUser;
            setUser(auth.currentUser);
            await saveUserToBackend(updatedUser);
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

    const forgetPassword = async (email) => {
        setLoading(true);
        setError(null);
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (err) {
            handleAuthError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
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
        forgetPassword,
    };
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider;
