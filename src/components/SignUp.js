import React, { useReducer, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./miscellaneous/Toast";
import LoadingBtn from "./miscellaneous/LoadingBtn";
import { ChatState } from "../Context/ChatProvider";

const api = process.env.REACT_APP_API;
// ------------------- REDUCERE FUNCTION -------------------
const reducer = (submit, action) => {
  switch (action.type) {
    case "submitClick":
      return { ...submit, submitClick: action.payload };
    case "userData":
      let name = action.payload.key;
      return {
        ...submit,
        userData: {
          ...submit.userData,
          [name]: action.payload[name],
        },
      };
    case "clearUserData":
      return {
        ...submit,
        userData: { name: "", email: "", password: "", cpassword: "" },
      };

    default:
      return submit;
  }
};
function SignUp() {

  const {user} = ChatState();
  // --------------------------- REDUCER HOOK ---------------------------

  const [submit, dispatch] = useReducer(reducer, {
    submitClick: false,
    userData: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  // --------------------------- STATE HOOKS ---------------------------

  const [toast, setToast] = useState(false);
  const [show, setShow] = useState(false);

  // --------------------------- NAVIGATE HOOKS --------------------------- 
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      navigate("/chats")
    }
  }, [user, navigate])

  // --------------------------- FUNCTION FOR THE CHANGE IN INPUT FIELD ---------------------------

  const handleOnChange = (e) => {
    let name = e.target.name;
    dispatch({
      type: "userData",
      payload: { [name]: e.target.value, key: name },
    });
  };

  // --------------------------- FUNCTION FOR SIGN UP ---------------------------

  const handleOnSubmit = async () => {
    dispatch({ type: "submitClick", payload: true });
    try {
      const response = await fetch(`${api}/auth/user/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submit.userData),
      });
      const data = await response.json();
      localStorage.setItem("userInfo", JSON.stringify(data));

      dispatch({ type: "submitClick", payload: false });
      dispatch({
        type: "clearUserData",
      });
      navigate('/chats');
      // setToast(true);
    } catch (error) {
      console.log(error);
    }
  };
  // --------------------------- FUNCTION FOR TOAST DISAPPEARING  ---------------------------

  setTimeout(()=>{if (toast) setToast(false)}, 3000)

  return (
    <>
      <div className="bg-gray-200 w-full min-h-screen flex items-center justify-center">
        {toast && (
          <Toast status={"success"} message={"Registration successfull"} />
        )}
        <div className="w-full py-8">
          <div className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
              ></path>
            </svg>
            <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
            Chat
            </h1>
          </div>
          <div className="bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-auto px-16 py-8 rounded-lg shadow-2xl">
            <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
              Sign Up
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?{" "}
              <Link
                to={"/signIn"}
                className="text-blue-600 hover:text-blue-700 hover:underline"
                title="Sign In"
              >
                Sign in here
              </Link>
            </p>

            <form className="my-8 text-sm">
              <div className="flex flex-col my-4">
                <label htmlFor="name" className="text-gray-700">
                  Name
                </label>
                <input
                  autoComplete="off"
                  onChange={handleOnChange}
                  type="text"
                  name="name"
                  id="name"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  value={submit.userData.name}
                  placeholder="Enter your name"
                />
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="email" className="text-gray-700">
                  Email Address
                </label>
                <input
                  autoComplete="off"
                  onChange={handleOnChange}
                  type="email"
                  name="email"
                  id="email"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  value={submit.userData.email}
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="password" className="text-gray-700">
                  Password
                </label>
                <div
                  x-data="{ show: false }"
                  className="relative flex items-center mt-2"
                >
                  <input
                    autoComplete="off"
                    onChange={handleOnChange}
                    name="password"
                    id="password"
                    className="flex-1 p-2 md:pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    placeholder="Enter your password"
                    value={submit.userData.password}
                    type={show ? "text" : "password"}
                  />
                  <button
                    className="absolute md:right-2 right-1 bg-transparent flex items-center justify-center text-gray-700"
                    onClick={(e) => {
                      e.preventDefault();
                      setShow((prev) => !prev);
                    }}
                  >
                    <svg
                      x-show="!show"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: !show ? "flex" : "none" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                    <svg
                      x-show="show"
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: show ? "flex" : "none" }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex flex-col my-4">
                <label
                  htmlFor="password_confirmation"
                  className="text-gray-700"
                >
                  Password Confirmation
                </label>
                <div
                  x-data="{ show: false }"
                  className="relative flex items-center mt-2"
                >
                  <input
                    autoComplete="off"
                    onChange={handleOnChange}
                    type="password"
                    name="cpassword"
                    id="password_confirmation"
                    className="flex-1 p-2 md:pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    value={submit.userData.cpassword}
                    placeholder="Enter your password again"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  autoComplete="off"
                  type="checkbox"
                  name="remember_me"
                  id="remember_me"
                  className="mr-2 focus:ring-0 rounded"
                />
                <label htmlFor="remember_me" className="text-gray-700">
                  I accept the{" "}
                  <Link
                    to={""}
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to={""}
                    className="text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    privacy policy
                  </Link>
                </label>
              </div>

              <div className="my-4 flex items-center justify-end space-x-4">
                {!submit.submitClick && (
                  <button
                    className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
                    onClick={handleOnSubmit}
                  >
                    Sign Up
                  </button>
                )}
                {submit.submitClick && <LoadingBtn />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;