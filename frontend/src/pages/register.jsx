import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utilility";

function Register() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = "https://login-app-api-2.vercel.app/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      console.log(result);
      const { message, success, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/signup");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (e) {
      handleError(e);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="border shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] bg-[#fff] w-full max-w-[400px] p-[32px_40px] flex-col gap-4 rounded-xl">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4"> Register</h1>
          <div>
            <label htmlFor="name" className="text-lg">
              Name
            </label>
            <input
              onChange={handleChange}
              className="w-full  outline-none border-b-2 border-black mb-3 pb-1"
              type="text"
              autoFocus
              placeholder="Enter your name..."
              name="name"
              value={loginInfo.name}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter your email..."
              className="w-full  outline-none border-b-2 border-black mb-3 pb-1"
              name="email"
              value={loginInfo.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              className="w-full  outline-none border-b-2 border-black mb-3 pb-1"
              type="text"
              placeholder="Enter your password..."
              name="password"
              value={loginInfo.password}
            />
          </div>
          <button className="w-full bg-purple-950 text-white rounded-lg h-8 text-center mt-2 mb-2">
            Signup
          </button>
          <span>
            Already have an account?{" "}
            <Link className="text-purple-950 font-bold" to="/signup">
              Login
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Register;
