import { useState } from "react";
import { Link } from "react-router-dom";
export default function Form(props) {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">
            {props.welcome} to your account
          </span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-indigo-400 rounded-t-md"></div>
            <div className="py-6 px-8">
              <input
                name="username"
                type="text"
                placeholder="Email"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between items-baseline">
                <button
                  className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg"
                  onClick={props.onClick}
                >
                  Login
                </button>
                <Link to={`/${props.location}`}>
                  <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg">
                    {props.redirect}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
