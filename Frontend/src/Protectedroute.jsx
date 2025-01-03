import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Protectedroute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // Initialize with null to indicate loading
  const [userData, setUserData] = useState(null); // To store the user data

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("jwt");
      if (!token) {
        setIsAuth(false);
        return;
      }

      try {
        // Send a GET request to verify JWT token
        const res = await fetch("http://localhost:3001/", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        
        const data = await res.json();
     
        if (data.message != "Unauthorized") {
          setIsAuth(true);
          setUserData({username : data.username });  // Save the user data received from the backend
        } else {
            Cookies.remove("jwt")
            window.location.reload();
          setIsAuth(false);
        }
      } catch (error) {

        console.error("Error checking authentication:", error);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [Cookies]);

  // Show a loading indicator or nothing while authentication is being checked
  if (isAuth === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  // If authenticated, pass user data to the children component
  if (isAuth) {
    return children;
  }

  // If not authenticated, redirect to signin
  return <Navigate to="/signin" />;
}
