import { RecaptchaVerifier, signInWithPhoneNumber } 
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { auth } from "./firebase.js";

let confirmationResult;

window.sendOTP = async function () {

    const phone = document.getElementById("phone").value;

    if (!phone) {
        alert("Please enter your phone number.");
        return;
    }

    try {
        window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {}
        );

        confirmationResult = await signInWithPhoneNumber(
            auth,
            phone,
            window.recaptchaVerifier
        );

        alert("OTP sent successfully!");

    } catch (error) {
        console.error("OTP error:", error);

    } finally {
       
        document.getElementById("otpSection").style.display = "block";
    }
};

window.verifyOTP = async function () {
    const otp = document.getElementById("otp").value;

    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    try {
        const result = await confirmationResult.confirm(otp);

        alert("Phone number verified successfully!");

        console.log("Logged in user:", result.user);

        

    } catch (error) {
        console.error(error);
        // alert("Invalid OTP. Please try again.");
    }finally {
       
        window.location.href = "profile.html";
    };
} 


