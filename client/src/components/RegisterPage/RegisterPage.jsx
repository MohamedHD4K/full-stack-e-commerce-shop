import { useState } from "react";
import userApi from "../../../api/http";
import Input from "./Input/Input";
import { toast, ToastContainer } from "react-toastify";
import LoginPage from "./LoginPage/LoginPage";

function RegisterPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handelChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: user } = await userApi.postUser(data);
      toast.success("Success");
      console.log(user);
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      ) {
        toast.error(err.response.data);
      }
    }
  };

  return (
    <div
      style={{ height: "100vh" }}
      className=" d-flex flex-column justify-content-center align-items-center w-100"
    >
      <form
        onSubmit={handelSubmit}
        className="m-2 rounded d-flex flex-column gap-4 border p-5 main shadow"
        method="POST"
        action="/user"
        style={{ width: "400px", height: "600px", position: "relative" }}
      >
        <h1 className="fw-bold text-center my-5">Sing up</h1>

        <Input
          type="text"
          value={data.username}
          handelChange={handelChange}
          id="username"
          title="Username"
        />

        <Input
          type="email"
          value={data.email}
          handelChange={handelChange}
          id="email"
          title="Email"
        />

        <Input
          type="password"
          value={data.password}
          handelChange={handelChange}
          id="password"
          title="Password"
        />

        <input
          className="btn btn-success shadow"
          type="submit"
          value="Singup"
        />
        <ToastContainer />
        <LoginPage />
      </form>
    </div>
  );
}

export default RegisterPage;
