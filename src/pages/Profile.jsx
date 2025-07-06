import { useUser } from '@clerk/clerk-react';
import SignInPage from '../component/CustomSignIn';
import SignUpPage from '../component/CustomSignUp';
import { UserProfile } from '@clerk/clerk-react'
import { SignOutButton } from '@clerk/clerk-react'
import { useState } from 'react';

const Profile = () => {
    const { isSignedIn, isLoaded } = useUser();
    const [showSignUp, setShowSignUp] = useState(false);

    if (!isLoaded) return <div>Loading...</div>;

    if (!isSignedIn) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                {showSignUp ? <SignUpPage /> : <SignInPage />}
                <button
                    onClick={() => setShowSignUp(!showSignUp)}
                    className="mt-4 text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    {showSignUp
                        ? 'Already have an account? Sign In'
                        : 'Don’t have an account? Sign Up'}
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 flex justify-center items-center ">
            <div>
                <UserProfile />
            </div>
        </div>

    );
};

export default Profile;
