import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const handleSuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    delay: 1000
  });
};

const handleError = (msg) => {
  toast.error(msg, {
    position: "top-right",
    delay: 1000
  });
};

export { handleError, handleSuccess };
