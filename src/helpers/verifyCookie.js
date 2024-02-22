import config from "@/config/config";
import jwt from "jsonwebtoken";

const verifyCookie = async (token) => {
  try {
    if (!token) {
      return false;
    }
    const isValid = jwt.verify(token, config.secretKey);
    if (isValid) {
      return true;
    }
    return false;
  } catch (error) {
    throw error.message;
  }
};

export default verifyCookie;
