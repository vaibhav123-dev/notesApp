import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateEmail } from "../../services/common";
import { postRequest } from "../../common/apiRequest";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData?.email === "" || formData?.password === "") {
      return toast.warning("Please fill in the required fields");
    }
    if (formData?.email && !validateEmail(formData?.email)) {
      return toast.error("Invalid Email Address");
    }

    const user = await postRequest("/users/login", formData);

    if (user?.error) {
      return toast.error(user?.error);
    } else {
      toast.success("Login successful");
      dispatch(setUser(user?.data?.user));
      localStorage.setItem("accessToken", user?.data?.accessToken);
      navigate("/dashboard");
    }

    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input-box"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordInput value={formData.password} onChange={handleChange} />

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?
              <Link
                to="/register"
                className="font-medium text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
