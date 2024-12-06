import { useCallback, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import userApi from "../../../api/users";
import auth from "../../../api/auth";
import Input from "../Input";

function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handelChange = useCallback(({ target }) => {
    setData({ ...data, [target.name]: target.value });
  }, [data]);

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: token } = await userApi.postLogin(data);
      auth.setToken(token);
      window.location = "/";
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status < 500
      ) {
        toast.error(err.response.data);
        console.log(err);
      }
    }
  };

  return (
    <div className="login-container">
      <input type="checkbox" id="chk" style={{ display: "none" }} />

      <form
        onSubmit={handelLogin}
        className="d-flex flex-column gap-4 border px-5 login bg-light text-dark"
      >
        <label
          htmlFor="chk"
          className="fw-bold my-2 mb-4 text-center fs-1 login-title"
        >
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

        <input className="btn btn-success" type="submit" value="Login" />
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
