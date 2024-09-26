import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(users);
  return (
    <div className="App">
      <div className="users">
        {users.map(user => (
          <div>
            <p>{user.name}</p>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
