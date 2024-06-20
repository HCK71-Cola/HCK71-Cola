import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { localRequest } from "../utils/axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitRegis = async (e) => {
    e.preventDefault();
    try {
      let res = await localRequest({
        url: "/register",
        method: "POST",
        data: {
          userName: userName,
          password: password,
        },
      });
      setUserName("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(Object.keys(error));
      console.log(error.response?.data?.message || error.stack);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://source.unsplash.com/random")',
          opacity: 0.6,
        }}
      ></div>
      <div className="relative bg-white bg-opacity-80 shadow-lg rounded-lg p-8 max-w-md w-full backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-5">
          | Create Account |
        </h2>
        <form onSubmit={submitRegis}>
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
          <Link to="/login" className="text-blue-600 hover:underline">
            Already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
