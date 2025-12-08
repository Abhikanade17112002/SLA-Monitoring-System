import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "VIEWER",
  });

  const changeHandler = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/user/signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
                    bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl 
                      border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
                      p-8">

        <h2 className="text-3xl font-extrabold text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={submitHandler} className="space-y-5">

          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={changeHandler}
              className="input-primary"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={changeHandler}
              className="input-primary"
            />
          </div>

          <input
            type="text"
            name="userName"
            placeholder="Username"
            onChange={changeHandler}
            className="input-primary"
          />

          <input
            type="email"
            name="emailId"
            placeholder="Email Address"
            onChange={changeHandler}
            className="input-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
            className="input-primary"
          />

          <select
            name="role"
            onChange={changeHandler}
            className="input-primary bg-black/30"
          >
            <option value="VIEWER">Viewer</option>
            <option value="DEV">Developer</option>
            <option value="ADMIN">Admin</option>
          </select>

          {error && (
            <p className="text-red-400 text-center text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 rounded-xl 
                       shadow-[0_0_20px_rgba(59,130,246,0.7)]
                       hover:bg-blue-700 hover:shadow-blue-500/50 
                       transition-all transform hover:scale-[1.03]"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/user/signin")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
