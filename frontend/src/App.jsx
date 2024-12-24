import Sidebar from "./components/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Signup from "./pages/signup";
import { useState } from "react";
import RefreshHandler from "./pages/RefreshHandler";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signup" />;
  };

  return (
    <>
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <div className="w-full bg-slate-300">
          <Routes>
            <Route path="/" element={<Navigate to="/register" />} />
            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
