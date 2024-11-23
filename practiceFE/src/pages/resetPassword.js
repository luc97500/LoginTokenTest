import React, { useState } from "react";

import { Form, Link, Navigate, useNavigate } from "react-router-dom";
import signUp from "../assets/signup.png";
import {
  Button,
  TextField,
  Checkbox,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Swal from "sweetalert2";

import resetpassword from "../assets/reset-password.png";

function ResetPassword() {
  const navigate = useNavigate();
  const [formField, setFormField] = useState({
    email: "",
    newPassword: "",
    password1: "",
  });

  const apiCall = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/auth";

      if (formField.email === "") {
        return toast.error("Please Enter Email");
      } else if (formField.newPassword === "") {
        return toast.error("Please Enter New-Password");
      } else if (formField.newPassword.length < 4) {
        return toast.error(" New-Password should have 4 digits");
      }  else if (formField.password1.length < 4) {
        return toast.error(" Re-Enter should have 4 digits");
      } 
      else if(formField.newPassword.toString().toLowerCase() !== formField.password1.toString().toLowerCase() ){
        return toast.error(" New-Password not Match Please enter Similar Password !");
      }
      else {
        let response = await axios.post(
          `${url}/resetpass`,
          {
            email: formField.email,
            newPassword: formField.newPassword,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            title: response.data.message,
            text: "Please Login Again with New Password!",
            icon: "success",
          });
          navigate("/login");
        }
      }
    } catch (error) {
      console.log(error);
      if (error.status === 403) {
        Swal.fire({
          title: error.response.data.message,
          text: "Please Try Again",
          icon: "error",
        });
      }
      if (error.status === 400) {
        Swal.fire({
          title: error.response.data.error.details[0].message,
          text: "Please Try Again",
          icon: "error",
        });
      }
    }
  };

  const onChangeInput = (e) => {
    setFormField((formField) => ({
      ...formField,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <ToastContainer
        style={{ justifyContent: "center", display: "flex", top: "20px" }}
      />
      <section class="bg-gray-100 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0">
          <img class="w-10 h-10 mr-2" src={resetpassword} alt="reasetLogo" />
          <div class="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Reset Password
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={apiCall}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formField.email}
                    onChange={onChangeInput}
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="exist@mail.com"
                    // required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New-Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={formField.newPassword}
                    onChange={onChangeInput}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // required
                  />
                </div>

                <div>
                  <label
                    for="password1"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Re-Enter New-Password
                  </label>
                  <input
                    type="password"
                    name="password1"
                    id="password1"
                    value={formField.password1}
                    onChange={onChangeInput}
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    // required
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-start"></div>
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Reset Password
                </button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t Want to Change Password ?{" "}
                  <Link
                    to="/login"
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;
