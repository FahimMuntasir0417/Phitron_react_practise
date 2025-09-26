import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { registerUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);
      console.log("🎉 Registration Success:", response);
      alert("Registration successful! Please login.");
      // 👉 You can navigate to login page here (if using react-router-dom)
    } catch (error) {
      alert("Registration failed. Check console for details.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* First Name */}
        <div>
          <label className="block mb-1">First Name</label>
          <input
            type="text"
            {...register("first_name", { required: "First name is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            type="text"
            {...register("last_name", { required: "Last name is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm">{errors.last_name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Re-enter Password */}
        <div>
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            {...register("re_password", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.re_password && (
            <p className="text-red-500 text-sm">{errors.re_password.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
