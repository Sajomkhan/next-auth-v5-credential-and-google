"use client";
import { login, loginWithCredentials } from "@/actions/authActions";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [formValue, setFormValue] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { pending } = useFormStatus();

  // HANDLE CHANGE OF INPUT FIELDS
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  // CHECK THE VALIDITY OF THE FORM
  const validate = (values: FormValues) => {
    const error: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const uppercaseRegex = /[A-Z]/;

    // Email validation
    if (!values.email) {
      error.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      error.email = "Invalid email address";
    } else if (uppercaseRegex.test(values.email)) {
      error.email = "Email must not contain uppercase letters";
    } else if (values.email.length > 50) {
      error.email = "Email must be between 6 and 50 characters";
    }
    // Password validation
    if (!values.password) {
      error.password = "Password is required";
    } else if (values.password.length < 4 || values.password.length > 30) {
      error.password = "Password must be at least 4 characters";
    }
    return error;
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      // console.log(formValue);
    }
  }, [formError]);

  // HANDLE LOGIN SUBMIT
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(validate(formValue));
    loginWithCredentials(formValue.email, formValue.password);

  };

  return (
    <div className="w-full h-screen flex justify-center items-center text-sm ">
      <div className="w-96 flex flex-col gap-7 bg-white text-black rounded-lg px-6 py-10 sm:px-10">
        <h1 className="text-2xl font-bold text-center">
          Log in to your account
        </h1>

        {/* EXPERNAL PROVIDER LOGIN */}
        <section className="w-full flex flex-col gap-6 ">
          {/* GOOGLE LOGIN */}
          <div
            onClick={() => login("google")}
            className=" w-full bg-blue-500 flex gap-3 items-center justify-center rounded-md py-2 cursor-pointer"
          >
            <FaGoogle className="text-white" />
            <p className="text-white">Login with Google</p>
          </div>
          {/* GITHUB LOGIN */}
          <div
            onClick={() => login("github")}
            className=" w-full bg-black flex gap-3 items-center justify-center rounded-md py-2 cursor-pointer"
          >
            <FaGithub className="text-white" />
            <p className="text-white">Login with Github</p>
          </div>
        </section>

        {/* SEPERATOR */}
        <div className="w-full h-5 flex items-center justify-between relative">
          <span className="w-[43%] h-[1px] bg-gray-200" />
          <span className="text-gray-500 text-sm">or</span>
          <span className="w-[43%] h-[1px] bg-gray-200" />
        </div>

        {/* CRADENTIAL LOGIN FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* EMAIL */}
          <div className="flex flex-col gap-1">
            <input
              className="border border-gray-300 outline-gray-300 rounded-md py-2 px-4"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <p className="text-sm text-red-500">{formError.email}</p>
          </div>
          {/* PASSOWRD */}
          <div className="flex flex-col gap-1 relative">
            <input
              className="border border-gray-300 outline-gray-300 rounded-md py-2 px-4"
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <p className="text-sm text-red-500">{formError.password}</p>
            {/* SHOW PASSWORD */}
            {isPasswordVisible ? (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                <FaEye
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </span>
            ) : (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                <FaEyeSlash
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            {/* GO FOR SING UP */}
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <a className="underline hover:text-teal-500" href="/register">
                Sign up
              </a>
            </p>
            {/* LOGIN BUTTON */}
            <button
              disabled={pending}
              className={`${
                pending ? "bg-gray-500" : " bg-teal-500 hover:bg-teal-600"
              } w-fit py-1.5 px-4 rounded-md text-white transition-all ease-linear duration-150`}
            >
              {pending ? "Loading..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
