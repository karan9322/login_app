import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "./utilility";

function Signup() {
  const navigate = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting login info:", loginInfo);

      const response = await fetch("https://login-app-api-gilt.vercel.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      console.log("Server response:", result);

      const { message, success, error, token, name } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details =
          error?.details?.[0]?.message || "An unknown error occurred.";
        handleError(details);
      } else {
        handleError(message);
      }
    } catch (e) {
      console.error("Signup error:", e);
      handleError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="border shadow-[8px_8px_24px_0px_rgba(66,68,90,1)] bg-[#fff] w-full max-w-[400px] p-[32px_40px] flex-col gap-4 rounded-xl">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Login</h1>

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
            Login
          </button>
          <span>
            Do not have an account?{" "}
            <Link className="text-purple-950 font-bold" to="/register">
              Register
            </Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
