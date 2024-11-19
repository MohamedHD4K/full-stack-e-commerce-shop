import { useState } from "react";
import userApi from "../../../api/users";
import Input from "../Input";
import { toast, ToastContainer } from "react-toastify";
import LoginPage from "../LoginPage/LoginPage";
import auth from "../../../api/auth";

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
      const { data: newUser } = await userApi.postUser(data);
      toast.success("Success");
      console.log(newUser);
      auth.setToken(newUser.token);
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
    <div className=" d-flex flex-column justify-content-center align-items-center w-100 mt-5">
      <div
        className="rounded d-flex justify-content-center border p-5 main shadow"
        style={{ width: "400px", height: "600px", position: "relative" }}
      >
        <form
          onSubmit={handelSubmit}
          className="d-flex flex-column gap-4 w-100"
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
        </form>
        <LoginPage />
      </div>
    </div>
  );
}

export default RegisterPage;
