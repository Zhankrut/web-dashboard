import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "@clerk/clerk-react";
import SigninForm from "./SignInForm";

const Signin = () => {
    const { isLoaded, signIn, setActive } = useSignIn();
    const [clerkError, setClerkError] = useState("");
    const navigate = useNavigate();

    const signInWithEmail = async ({ emailAddress, password }) => {
        if (!isLoaded) return;

        try {
            const result = await signIn.create({
                identifier: emailAddress,
                password,
            });

            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                navigate("/");
            } else {
                console.log("Incomplete sign-in result:", result);
            }
        } catch (err) {
            console.log("Error:", err);
            const errorMsg =
                err?.errors?.[0]?.message || "Failed to sign in. Please try again.";
            setClerkError(errorMsg);
        }
    };

    return (
        <SigninForm signInWithEmail={signInWithEmail} clerkError={clerkError} />
    );
};

export default Signin;
