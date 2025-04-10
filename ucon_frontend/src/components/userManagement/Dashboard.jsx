import React from "react";
import NavBar from "../home/NavBar"; 

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <h1>I am Dashboard</h1>
      <p>This will show the list of users in a table from the database.</p>
    </div>
  );
};

export default Dashboard;
