import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000', // Your Laravel backend URL
  withCredentials: true,           // Required for Sanctum session cookies
  withXSRFToken: true,
});