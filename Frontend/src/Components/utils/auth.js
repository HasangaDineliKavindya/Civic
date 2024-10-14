import { auth, Auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    //result.user
    return result
}

export const doSignOut = () => {
    return auth.signOut();
};

/*
//for password reset
export const doPasswordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
};

//update password
export const doPasswordChange = (password) => {
    return updatePassword(auth.currentUser, password);
};

//send email verification
export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser, {

        url: `${window.location.origin}/Home`,
    });
};
*/


