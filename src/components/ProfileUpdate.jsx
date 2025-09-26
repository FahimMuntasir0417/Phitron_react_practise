import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProfileUpdate = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [notification, setNotification] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
    watch: watchPassword,
  } = useForm();

  const profileImage = watch("profile_image");
  const newPassword = watchPassword("new_password");
  const allFields = watch();

  // Helper: get access token
  const getAccessToken = () => {
    try {
      const token = JSON.parse(localStorage.getItem("authToken"));
      return token?.access || null;
    } catch (e) {
      return null;
    }
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle image preview
  useEffect(() => {
    if (profileImage && profileImage.length > 0) {
      const file = profileImage[0];
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("Image size should be less than 5MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  }, [profileImage]);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://django-final-assignment.vercel.app/api/v1/profile/",
          {
            headers: {
              Authorization: `JWT ${getAccessToken()}`,
            },
          }
        );
        setUser(res.data);
        reset({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone_number: res.data.phone_number,
        });
      } catch (err) {
        console.error("❌ Fetch Error:", err.response?.data || err.message);
        showNotification("Failed to load profile", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  // Update user profile
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("phone_number", data.phone_number);

    if (data.profile_image && data.profile_image.length > 0) {
      formData.append("profile_image", data.profile_image[0]);
    }

    try {
      setIsUpdating(true);
      const res = await axios.put(
        "https://django-final-assignment.vercel.app/api/v1/profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `JWT ${getAccessToken()}`,
          },
        }
      );
      setUser(res.data);
      setPreviewImage(null);
      showNotification("✅ Profile updated successfully!", "success");
    } catch (err) {
      console.error("❌ Update Error:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message || "Error updating profile";
      showNotification(errorMessage, "error");
    } finally {
      setIsUpdating(false);
    }
  };

  // Change password
  const onPasswordChange = async (data) => {
    try {
      setIsChangingPassword(true);
      await axios.post(
        "https://django-final-assignment.vercel.app/api/v1/auth/users/set_password/",
        {
          new_password: data.new_password,
          re_new_password: data.re_new_password,
          current_password: data.current_password,
        },
        {
          headers: {
            Authorization: `JWT ${getAccessToken()}`,
          },
        }
      );
      showNotification("✅ Password changed successfully!", "success");
      resetPassword();
    } catch (err) {
      console.error(
        "❌ Password Change Error:",
        err.response?.data || err.message
      );
      const errorMessage =
        err.response?.data?.current_password?.[0] ||
        err.response?.data?.new_password?.[0] ||
        "Error changing password";
      showNotification(errorMessage, "error");
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "warning"
              ? "bg-yellow-500"
              : "bg-red-500"
          } text-white max-w-sm`}
        >
          <div className="flex items-center">
            <span className="flex-1">{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600">
            Manage your profile and security settings
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`flex-1 py-4 px-6 text-center font-medium text-lg transition-colors duration-200 ${
                  activeTab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                {/* Profile Image Section */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 overflow-hidden border-4 border-white shadow-lg">
                      <img
                        src={
                          previewImage ||
                          user.profile_image_url ||
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24'%3E%3Cpath fill='%239ca3af' d='M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z'/%3E%3C/svg%3E"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {previewImage && (
                      <button
                        onClick={() => {
                          setPreviewImage(null);
                          // Clear file input
                          const fileInput =
                            document.querySelector('input[type="file"]');
                          if (fileInput) fileInput.value = "";
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register("first_name", {
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                      {errors.first_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register("last_name", {
                          required: "Last name is required",
                          minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters",
                          },
                        })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                      {errors.last_name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone_number", {
                        pattern: {
                          value: /^[+]?[\d\s-()]+$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your phone number"
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Image
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 text-gray-400 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-400">
                            PNG, JPG, JPEG (Max. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          {...register("profile_image")}
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isUpdating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Updating...
                      </>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === "password" && (
              <div className="max-w-md mx-auto">
                <form
                  onSubmit={handlePasswordSubmit(onPasswordChange)}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password *
                    </label>
                    <input
                      type="password"
                      {...registerPassword("current_password", {
                        required: "Current password is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter current password"
                    />
                    {passwordErrors.current_password && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.current_password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password *
                    </label>
                    <input
                      type="password"
                      {...registerPassword("new_password", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters",
                        },
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter new password"
                    />
                    {passwordErrors.new_password && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.new_password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password *
                    </label>
                    <input
                      type="password"
                      {...registerPassword("re_new_password", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === newPassword || "Passwords do not match",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Confirm new password"
                    />
                    {passwordErrors.re_new_password && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.re_new_password.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-medium py-3 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:ring-4 focus:ring-green-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isChangingPassword ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Changing Password...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;

// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";

// const ProfileUpdate = () => {
//   const [user, setUser] = useState(null);
//   const { register, handleSubmit, reset } = useForm();
//   const {
//     register: registerPassword,
//     handleSubmit: handlePasswordSubmit,
//     reset: resetPassword,
//   } = useForm();

//   // helper: get access token
//   const getAccessToken = () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("authToken"));
//       return token?.access || null;
//     } catch (e) {
//       return null;
//     }
//   };

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get(
//           "https://django-final-assignment.vercel.app/api/v1/profile/",
//           {
//             headers: {
//               Authorization: `JWT ${getAccessToken()}`,
//             },
//           }
//         );
//         setUser(res.data);
//         reset({
//           first_name: res.data.first_name,
//           last_name: res.data.last_name,
//           phone_number: res.data.phone_number,
//         });
//       } catch (err) {
//         console.error("❌ Fetch Error:", err.response?.data || err.message);
//       }
//     };
//     fetchProfile();
//   }, [reset]);

//   // Update user profile
//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("first_name", data.first_name);
//     formData.append("last_name", data.last_name);
//     formData.append("phone_number", data.phone_number);

//     if (data.profile_image && data.profile_image.length > 0) {
//       formData.append("profile_image", data.profile_image[0]);
//     }

//     try {
//       const res = await axios.put(
//         "https://django-final-assignment.vercel.app/api/v1/profile/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `JWT ${getAccessToken()}`,
//           },
//         }
//       );
//       setUser(res.data);
//       alert("✅ Profile updated successfully!");
//     } catch (err) {
//       console.error("❌ Update Error:", err.response?.data || err.message);
//       alert("Error updating profile");
//     }
//   };

//   // Change password
//   const onPasswordChange = async (data) => {
//     try {
//       await axios.post(
//         "https://django-final-assignment.vercel.app/api/v1/auth/users/set_password/",
//         {
//           new_password: data.new_password,
//           re_new_password: data.re_new_password,
//           current_password: data.current_password,
//         },
//         {
//           headers: {
//             Authorization: `JWT ${getAccessToken()}`,
//           },
//         }
//       );
//       alert("✅ Password changed successfully!");
//       resetPassword();
//     } catch (err) {
//       console.error(
//         "❌ Password Change Error:",
//         err.response?.data || err.message
//       );
//       alert("Error changing password");
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div>
//       <h2>Update Profile</h2>
//       <img
//         src={user.profile_image_url}
//         alt="Profile"
//         style={{ width: "150px", borderRadius: "50%" }}
//       />
//       <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
//         <div>
//           <label>First Name:</label>
//           <input type="text" {...register("first_name")} required />
//         </div>
//         <div>
//           <label>Last Name:</label>
//           <input type="text" {...register("last_name")} required />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" {...register("phone_number")} />
//         </div>
//         <div>
//           <label>Profile Image:</label>
//           <input type="file" {...register("profile_image")} accept="image/*" />
//         </div>
//         <button type="submit">Update Profile</button>
//       </form>

//       <hr />
//       <h2>Change Password</h2>
//       <form onSubmit={handlePasswordSubmit(onPasswordChange)}>
//         <div>
//           <label>Current Password:</label>
//           <input
//             type="password"
//             {...registerPassword("current_password", { required: true })}
//           />
//         </div>
//         <div>
//           <label>New Password:</label>
//           <input
//             type="password"
//             {...registerPassword("new_password", { required: true })}
//           />
//         </div>
//         <div>
//           <label>Confirm New Password:</label>
//           <input
//             type="password"
//             {...registerPassword("re_new_password", { required: true })}
//           />
//         </div>
//         <button type="submit">Change Password</button>
//       </form>
//     </div>
//   );
// };

// export default ProfileUpdate;

// // src/components/ProfileUpdate.jsx
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   UserIcon,
//   PhotoIcon,
//   CheckBadgeIcon,
//   ArrowPathIcon,
// } from "@heroicons/react/24/outline";

// const ProfileUpdate = () => {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const { register, handleSubmit, reset, watch } = useForm();

//   const profileImage = watch("profile_image");

//   // Helper: get access token
//   const getAccessToken = () => {
//     try {
//       const token = JSON.parse(localStorage.getItem("authToken"));
//       return token?.access || null;
//     } catch (e) {
//       return null;
//     }
//   };

//   // Handle image preview
//   useEffect(() => {
//     if (profileImage && profileImage.length > 0) {
//       const file = profileImage[0];
//       const reader = new FileReader();
//       reader.onload = (e) => setPreviewImage(e.target.result);
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImage(null);
//     }
//   }, [profileImage]);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setIsLoading(true);
//         const res = await axios.get(
//           "https://django-final-assignment.vercel.app/api/v1/profile/",
//           {
//             headers: {
//               Authorization: `JWT ${getAccessToken()}`,
//             },
//           }
//         );
//         setUser(res.data);
//         reset({
//           first_name: res.data.first_name,
//           last_name: res.data.last_name,
//           phone_number: res.data.phone_number,
//         });
//       } catch (err) {
//         console.error("❌ Fetch Error:", err.response?.data || err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProfile();
//   }, [reset]);

//   // Update user profile
//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("first_name", data.first_name);
//     formData.append("last_name", data.last_name);
//     formData.append("phone_number", data.phone_number);

//     if (data.profile_image && data.profile_image.length > 0) {
//       formData.append("profile_image", data.profile_image[0]);
//     }

//     try {
//       setIsUpdating(true);
//       const res = await axios.put(
//         "https://django-final-assignment.vercel.app/api/v1/profile/",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `JWT ${getAccessToken()}`,
//           },
//         }
//       );
//       setUser(res.data);
//       setPreviewImage(null);

//       // Show success message
//       const event = new CustomEvent("showNotification", {
//         detail: { message: "Profile updated successfully!", type: "success" },
//       });
//       window.dispatchEvent(event);
//     } catch (err) {
//       console.error("❌ Update Error:", err.response?.data || err.message);
//       const event = new CustomEvent("showNotification", {
//         detail: { message: "Error updating profile", type: "error" },
//       });
//       window.dispatchEvent(event);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
//         <div className="text-center">
//           <ArrowPathIcon className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
//           <p className="text-gray-600 text-lg">Loading your profile...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
//             <UserIcon className="w-8 h-8 text-indigo-600" />
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Update Profile
//           </h1>
//           <p className="text-gray-600">Manage your personal information</p>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           <div className="p-6 sm:p-8">
//             {/* Profile Image Section */}
//             <div className="text-center mb-8">
//               <div className="relative inline-block">
//                 <div className="w-32 h-32 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 overflow-hidden border-4 border-white shadow-lg">
//                   <img
//                     src={
//                       previewImage ||
//                       user.profile_image_url ||
//                       "/default-avatar.png"
//                     }
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.src =
//                         "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24'%3E%3Cpath fill='%239ca3af' d='M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z'/%3E%3C/svg%3E";
//                     }}
//                   />
//                 </div>
//                 <div className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 shadow-lg">
//                   <PhotoIcon className="w-5 h-5 text-white" />
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {/* First Name */}
//                 <div>
//                   <label
//                     htmlFor="first_name"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     First Name
//                   </label>
//                   <input
//                     type="text"
//                     id="first_name"
//                     {...register("first_name")}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter your first name"
//                   />
//                 </div>

//                 {/* Last Name */}
//                 <div>
//                   <label
//                     htmlFor="last_name"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Last Name
//                   </label>
//                   <input
//                     type="text"
//                     id="last_name"
//                     {...register("last_name")}
//                     required
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                     placeholder="Enter your last name"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div>
//                 <label
//                   htmlFor="phone_number"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone_number"
//                   {...register("phone_number")}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
//                   placeholder="Enter your phone number"
//                 />
//               </div>

//               {/* Profile Image Upload */}
//               <div>
//                 <label
//                   htmlFor="profile_image"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Profile Image
//                 </label>
//                 <div className="flex items-center justify-center w-full">
//                   <label
//                     htmlFor="profile_image"
//                     className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
//                   >
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <PhotoIcon className="w-8 h-8 text-gray-400 mb-2" />
//                       <p className="text-sm text-gray-500">
//                         <span className="font-semibold">Click to upload</span>{" "}
//                         or drag and drop
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         PNG, JPG, JPEG (Max. 5MB)
//                       </p>
//                     </div>
//                     <input
//                       id="profile_image"
//                       type="file"
//                       {...register("profile_image")}
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </label>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   disabled={isUpdating}
//                   className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//                 >
//                   {isUpdating ? (
//                     <>
//                       <ArrowPathIcon className="w-5 h-5 animate-spin mr-2" />
//                       Updating...
//                     </>
//                   ) : (
//                     <>
//                       <CheckBadgeIcon className="w-5 h-5 mr-2" />
//                       Update Profile
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileUpdate;
