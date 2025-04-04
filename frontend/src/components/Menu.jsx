import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user, setUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(URL + "/api/auth/logout", { withCredentials: true });
      setUser(null); 
      localStorage.removeItem('user')
      
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-800 w-48 z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4 shadow-lg">
      {!user && (
        <>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/login">Login</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/register">Register</Link>
          </h3>
        </>
      )}
      {user && (
        <>
        
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to="/write">Write</Link>
          </h3>
          <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
            <Link to={`/myblogs/${user._id}`}>My Blogs</Link>
          </h3>
          <h3 onClick={handleLogout} className="text-white text-sm hover:text-gray-500 cursor-pointer">
            Logout
          </h3>
        </>
      )}
    </div>
  );
};

export default Menu;
