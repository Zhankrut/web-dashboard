import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Signin from "../component/SignIn";
import Signup from "../component/SignUp";
import CustomUserProfile from "../component/CustomUserProfile";

const Profile = () => {
    const { isSignedIn, isLoaded, user } = useUser();
    const [showSignUp, setShowSignUp] = useState(false);

    if (!isLoaded) return <div>Loading...</div>;

    if (isSignedIn && user) {
        return (
            <div className="flex items-center justify-center min-h-[60vh] p-6">
                <div className="mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-2">
                        Welcome, {user.fullName || user.emailAddresses[0]?.emailAddress}
                    </h1>
                    <CustomUserProfile />
                </div>
            </div>
        )
    }


    return (
        <div className="p-6 max-w-md mx-auto">
            {showSignUp ? <Signup /> : <Signin />}
            <div className="mt-4 text-center">
                {showSignUp ? (
                    <p>
                        Already have an account?{" "}
                        <button className="text-blue-600" onClick={() => setShowSignUp(false)}>
                            Sign In
                        </button>
                    </p>
                ) : (
                    <p>
                        Don’t have an account?{" "}
                        <button className="text-blue-600" onClick={() => setShowSignUp(true)}>
                            Sign Up
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Profile;






