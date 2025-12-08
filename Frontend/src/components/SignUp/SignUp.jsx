import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "User",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          User Sign Up 
        </h2>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-blue-500"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-3 rounded focus:outline-blue-500"
          />
        </div>


        {/* Email */}
        <input
          type="email"
          name="emailId"
          placeholder="Email Address"
          onChange={handleChange}
          className="w-full border p-3 rounded mt-4 focus:outline-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border p-3 rounded mt-4 focus:outline-blue-500"
        />

        {/* Role Dropdown */}
        <select
          name="role"
          onChange={handleChange}
          className="w-full border p-3 rounded mt-4 bg-white focus:outline-blue-500"
        >
          <option value="Dev">Developer</option>
          <option value="User">User</option>
        </select>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm my-2 text-center">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded mt-5 hover:bg-blue-700 transition-colors"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/user/signin")}
          >
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
