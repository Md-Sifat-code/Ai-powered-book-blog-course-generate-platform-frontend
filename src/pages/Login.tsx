// src/pages/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthStore } from "@/store/useAuthStore";
import { useLoginUserMutation } from "@/store/api/auth/authApi";
import { useAppDispatch } from "@/store/hooks";

import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/store/features/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginUserMutation();
  // const { login } = useAuthStore();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login successful:", result);
      if (result?.success) {
        dispatch(
          loginUser({
            id: result?.data?.user?.id,
            email: result?.data?.user?.email,
            accessToken: result?.data?.accessToken,
            role: result?.data?.user?.role,
          })
        );
        navigate("/dashboard");
        toast.success("Login successful");
      } else {
        toast.error(result?.message || "Login failed");
      }
    } catch (error) {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-0 text-T-900">
      <form onSubmit={handleSubmit} className="space-y-4 w-[400px]">
        <h2 className="text-xl 2xl:text-2xl font-bold text-center">Login</h2>

        <div>
          <label className="block mb-1">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-primary-0 border border-T-900 text-T-900 focus:outline-none rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-primary-0 border border-T-900 text-T-900 focus:outline-none rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-T-900 disabled:cursor-not-allowed disabled:bg-T-900/70 text-primary-0 py-2 rounded-md"
        >
          {isLoading && <LoaderCircle className="animate-spin inline-block mr-2 " size={24} />}{" "}
          Login
        </button>

        <div className="text-center text-sm text-T-900">
          <Link
            to={"/prereset"}
            className="text-center text-lg underline cursor-pointer"
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
