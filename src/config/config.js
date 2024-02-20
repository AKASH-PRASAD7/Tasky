const config = {
  mongoUri: String(process.env.REACT_MONGODB_URI),
  baseURl: String(process.env.REACT_BASE_URL),
  secretKey: String(process.env.REACT_APP_SECRET_KEY),
};

export default config;
