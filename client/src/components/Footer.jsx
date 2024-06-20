import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`bg-white rounded-lg shadow ${
        theme === "light" ? "dark:bg-gray-900" : "dark:bg-gray-700"
      } m-4`}
    >
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2024{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          Cola™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
