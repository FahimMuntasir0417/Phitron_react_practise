import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Activation = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("⏳ Activating your account...");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post(
          "https://django-final-assignment.vercel.app/api/v1/auth/users/activation/",
          {
            uid,
            token,
          }
        );
        setStatus("✅ Account activated successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        console.error(
          "Activation error:",
          error.response?.data || error.message
        );
        setStatus("❌ Activation failed. Link may be invalid or expired.");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Account Activation</h2>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default Activation;
