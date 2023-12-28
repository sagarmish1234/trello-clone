import LOGO from "../../assets/images/logo.png";
import LOGO_BACKGROUND_IMAGE from "../../assets/images/login.jpg";
import "./login.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UserLogin } from "@/types";

const Login = () => {
  const [loginForm, setLoginForm] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const formChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const temp = { ...loginForm };
    const field = e.currentTarget.name as "email" | "password";
    temp[field] = e.currentTarget.value;
    setLoginForm({ ...temp });
  };
  return (
    <div className="login-container">
      <img src={LOGO_BACKGROUND_IMAGE} className="login-background" />
      <div className="login-form-container">
        <div className="login-form">
          <div className="login-form-header text-zinc-50">
            <img src={LOGO} alt="login-form-logo" className="login-form-logo" />
            <div className="login-form-title">Boardify</div>
          </div>
          <form className="login-form-body w-4/5 mx-auto mt-10">
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              required
              name="email"
              onChange={formChange}
              className="bg-transparent outline-none border w-full rounded-[0.3rem] h-[2.5rem] px-4 text-zinc-50 focus:border-2"
            />
            <input
              type="password"
              value={loginForm.password}
              name="password"
              required
              onChange={formChange}
              placeholder="Password"
              className="bg-transparent mt-4 outline-none border w-full rounded-[0.3rem] h-[2.5rem] px-4 text-zinc-50 focus:border-2"
            />
            <Button
              type="submit"
              className="w-full mt-4 h-[2.5rem] bg-[#3a0ca3] hover:bg-blue-800"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
