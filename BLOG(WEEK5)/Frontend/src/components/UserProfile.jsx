import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { useEffect, useState } from "react";

function UserProfile() {
  const logout = useAuth((state) => state.logout);
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get("/user-api/articles");
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const formatDateIST = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  if (loading) return <p className="text-center py-10 text-slate-500">Loading articles...</p>;

  return (
    <div className="space-y-8">
      {error && <p className="rounded-xl border border-red-200 bg-red-50 text-red-600 p-4">{error}</p>}

      <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.profileImageUrl || "https://via.placeholder.com/80?text=U"}
            className="w-16 h-16 rounded-full object-cover"
            alt={currentUser?.firstName || "user"}
          />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
            <h2 className="text-2xl font-bold text-slate-900">{currentUser?.firstName || "User"}</h2>
            <p className="text-slate-600 text-sm">Browse active articles and join the discussion.</p>
          </div>
        </div>
        <button className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition" onClick={onLogout}>
          Logout
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles.map((articleObj) => (
          <div key={articleObj._id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col gap-3 hover:shadow-md transition">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-600">{articleObj.category}</p>
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{articleObj.title}</h3>
            <p className="text-sm text-slate-600 leading-6 line-clamp-3">{articleObj.content}</p>
            <p className="text-xs text-slate-500">{formatDateIST(articleObj.createdAt)}</p>
            <button
              className="mt-auto w-fit px-4 py-2 rounded-full border border-slate-300 text-sm hover:bg-slate-50 transition"
              onClick={() => navigate(`/article/${articleObj._id}`, { state: articleObj })}
            >
              Read article
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default UserProfile;
