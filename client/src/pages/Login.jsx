import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localRequest } from "../utils/axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      let res = await localRequest.post(`/login`, {
        userName,
        password,
      });
      let { data } = res;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user);
      localStorage.setItem("UserId", data.UserId);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://source.unsplash.com/random")',
          opacity: 0.6,
        }}
      ></div>
      <div className="relative bg-white bg-opacity-80 shadow-lg rounded-lg p-8 max-w-md w-full backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          Welcome
        </h2>
        <form onSubmit={submitLogin}>
          <div className="mb-4">
            <label
              htmlFor="floating_userName"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="floating_userName"
              id="floating_userName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="floating_password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition duration-300 hover:scale-105"
          >
            Let's Go!
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
