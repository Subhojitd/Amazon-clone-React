import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { darkLogo } from "../assets/index";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { ThreeDots } from  'react-loader-spinner'
import  {useDispatch} from "react-redux"
import {setUserInfo} from "../redux/AmazonSlice"

const SignIn = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erremail, seterrEmail] = useState("");
  const [errpassword, seterrPassword] = useState("");
  // Loding State
  const [loading, setLoading] = useState(false);
  const [successMsg, setsuccessMsg] = useState("");
  // Firebase Error
  const [firebaseEmailError, setfirebaseEmailError] = useState("");
  const [firebasePassError, setfirebasePassError] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    seterrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    seterrPassword("");
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      seterrEmail("Please enter your email address");
    }
    if (!password) {
      seterrPassword("Please enter your password");
    }
    if (email && password) {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(setUserInfo({
            id:user.uid,
            userName:user.displayName,
            email:user.email,
            image:user.photoURL
          }))


          setLoading(false);
          setsuccessMsg("Logged In Successfully ! ");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          // ...
        })
        .catch((error) => {
          setLoading(false);
          const errorCode = error.code;
          if (errorCode.includes("auth/invalid-email")) {
            setfirebaseEmailError("Invalid Email");
          }
          if (errorCode.includes("auth/invalid-password")) {
            setfirebasePassError("Wrong Password! Try Again");
          }
          console.log("Something is up, Try with correct  Credential;");
        });

      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10 ">
        {
          successMsg ? <div className="w-full flex justify-center items-center py-32">
            <p className="border-[1px] border-green-600 text-green-500 font-titleFont text-lg font-semibold px-6 py-2 ">{successMsg}</p>

          </div>:<form className="w-[350px] mx-auto flex flex-col items-center ">
          <Link to="/">
            <img className="w-32 my-3 " src={darkLogo} alt="logo" />
          </Link>
          <div className="w-full border border-zinc-200 p-6 rounded-md">
            <h2 className="font-titleFont text-3xl font-medium mb-4">
              Sign in
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email or phone number</p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
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
                { firebaseEmailError && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {firebaseEmailError}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput duration-100"
                  type="email"
                />
                {firebasePassError && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">
                      !
                    </span>{" "}
                    {firebasePassError}
                  </p>
                )}
              </div>
              <button
                onClick={handleLogin}
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
            </div>
            <p className="text-xs text-black leading-4 mt-4">
              By continuing, you agree to Amazon's{" "}
              <span className="text-blue-600 cursor-pointer">
                Conditions of Use{" "}
              </span>
              and{" "}
              <span className="text-blue-600 cursor-pointer">
                Privacy Notice.
              </span>
            </p>
            <p className="text-xs text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightIcon />
              <span className="text-blue-600 group-hover:text-orange-700 group-hover:underline underline-offset-1">
                Need help ?
              </span>
            </p>
          </div>
          <p className="w-full text-xs text-gray-600 mt-4 flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New to Amazon ?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </p>
          <Link className="w-full" to="/registration">
            <button className="w-full py-1.5 mt-4 text-sm font-normal rounded-sm bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
              Create your Amazon account
            </button>
          </Link>
        </form>
        }
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

export default SignIn;
