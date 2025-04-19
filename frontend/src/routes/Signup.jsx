import React, { useEffect, useState } from "react";
import { BiSolidHide, BiShow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { createAccount } from "../redux/authReducer/action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CommonComponents/CustomInput";
import CustomPasswordInput from "../components/CommonComponents/CustomPasswordInput";
import logo from "../assets/Logo Collabify.png";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sign_up_processing = useSelector((state) => state.authReducer.sign_up_processing);
  const sign_up_message = useSelector((state) => state.authReducer.sign_up_message);
  const sign_up_success = useSelector((state) => state.authReducer.sign_up_success);
  const sign_up_failed = useSelector((state) => state.authReducer.sign_up_failed);
  const sign_in_success = useSelector((state) => state.authReducer.sign_in_success);

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  //  handel input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  handel user input submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation here

    const user = {
      name: formData.name.trim(),
      password: formData.password.trim(),
      email: formData.email.trim(),
    };

    if (user.password.length > 30 || user.email.length > 40 || user.name.length > 30 || formData.confirmPassword.trim().length > 30) {
      toast.error("Maximum input length exceeded", { position: toast.POSITION.BOTTOM_LEFT });
      return;
    } else if (user.password !== formData.confirmPassword.trim()) {
      toast.error("Passwords do not match", { position: toast.POSITION.BOTTOM_LEFT });
      return;
    } else if (user.password.length < 7) {
      toast.error("Password must be at least 8 characters long", { position: toast.POSITION.BOTTOM_LEFT });
      return;
    } else {
      dispatch(createAccount(user));
    }
  };

  //  set password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //  useEffect
  useEffect(() => {
    //  if user already login
    if (sign_in_success) {
      navigate("/");
    }

    //  sign up fail
    if (!sign_up_processing && sign_up_failed && !sign_up_success) {
      toast.error(sign_up_message, { position: toast.POSITION.BOTTOM_LEFT });
    }

    // sign up success
    if (!sign_up_processing && !sign_up_failed && sign_up_success) {
      toast.success("Account Successfully Created.", { position: toast.POSITION.BOTTOM_LEFT });

      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    }
  }, [sign_up_processing, sign_up_success, sign_up_failed, sign_in_success]);

  return (
    <section className="bg-gradient-to-r from-purple-100 via-fuchsia-100 to-green-100 dark:from-purple-900 dark:via-fuchsia-900 dark:to-green-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold bg-gradient-to-r from-purple-600 via-fuchsia-500 to-green-400 bg-clip-text text-transparent dark:from-purple-400 dark:via-fuchsia-400 dark:to-green-300">
          <img className="w-12 h-12 mr-2" src={logo} alt="logo" />
          Colabify
        </a>
        <div className="w-full bg-primary-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-primary-800 dark:border-primary-700">
          <div className="p-4 space-y-2 md:space-y-3 sm:p-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary-900 md:text-2xl dark:text-white">Sign up to continue.</h1>
            <p className="text-sm font-semibold text-primary-500 dark:text-primary-400">
              Already have an account?{" "}
              <span
                onClick={(e) => {
                  navigate("/signin");
                }}
                className="cursor-pointer font-bold ml-2 text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign in
              </span>
            </p>
            <form className="space-y-1 md:space-y-1" onSubmit={handleSubmit} action="#">
              {/* user name input */}
              <CustomInput label="Your name" value={formData.name} onChange={handleChange} name="name" placeholder="xyz" required />

              {/* user email password */}
              <CustomInput label="Your email" value={formData.email} type="email" onChange={handleChange} name="email" placeholder="@example.com" required />

              {/* password input */}
              <CustomPasswordInput label="Password" value={formData.password} onChange={handleChange} name="password" placeholder="••••••••" required />

              {/* confirm password input */}
              <CustomPasswordInput label="Confirm password" value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" placeholder="••••••••" required />

              <button
                type="submit"
                disabled={sign_up_processing}
                className={`w-full text-white bg-gradient-to-r from-purple-600 via-fuchsia-500 to-green-400 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 ${
                  sign_up_processing ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {sign_up_processing ? (
                  <div className="flex items-center justify-center">
                    <span className="mr-2">Please wait</span>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </section>
  );
};

export default Signup;
