import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { darkLogo } from "../assets/index";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ThreeDots } from  'react-loader-spinner'
import {motion} from 'framer-motion'
const Registration = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userName, setUserame] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");

  // Error messages
  const [erruserName, seterrUserame] = useState("");
  const [erremail, seterrEmail] = useState("");
  const [errpassword, seterrPassword] = useState("");
  const [errconPassword, seterrConPassword] = useState("");
  const [firebaseError, setfirebaseError] = useState("");

  // Loding State
  const [loading, setLoading] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");

  //Handl""t;ions
  const handleName = (e) => {
    setUserame(e.target.value);
    seterrUserame("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    seterrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    seterrPassword("");
  };
  const handleConPassword = (e) => {
    setConPassword(e.target.value);
    seterrConPassword("");
  };
  //Email validation
  const validationEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
  };

  //Submit
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!userName) {
      seterrUserame("Please enter your name");
    }
    if (!email) {
      seterrEmail("Please enter your email address");
      setfirebaseError("");
    } else if (!validationEmail(email)) {
      seterrEmail("Enter a valid email");
    }
    if (!password) {
      seterrPassword("Please enter your password");
    } else if (password.length < 6) {
      seterrPassword("Password must be at least 6 characters");
    }
    if (!conPassword) {
      seterrConPassword("Confirm Password");
    } else if (conPassword !== password) {
      seterrConPassword("Password not matched");
    }

    // Print all stuff and log them
    if (
      userName &&
      email &&
      validationEmail(email) &&
      password &&
      password.length >= 6 &&
      conPassword &&
      conPassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: "",
          });
          // Signed in
          const user = userCredential.user;
          setLoading(false);
          setsuccessMsg("Account Created Successfully ! ");
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes("auth/email-already-in-use")) {
            setfirebaseError("You already have an account ! Try another one");
          }
          // ..
        });
      setUserame("");
      setEmail("");
      setPassword("");
      setConPassword("");
      seterrConPassword("");
      setfirebaseError("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10 ">
        <form className="w-[350px] mx-auto flex flex-col items-center ">
          <Link to="/">
            <img className="w-32 my-3 " src={darkLogo} alt="logo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6 rounded-md">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Create Account
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Your Name</p>
                <input
                  onChange={handleName}
                  value={userName}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="text"
                />
                {erruserName && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {erruserName}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {erremail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {erremail}
                  </p>
                )}
                {firebaseError && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {firebaseError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errpassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errpassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Confirm Password</p>
                <input
                  onChange={handleConPassword}
                  value={conPassword}
                  className="w-full  py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="password"
                />
                {errconPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {errconPassword}
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  Password must be atleast 6 characters
                </p>
              </div>

              <button
                onClick={handleRegistration}
                className="w-full py-1.5 text-sm font-normal rounded-sm bg-gradient-to-r from-[#f7dfa5] to-[#f0c14b] hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput"
              >
                Continue
              </button>
              {loading && (
                <div className="flex justify-center">
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#fbbf24"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              )}
              {
                successMsg && (
                  <div className="text-center">
                    <motion.p initial={{y:10, opacity:0}} animate={{y:0,opacity:1 }} transition={{duration:0.5}} className="text-base font-titleFont font-semibold text-green-500" >{successMsg}</motion.p>
                  </div>
                )
              }
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By Creating an account , you agree to Amazon's{" "}
              <span className="text-blue-600 cursor-pointer">
                Conditions of Use{" "}
              </span>
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Notice.
              </span>
            </p>
            <div>
              <p className="text-xs text-black">
                Alredy have an account{" "}
                <Link to="/signin">
                  <span className="text-blue-600 hover:text-orange-700 hover:underline underline-offset-1">
                    Sign In{" "}
                    <span>
                      <ArrowRightIcon />
                    </span>{" "}
                  </span>
                </Link>
              </p>
              <p className=" -mt-2 text-xs text-black">
                Buing for work?{" "}
                <span className="text-blue-600 hover:text-orange-700 hover:underline underline-offset-1">
                  Create a free business account
                  <span>
                    <ArrowRightIcon />
                  </span>{" "}
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <div className="w-full py-10 bg-gradient-to-t from-white via-white to-zinc-200 flex flex-col gap-4 justify-center items-center">
        <div className="flex items-center gap-6 jc">
          <p className="text-xs duration-100 cursor-pointer  text-blue-600 hover:text-orange-700 hover:underline underline-offset-1">
            Conditions of Use
          </p>
          <p className="text-xs duration-100 cursor-pointer  text-blue-600 hover:text-orange-700 hover:underline underline-offset-1">
            Privacy Notice
          </p>
          <p className="text-xs duration-100 cursor-pointer  text-blue-600 hover:text-orange-700 hover:underline underline-offset-1">
            Help
          </p>
        </div>
        <p className="text-xs text-gray-600">
          © 1996-2023, Subhajit.io, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
};

export default Registration;
