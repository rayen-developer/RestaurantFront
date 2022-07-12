import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import httpClient from "../http/http-client";
import { useDispatch, useSelector } from "react-redux";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../actions/AuthAction";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    const emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      if(password.length<8){
        alert("Enter a password with 8 characters minimum")
        return false;
      }
      httpClient
        .post("/users/signup", { email, password })
        .then((response) => {
          dispatch(REGISTER_SUCCESS());
          alert("successfully registered");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          dispatch(REGISTER_FAIL());
          alert("user already registerd");
        });
    }
    else{
      alert("Please Enter a valid Email");
    }
  };

  return (
    <div className="App">
      <div className="min-h-screen bg-gray-100 text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl mx-auto text-center">
          <span className="text-2xl font-light">Register Here</span>
          <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
            <div className="h-2 bg-indigo-400 rounded-t-md"></div>
            <div className="py-6 px-8">
              <input
                type="text"
                placeholder="Email"
                name="email"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between items-baseline">
                <button
                  className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg"
                  onClick={submit}
                >
                  Register
                </button>
                <Link to={"/"}>
                  <button className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-lg">
                    Login
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
