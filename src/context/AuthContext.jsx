import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const getToken = () => {
    try {
      const token = localStorage.getItem("authToken");
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.warn("Invalid authToken in localStorage:", error);
      localStorage.removeItem("authToken");
      return null;
    }
  };

  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(getToken());

  useEffect(() => {
    if (authToken) fetchUserProfile();
  }, [authToken]);

  // 🔹 Fetch logged-in user profile
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        "https://django-final-assignment.vercel.app/api/v1/auth/users/me/",
        {
          headers: { Authorization: `JWT ${authToken?.access}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      console.log("Fetched User Profile:", data);
      setUser(data);
    } catch (error) {
      console.log("Error fetching user", error);
    }
  };

  // 🔹 Login User
  const loginUser = async (email, password) => {
    try {
      const response = await fetch(
        "https://django-final-assignment.vercel.app/api/v1/auth/jwt/create/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      console.log("Login Response:", data);

      localStorage.setItem("authToken", JSON.stringify(data));
      setAuthToken(data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  // 🔹 Register User
  const registerUser = async (formData) => {
    try {
      const response = await fetch(
        "https://django-final-assignment.vercel.app/api/v1/auth/users/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Register error:", errorData);
        throw new Error("Registration failed");
      }

      const data = await response.json();
      console.log("✅ Registration Successful:", data);

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, authToken, loginUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const getToken = () => {
//     try {
//       const token = localStorage.getItem("authToken");
//       return token ? JSON.parse(token) : null;
//     } catch (error) {
//       console.warn("Invalid authToken in localStorage:", error);
//       localStorage.removeItem("authToken");
//       return null;
//     }
//   };

//   const [user, setUser] = useState(null);
//   const [authToken, setAuthToken] = useState(getToken());

//   useEffect(() => {
//     if (authToken) fetchUserProfile();
//   }, [authToken]);

//   const fetchUserProfile = async () => {
//     try {
//       const response = await fetch(
//         "https://django-final-assignment.vercel.app/api/v1/auth/users/me/",
//         {
//           headers: { Authorization: `JWT ${authToken?.access}` },
//         }
//       );
//       const data = await response.json();
//       console.log("Fetched User Profile:", data);
//       setUser(data);
//     } catch (error) {
//       console.log("Error fetching user", error);
//     }
//   };

//   const loginUser = async (email, password) => {
//     try {
//       const response = await fetch(
//         "https://django-final-assignment.vercel.app/api/v1/auth/jwt/create/",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         }
//       );

//       if (!response.ok) throw new Error("Login failed");

//       const data = await response.json();
//       console.log("Login Response:", data);

//       localStorage.setItem("authToken", JSON.stringify(data));
//       setAuthToken(data);
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, authToken, loginUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
