import { useState } from "react";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../services/common.js";
import { postRequest } from "../../common/apiRequest.js";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      avatar: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      return toast.error("Invalid Email Address");
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("fullName", formData.fullName);
    formDataToSubmit.append("email", formData.email);
    formDataToSubmit.append("password", formData.password);
    if (formData.avatar) {
      formDataToSubmit.append("avatar", formData.avatar);
    }

    try {
      const user = await postRequest("/users/register", formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (user?.data) {
        navigate("/login");
        toast.success("Signup successful");
      }
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
          <form onSubmit={handleSubmit}>
            <h4 className="text-2xl mb-7">Sign Up</h4>

            <input
              type="text"
              placeholder="Name"
              name="fullName"
              className="input-box"
              value={formData.fullName}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input-box"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordInput
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="file"
              className="hidden"
              id="customFileInput"
              name="avatar"
              onChange={handlePhotoChange}
            />
            <label
              htmlFor="customFileInput"
              className="block border border-grey-light w-full p-3 rounded mb-4 cursor-pointer"
            >
              Choose a file
            </label>

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-sm text-center mt-4">
              Already have an account?
              <Link to="/login" className="font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
