import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }
    if (!input.role) {
      newErrors.role = "Please select a role";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        { email: input.email, password: input.password, role: input.role },
        { withCredentials: true }
      );
      if (res.data.success) {
        const token = res.data.token;
        if (token) {
          localStorage.setItem("token", token);
          axios.defaults.headers.common.Authorization = `Bearer ${token}`;
        }
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-[#f0ebe0] px-4 py-8 sm:py-12">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md bg-[#fdfaf4] border border-[#e0d5c0] rounded-2xl px-6 sm:px-10 py-8 sm:py-10 shadow-md"
        >
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#2c2415] mb-2 font-serif tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-center text-[#7a6a52] font-serif mb-6 sm:mb-8">
            Sign in to continue to Hire Nest
          </p>

          {/* Email */}
          <div className="flex flex-col gap-1.5 mb-4">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
              className={`h-11 rounded-lg border ${
                errors.email ? "border-red-500" : "border-[#d9cdb8]"
              } bg-white text-[#2c2415] text-sm px-3 focus-visible:ring-2 focus-visible:ring-[#4a6741] focus-visible:border-[#4a6741] placeholder:text-[#b5a898]`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5 mb-4">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Password <span className="text-red-500">*</span>
            </Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="••••••••"
              className={`h-11 rounded-lg border ${
                errors.password ? "border-red-500" : "border-[#d9cdb8]"
              } bg-white text-[#2c2415] text-sm px-3 focus-visible:ring-2 focus-visible:ring-[#4a6741] focus-visible:border-[#4a6741] placeholder:text-[#b5a898]`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5 mb-6">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Role <span className="text-red-500">*</span>
            </Label>
            <RadioGroup className="flex flex-row gap-6 pt-1 flex-wrap">
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#4a3f2f]">
                <Input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  checked={input.role === "jobseeker"}
                  onChange={changeEventHandler}
                  className="w-4 h-4 accent-[#4a6741]"
                />
                Jobseeker
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-[#4a3f2f]">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="w-4 h-4 accent-[#4a6741]"
                />
                Recruiter
              </label>
            </RadioGroup>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Submit */}
          {loading ? (
            <Button className="w-full h-11 bg-[#4a6741] text-white flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-11 bg-[#4a6741] hover:bg-[#3a5233] text-white font-semibold rounded-lg text-sm tracking-wide mb-5"
            >
              Sign In
            </Button>
          )}

          {/* Register link */}
          <p className="text-sm text-[#6b5c45] text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#4a6741] font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;