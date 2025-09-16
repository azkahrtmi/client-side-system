import { useState } from "react";
import CopyField from "../components/CopyField";
import LoginForm from "../components/LoginForm";

function Login() {
  const [email] = useState("admin@mail.com");
  const [password] = useState("admin123");

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* left */}
      <div className="w-1/2 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-[#56ACBD] pt-20">
          ADMIN ACCOUNT
        </h1>
        <div className="bg-gradient-to-bl w-170 from-[#40DBFA] to-[#A0A2A3]/40 items-end shadow-xl p-15 pr-10 flex flex-col rounded-4xl gap-2 mt-20">
          <h1 className="font-semibold text-[36px] w-120 text-right pb-5">
            USE THIS ACCOUNT TO LOGIN AS ADMIN
          </h1>

          {/* EMAIL */}
          <CopyField value={email} />
          {/* PASSWORD */}
          <CopyField value={password} />

          <div className="text-[10px] pt-2">
            <p className="text-[#980202]">
              IF YOU WANT TO LOGIN AS USER{" "}
              <a
                href="/signup"
                className="text-[#0000FF] font-semibold">
                CLICK HERE
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="w-1/2 bg-[#56ACBD] flex flex-col items-center text-center">
        {/* TITLE */}
        <h1 className="text-4xl w-150 font-extrabold text-white pt-20">
          SYSTEM AUTHENTICATION MANAGEMENT
        </h1>
        {/* BOX */}
        <div className="bg-white/10 backdrop-blur-md items-center shadow-xl flex w-[535px] h-[373px] flex-col rounded-4xl mt-10 pt-5">
          <h1 className="text-2xl font-extrabold text-white pb-10">LOGIN</h1>
          <LoginForm />
          <p className="pt-5 text-white">
            Don't have account?{" "}
            <a
              href="/signup"
              className="font-bold text-[#0000FF]">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
