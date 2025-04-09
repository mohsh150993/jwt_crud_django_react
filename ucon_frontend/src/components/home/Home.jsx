import React, { useContext } from "react";
import NavBar from "./NavBar"; 
import { AuthContext } from "../../context/AuthContext"; // Adjust the path as necessary

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <NavBar />

      <h1>I am at Home</h1>

      {isAuthenticated ? (
        <p>Welcome, you're logged in!</p>
      ) : (
        <p>Please log in or register to access more features.</p>
      )}
    </div>
  );
};

export default Home;
