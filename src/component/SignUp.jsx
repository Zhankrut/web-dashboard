import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "@clerk/clerk-react";
import SignupForm from "./SignUpForm";
import VerifyForm from "./VerifyForm";

const Signup = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [clerkError, setClerkError] = useState("");
    const navigate = useNavigate();
    const [verifying, setVerifying] = useState(false);
    const [code, setCode] = useState("");

    const signUpWithEmail = async ({ emailAddress, password }) => {
        if (!isLoaded) return;

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            await signUp.prepareEmailAddressVerification({
                strategy: "email_code",
            });

            setVerifying(true);
        } catch (err) {
            setClerkError(err?.errors?.[0]?.message || "Something went wrong");
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                navigate("/");
            } else {
                console.log("Verification Incomplete:", completeSignUp);
            }
        } catch (err) {
            console.log("Verification Error:", err);
        }
    };

    return (
        <>
            {!verifying ? (
                <SignupForm
                    signUpWithEmail={signUpWithEmail}
                    clerkError={clerkError}
                />
            ) : (
                <VerifyForm
                    handleVerify={handleVerify}
                    code={code}
                    setCode={setCode}
                />
            )}
        </>
    );
};

export default Signup;
