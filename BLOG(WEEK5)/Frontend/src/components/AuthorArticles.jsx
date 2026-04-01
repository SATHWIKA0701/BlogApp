import { useEffect, useState } from "react";
import api from "../lib/api";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?._id) return;

    const getAuthorArticles = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/author-api/articles/${user._id}`);
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    getAuthorArticles();
  }, [user?._id]);

  if (loading) return <p className="text-center py-10 text-slate-500">Loading articles...</p>;
  if (error) return <p className="rounded-xl border border-red-200 bg-red-50 text-red-600 p-4">{error}</p>;
  if (articles.length === 0) return <div className="text-center py-14 text-slate-500">You haven't published any articles yet.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div key={article._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 flex flex-col gap-3 hover:shadow-md transition">
          <div className="flex items-start justify-between gap-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${article.isArticleActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {article.isArticleActive ? "ACTIVE" : "DELETED"}
            </span>
            <span className="text-xs text-slate-500">{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-600">{article.category}</p>
            <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">{article.title}</h3>
            <p className="text-sm text-slate-600 leading-6 line-clamp-3">{article.content}</p>
          </div>

          <button
            className="mt-auto w-fit px-4 py-2 rounded-full border border-slate-300 text-sm hover:bg-white transition"
            onClick={() => navigate(`/article/${article._id}`, { state: article })}
          >
            Open article
          </button>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
