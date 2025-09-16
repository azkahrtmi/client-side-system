import React from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Register() {
  return (
    <div className="h-dvh bg-[#56ACBD] flex flex-col justify-center items-center content-center">
      <h1 className="text-white font-extrabold text-4xl/15 w-150 text-center">
        SYSTEM AUTHENTICATION MANAGEMENT
      </h1>
      <div className="bg-white/10 backdrop-blur-md items-center shadow-xl flex w-[535px] h-[500px] flex-col rounded-4xl mt-10 pt-5">
        <h1 className="text-2xl font-extrabold text-white pb-10">REGISTER</h1>
        <SignupForm />
        <p className="pt-5 text-white">
          Already have account?{" "}
          <a href="/" className="font-bold text-[#0000FF]">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
