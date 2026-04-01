import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";

function Login() {
  const { register, handleSubmit } = useForm();
  const login = useAuth((state) => state.login);
  const error = useAuth((state) => state.error);
  const navigate = useNavigate();

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);

    const { isAuthenticated, currentUser, error } = useAuth.getState();

    if (isAuthenticated && currentUser) {
      toast.success("Logged in successfully");

      if (currentUser.role === "AUTHOR") {
        navigate("/author-profile");
      } else {
        navigate("/user-profile");
      }
    } else if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">
          Sign In
        </h2>

        {error && (
          <p className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-600 p-3 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 text-white py-3 font-medium hover:bg-slate-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-5">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;