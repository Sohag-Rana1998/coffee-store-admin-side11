import { createContext, useEffect, useState } from 'react';
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import app from '../../Firebase/firebase.config';
export const AuthContext = createContext(null);
export const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      console.log(currentUser);
      setLoading(true);
      setUser(currentUser);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    });

    return () => {
      unSubscribe();
    };
  }, [auth]);

  const createUser = (name, email, password) => {
    return createUserWithEmailAndPassword(auth, name, email, password);
  };

  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleProvider = new GoogleAuthProvider();

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const facebookProvider = new FacebookAuthProvider();

  const facebookLogin = () => {
    return signInWithPopup(auth, facebookProvider);
  };
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    updateUser,
    googleLogin,
    facebookLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
