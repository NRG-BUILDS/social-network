import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import logo from "@/assets/logos/logo_blacktext_cube_horizontal.png";
import useRequest from "@/hooks/useRequest";
import { LucideLoader2 } from "lucide-react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyEmail = () => {
  const { loading, makeRequest } = useRequest("/auth/verify-email", false);
  const { email } = useParams();
  const [form, setForm] = useState<{
    otp: null | Number;
    email: string | undefined;
  }>({ otp: null, email: email });
  const nav = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form);
    e.preventDefault();
    const res = await makeRequest(form, "POST");
    if (res.status === "success") {
      console.log(res);
      toast("Email address verified successfully!");
      nav("/login");
      return;
    }
    toast("Failed to verify OTP code.");
  };
  const handleResendClick = async () => {
    const res = await makeRequest(
      form,
      "POST",
      undefined,
      "/auth/resend-verification-email"
    );
    if (res.status === "success") {
      console.log(res);
      toast(`OTP has been resent to your email, ${email}`);
      return;
    }
    toast("Failed to resend OTP email");
  };

  return (
    <section className="bg-neutral-50 h-screen">
      <div className="flex flex-col items-center justify-center px-3 py-8 mx-auto md:h-screen lg:py-0">
        <img src={logo} alt="" className="w-auto h-[60px] my-4" />
        {/* LOGO GOES HERE!!!! */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Verify your email
            </h1>
            <p>
              A One-Time-Password (OTP) has been sent to your email{" "}
              <span className="font-bold text-neutral-700">{email}</span>
            </p>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <InputOTP
                maxLength={6}
                onChange={(e) => setForm({ ...form, otp: Number(e) })}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <div className="flex items-center justify-end">
                <button
                  onClick={handleResendClick}
                  className="text-sm font-medium text-brand-primary hover:underline dark:text-primary-500"
                >
                  Resend OTP
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative disabled:opacity-50 overflow-clip w-full text-white bg-brand-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-brand-primary dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Verify Email
                {loading && (
                  <div className="flex items-center justify-center w-full h-full absolute left-0 top-0 bg-inherit">
                    <LucideLoader2 className="animate-spin" />
                  </div>
                )}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-brand-primary hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
