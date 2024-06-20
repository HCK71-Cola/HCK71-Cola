import axios from "axios";

export const localRequest = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://colaonta.zainalalmasyhur.online",
});
