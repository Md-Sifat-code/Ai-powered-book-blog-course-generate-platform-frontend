// src/pages/Reset.tsx

import { useResetPasswordMutation } from "@/store/api/auth/authApi";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const Reset = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  console.log({ token });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const result = await resetPassword({
        resetToken: token,
        password: newPassword,
      }).unwrap();
      console.log("Password reset successful:", result);
      if (result?.success) {
        toast.success("Password has been reset successfully");
        navigate("/");
      } else {
        toast.error(result?.message || "Failed to reset password");
      }
    } catch (error) {}
    // Submit new password logic here
    console.log("Password reset to:", newPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-0 text-T-900 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
        {/* First Section - Title */}
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl font-bold text-center">
            Set New Password
          </h1>
        </div>

        {/* Second Section - Password Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm sm:text-base lg:text-lg">
              New Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 bg-primary-0 border border-T-900 text-T-900 focus:outline-none rounded-md text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base lg:text-lg">
              Confirm New Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-primary-0 border border-T-900 text-T-900 focus:outline-none rounded-md text-sm sm:text-base"
              required
            />
          </div>
        </div>

        {/* Third Section - Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full disabled:cursor-not-allowed disabled:bg-T-900/70 cursor-pointer bg-T-900 text-primary-0 py-2 rounded-md text-sm sm:text-base lg:text-lg"
          >
            {isLoading && (
              <LoaderCircle
                className="animate-spin inline-block mr-2 "
                size={24}
              />
            )}{" "}
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reset;
