import { useState } from "react";
import { postUser } from "../api/http";
import "./App.css";

function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handelChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    postUser({
      "username" : data.username,
      "password" : data.password
    })
  };

  return (
    <>
      <form onSubmit={handelSubmit} method="POST" action="/user">
        <label htmlFor="username">User Name: </label>
        <input
          id="username"
          name="username"
          value={data.username}
          onChange={handelChange}
        />
          
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          value={data.password}
          onChange={handelChange}
        />
        <input type="submit" />
      </form>
    </>
  );
}

export default App;
