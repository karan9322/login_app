import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "./utilility";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    handleSuccess("user logged out...");
    setTimeout(() => {
      navigate("/signup");
    }, 1000);
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3500/auth/product";
      const header = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, header);
      const result = await response.json();
      setProductList(result.message);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col text-center w-full h-screen justify-center   items-center ">
      <div className=" w-full">
        <h1 className="text-3xl"> Welcome {loggedInUser}</h1>
      </div>
      <br />
      <div className="w-full">
        <button
          className=" bg-purple-950 text-white rounded-lg p-2 text-center mt-2 mb-2"
          onClick={handleLogout}
        >
          Log out
        </button>
        <div className="text-center w-full ">
          {productList &&
            productList.map((item, index) => {
              return (
                <ul key={index}>
                  <span>{item.name}</span>
                  {" : "}
                  <span>{item.price}</span>
                </ul>
              );
            })}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
