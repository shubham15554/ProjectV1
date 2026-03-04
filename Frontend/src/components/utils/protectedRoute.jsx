import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  let Navigate = useNavigate();
  // Jab tak backend se user check ho raha hai, tab tak kuch mat dikhao (ya spinner dikhao)
  // if (loading) {
  //   return <div className="h-screen flex items-center justify-center text-white">Loading...</div>;
  // }

  // Agar user logged in nahi hai, toh signin page par redirect karo
  // state={{ from: location }} se hum yaad rakhte hain ki user kahan jana chahta tha
  if (!user) {
    Navigate('/signup');
  }

  return children;
};

export default ProtectedRoute;