// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Loader from "../Loader/Loader";
// import { handleSignUpUser } from "../../store/slices/AuthSlice/AuthSlice";

// const SignUp = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state) => state.auth);

//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     emailId: "",
//     password: "",
//     role: "",
//   });

//   const changeHandler = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });


//     console.log("Field changed:", e.target.name, "=", e.target.value); // 🔥 debug
    




//   }

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     console.log("Sign Up Form ==> ");
//     console.log(form);

//     const response = await dispatch(handleSignUpUser(form)) ;

//     console.log("Response  ==> ");
//     console.log(response);
    
    

//     if (response.type === "auth/signUpUser/fulfilled") {
//       navigate("/user/signin");
//     }
//     else{
//       alert( response )
//     }
//   };

//   return (
//     <>

//       {
//         isLoading ? < Loader ></Loader>: <div className="min-h-screen flex items-center justify-center px-4 
//                     bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">

//           <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl 
//                       border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
//                       p-8">

//             <h2 className="text-3xl font-extrabold text-center mb-6">
//               Create Your Account
//             </h2>

//             <form onSubmit={submitHandler} className="space-y-5">

//               <div className="grid grid-cols-2 gap-3">
//                 <input
//                   type="text"
//                   name="firstName"
//                   placeholder="First Name"
//                   onChange={changeHandler}
//                   className="input-primary"
//                 />

//                 <input
//                   type="text"
//                   name="lastName"
//                   placeholder="Last Name"
//                   onChange={changeHandler}
//                   className="input-primary"
//                 />
//               </div>


//               <input
//                 type="email"
//                 name="emailId"
//                 placeholder="Email Address"
//                 onChange={changeHandler}
//                 className="input-primary"
//               />

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 onChange={changeHandler}
//                 className="input-primary"
//               />

//               <select
//                 name="role"
//                 onChange={changeHandler}
//                 className="input-primary bg-black/30 text-black "
//               >
//                 <option value="USER"   className="text-black font-semibold">User</option>
//                 <option value="DEVELOPER" className="text-black font-semibold" >Developer</option>

//               </select>

//               {error && (
//                 <p className="text-red-400 text-center text-sm">{error}</p>
//               )}

//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3 bg-blue-600 rounded-xl 
//                        shadow-[0_0_20px_rgba(59,130,246,0.7)]
//                        hover:bg-blue-700 hover:shadow-blue-500/50 
//                        transition-all transform hover:scale-[1.03]"
//               >
//                 {isLoading ? "Creating Account..." : "Sign Up"}
//               </button>

//               <p className="text-center text-sm text-gray-400">
//                 Already have an account?{" "}
//                 <span
//                   onClick={() => navigate("/user/signin")}
//                   className="text-blue-400 cursor-pointer hover:underline"
//                 >
//                   Sign In
//                 </span>
//               </p>
//             </form>
//           </div>
//         </div>
//       }

//     </>

//   );
// };

// export default SignUp;



import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { handleSignUpUser } from "../../store/slices/AuthSlice/AuthSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "", // default empty, but controlled
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log("Field changed:", name, "=", value);
    console.log("Updated Form:", { ...form, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log("Submitting Form:", form);

    const response = await dispatch(handleSignUpUser(form));

    console.log("Signup Response:", response);

    if (response.type === "auth/signUpUser/fulfilled") {
      navigate("/user/signin");
    } else {
      alert("Registration failed. Please try again!");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4 
            bg-gradient-to-b from-black via-[#0b0f1a] to-black text-white">

          <div
            className="w-full max-w-md bg-white/5 backdrop-blur-2xl 
                border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]
                p-8"
          >
            <h2 className="text-3xl font-extrabold text-center mb-6">
              Create Your Account
            </h2>

            <form onSubmit={submitHandler} className="space-y-5">
              
              {/* FIRST + LAST NAME */}
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

              {/* EMAIL */}
              <input
                type="email"
                name="emailId"
                placeholder="Email Address"
                onChange={changeHandler}
                className="input-primary"
              />

              {/* PASSWORD */}
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={changeHandler}
                className="input-primary"
              />

              {/* ROLE DROPDOWN — FIXED */}
              <select
                name="role"
                value={form.role} // 🌟 Controlled input FIX
                onChange={changeHandler}
                className="input-primary bg-black/30 text-black"
              >
                <option value="">Select Role</option>
                <option value="USER" className="text-black font-semibold">
                  User
                </option>
                <option
                  value="DEVELOPER"
                  className="text-black font-semibold"
                >
                  Developer
                </option>
              </select>

              {/* ERROR MESSAGE */}
              {error && (
                <p className="text-red-400 text-center text-sm">{error}</p>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-blue-600 rounded-xl 
                  shadow-[0_0_20px_rgba(59,130,246,0.7)]
                  hover:bg-blue-700 hover:shadow-blue-500/50 
                  transition-all transform hover:scale-[1.03]"
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>

              {/* SWITCH PAGE */}
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
      )}
    </>
  );
};

export default SignUp;
