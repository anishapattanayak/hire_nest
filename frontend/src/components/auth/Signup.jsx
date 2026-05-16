import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [errors, setErrors] = useState({});
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!input.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!input.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(input.phoneNumber)) {
      newErrors.phoneNumber = "Enter valid 10-digit number";
    }
    if (!input.password.trim()) {
      newErrors.password = "Password is required";
    } else if (input.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }
    if (!input.role) newErrors.role = "Please select a role";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("profilePhoto", input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
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
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#2c2415] mb-6 sm:mb-8 font-serif tracking-tight">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="flex flex-col gap-1.5 mb-4">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
              className={`h-11 rounded-lg border ${
                errors.fullname ? "border-red-500" : "border-[#d9cdb8]"
              } bg-white text-[#2c2415] text-sm px-3 focus-visible:ring-2 focus-visible:ring-[#4a6741] focus-visible:border-[#4a6741] placeholder:text-[#b5a898]`}
            />
            {errors.fullname && (
              <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>
            )}
          </div>

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

          {/* Phone — full width on all screens */}
          <div className="flex flex-col gap-1.5 mb-4">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="xxxxxxxxxx"
              className={`h-11 rounded-lg border ${
                errors.phoneNumber ? "border-red-500" : "border-[#d9cdb8]"
              } bg-white text-[#2c2415] text-sm px-3 focus-visible:ring-2 focus-visible:ring-[#4a6741] focus-visible:border-[#4a6741] placeholder:text-[#b5a898]`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
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
          <div className="flex flex-col gap-1.5 mb-4">
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

          {/* Profile Photo */}
          <div className="flex flex-col gap-1.5 mb-6">
            <Label className="text-xs font-semibold text-[#4a3f2f] uppercase tracking-widest">
              Profile Photo
            </Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className={`h-11 rounded-lg border ${
                errors.file ? "border-red-500" : "border-[#d9cdb8]"
              } bg-white text-[#4a3f2f] text-sm px-3 py-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#4a6741]`}
            />
            {errors.file && (
              <p className="text-red-500 text-xs mt-1">{errors.file}</p>
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
              Signup
            </Button>
          )}

          {/* Login link */}
          <p className="text-sm text-[#6b5c45] text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-[#4a6741] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;