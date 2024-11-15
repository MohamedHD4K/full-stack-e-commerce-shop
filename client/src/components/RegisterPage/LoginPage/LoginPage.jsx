import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import userApi from "../../../../api/http";
import auth from "../../../../api/auth";
import Input from "../Input/Input";

function LoginPage() {
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
      const { data: user } = await userApi.postLogin(data);
      toast.success("Welcome" + user.username);
      auth.setToken(user.token)
      window.location = '/'
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
    <div className="login-container">
      <input type="checkbox" id="chk" style={{ display: "none" }} />

      <form
        onSubmit={handelSubmit}
        className="d-flex flex-column gap-4 border px-5 login bg-light text-dark"
        method="POST"
        action="/"
      >
        <label htmlFor="chk" className="fw-bold my-2 mb-4 text-center fs-1 login-title">
          Login
        </label>
        <Input
          type="text"
          value={data.username}
          handelChange={handelChange}
          id="username"
          title="Username"
        />

        <Input
          type="password"
          value={data.password}
          handelChange={handelChange}
          id="password"
          title="Password"
        />

        <input className="btn btn-success" type="submit" value="Login"/>
      </form>
        <ToastContainer />
    </div>
  );
}

export default LoginPage;
