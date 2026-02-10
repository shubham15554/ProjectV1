import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const res = await axios.get("http://localhost:8000/user/checkAuth", {
            withCredentials: true, // important to send cookies
          });

          if (res.data.authenticated) {
            setAuthenticated(true);
          } else {
            navigate("/auth"); // redirect if not authenticated
          }
        } catch (err) {
          console.log(err);
          navigate("/auth"); // redirect on error
        } finally {
          setLoading(false);
        }
      };

      checkAuth();
    }, [navigate]);

    if (loading) return <p className="text-white">Checking authentication...</p>;

    if (!authenticated) return null; // redirect happens automatically

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
