import App from './App';
import './Signin.css';
import React, { useEffect, useState } from 'react';
import { auth } from './Firebase';
import SignUp from './SignUp';
import Practice from './Practice';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';

function SigninApp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                console.log('Signin component User is signed in:', currentUser.uid);
            }
        });
        return () => unsubscribe();
    }, []);
    const urlParams = new URLSearchParams(window.location.search);
    const homeworkParam = urlParams.get('h');
    const handleSignInWithEmail = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (!user.emailVerified) {
                await auth.signOut();
                alert('Please verify your email before signing in.');
            }
        } catch (error) {
            alert('Error signing in. ' + error.message);
            console.error('Error signing in:', error);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            alert('Please enter your email to reset your password.');
            return;
        }
        try {
            await sendPasswordResetEmail(auth, email);
            alert('Password reset email sent! Please check your inbox.');
        } catch (error) {
            alert('Error sending password reset email. ' + error.message);
            console.error('Error sending password reset email:', error);
        }
    };

    const handleSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch((error) => {
            console.error('Error signing in with Google:', error);
            alert('Error signing in with Google: ' + error.message);
        });
    };
    if (homeworkParam && homeworkParam.length > 5) {
        return (
            <Practice sourceDocumentID={homeworkParam} />
        );
    }
    if (!user || !user.emailVerified ||(1 === 1)) {
        return (
            <App user={user} />
        );
    }
    if (showSignUp) {
        return <SignUp onBackToSignIn={() => setShowSignUp(false)} />;
    }

    return (
        <div>
            <div style={{ fontSize: '22px', width: '100%', margin: '0 auto' }}>
                <br />
                <span style={{ fontSize: '16px', color: '#666' }}>First time user? Please click on </span>
                <button className="signuppagebutton" onClick={() => setShowSignUp(true)}>
                    Sign Up
                </button>
                <br />
                <br />
                <input
                    className="textinput"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <br />
                <br />
                <input
                    type="password"
                    className="textinput"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <br />
                <button className="signonpagebutton" onClick={handleSignInWithEmail}>
                    Sign In
                </button>
                &nbsp;&nbsp;
                <button onClick={handleResetPassword}>
                    Did you forget Password?
                </button>
                <br />
                <br />

                <span> Or </span>
                <br />
                <br />
                <button className="signgooglepagebutton" onClick={handleSignInWithGoogle}>Sign In with Google</button>
                <br />
                <br />
            </div>
        </div>
    );
}

export default SigninApp;
