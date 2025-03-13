import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "./api";

api.get("/api/hello")
  .then(response => console.log(response.data))
  .catch(error => console.error(error));


function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/hello") // No need to specify localhost:5000 if using a proxy
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("There was an error fetching data!", error);
      });
  }, []);

  return (
    <div>
      <h1>Flask & React Integration</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
