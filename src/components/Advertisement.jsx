import axios from "axios";
import { useEffect } from "react";

const Advertisement = () => {
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/v1/reviews/") // ✅ https:// দিতে হবে
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching advertisements:", error);
      });
  }, []);

  return <div>Check console for advertisements</div>;
};

export default Advertisement;
