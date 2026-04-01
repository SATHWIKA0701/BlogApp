import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/api";

function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    const { role, profileImageUrl, ...userObj } = newUser;

    Object.keys(userObj).forEach((key) => formData.append(key, userObj[key]));
    if (profileImageUrl?.[0]) {
      formData.append("profileImageUrl", profileImageUrl[0]);
    }

    try {
      const endpoint = role === "author" ? "/author-api/users" : "/user-api/users";
      const resObj = await api.post(endpoint, formData);
      if (resObj.status === 201) navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (loading) return <p className="text-center py-10 text-slate-500">Creating your account...</p>;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-6">Create an Account</h2>
        {error && <p className="mb-4 rounded-xl border border-red-200 bg-red-50 text-red-600 p-3 text-sm">{error}</p>}

        <form onSubmit={handleSubmit(onUserRegister)} className="space-y-4">
          <div>
            <p className="text-sm font-medium text-slate-700 mb-2">Register as</p>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" {...register("role")} value="user" defaultChecked /> <span>User</span></label>
              <label className="flex items-center gap-2 cursor-pointer"><input type="radio" {...register("role")} value="author" /> <span>Author</span></label>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input type="text" {...register("firstName")} placeholder="First name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input type="text" {...register("lastName")} placeholder="Last name" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input type="email" {...register("email")} placeholder="you@example.com" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input type="password" {...register("password")} placeholder="Min. 8 characters" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!["image/jpeg", "image/png"].includes(file.type)) return setError("Only JPG or PNG allowed");
                if (file.size > 2 * 1024 * 1024) return setError("File size must be less than 2MB");
                setPreview(URL.createObjectURL(file));
                setError(null);
              }}
              className="block w-full text-sm"
            />
            {preview && <img src={preview} alt="Preview" className="mt-3 w-24 h-24 object-cover rounded-full border" />}
          </div>

          <button type="submit" className="w-full rounded-full bg-slate-900 text-white py-3 font-medium hover:bg-slate-700 transition">Create Account</button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-5">
          Already have an account? <NavLink to="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign in</NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
