import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import logo from "@/assets/logos/logo_blacktext_cube_horizontal.png";
import useRequest from "@/hooks/useRequest";
import { LucideLoader2 } from "lucide-react";
import { toast } from "sonner";
import { login } from "@/store/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, makeRequest } = useRequest("/auth/login", false);
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      toast.error("Invalid login credentials");
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(form);
    e.preventDefault();
    const res = await makeRequest(form, "POST");
    if (res.status === "success") {
      const payload = {
        token: res.data.access,
        refresh: res.data.refresh,
        username: res.data.username,
        email: form.email,
        user: null,
      };
      dispatch(login(payload));
      //navigate to previous page (if stored) or to profile if not
      const from = location.state?.from || "/home";
      nav(from);
    } else {
      toast(res.message);
    }
  };

  return (
    <section className="bg-neutral-50 h-screen">
      <div className="flex flex-col items-center justify-center px-3 py-8 mx-auto md:h-screen lg:py-0">
        <img src={logo} alt="" className="w-auto h-[60px] my-4" />
        {/* LOGO GOES HERE!!!! */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="email@username.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="flex items-center gap-2  bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600  p-2.5">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEye /> : <FiEyeOff />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <a
                  href="#"
                  className="text-sm font-medium text-brand-primary hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="relative disabled:opacity-50 overflow-clip w-full text-white bg-brand-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-brand-primary dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
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

export default Signin;
