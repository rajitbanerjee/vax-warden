const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST || "localhost";
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT || 8080;

export const BASE_URL = `https://${BACKEND_HOST}:${BACKEND_PORT}`;
