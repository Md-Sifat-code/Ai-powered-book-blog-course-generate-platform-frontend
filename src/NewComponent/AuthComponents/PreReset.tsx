// src/pages/PreReset.tsx
import { useForgetPasswordMutation } from "@/store/api/auth/authApi";
import {  LoaderCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const PreReset = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
 
  console.log({ isLoading });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset request sent to:", email);
    try {
      const result = await forgetPassword(email).unwrap();
      console.log({ result });
      if (result?.success) {
        toast.success("Reset link sent to your email");
      } else {
        toast.error(result?.message || "Failed to send reset link");
      }
    } catch (error) {
      console.error("Error sending reset request:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-0 text-T-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* First Section */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center mb-2">
            Set New Password
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-xl text-center">
            Enter your email address that you used to register. We’ll send you
            an email with your username and a link to reset your password.
          </p>
        </div>

        {/* Second Section - Email Input */}
        <div>
          <label className="block mb-1 text-sm sm:text-base md:text-base lg:text-lg 2xl:text-xl">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-primary-0 border border-T-900 text-T-900 focus:outline-none rounded-md text-sm sm:text-base md:text-base lg:text-lg"
            required
          />
        </div>

        {/* Third Section - Submit Button */}
        <div>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            type="submit"
            className="w-full cursor-pointer bg-T-900 disabled:cursor-not-allowed disabled:bg-T-900/70 text-primary-0 py-2 rounded-md text-sm sm:text-base md:text-base lg:text-lg"
          >
            {isLoading && (
              <LoaderCircle
                className="animate-spin inline-block mr-2 "
                size={24}
              />
            )}{" "}
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreReset;
