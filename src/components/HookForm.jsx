import { useForm } from "react-hook-form";
import "./HookForm.css"; // Import the CSS file

const HookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <form className="hook-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="form-title">Contact Form</h2>

        {/* Name Field */}
        <div className="form-group">
          <input
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className={`form-input ${errors.name ? "error" : ""}`}
          />
          {errors.name && <p className="error-message">Name is required</p>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Invalid email",
              },
            })}
            placeholder="Enter your email"
            className={`form-input ${errors.email ? "error" : ""}`}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default HookForm;
