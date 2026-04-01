import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import api from "../lib/api";
import { useAuth } from "../store/authStore";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const user = useAuth((state) => state.currentUser);
  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/user-api/article/${id}`);
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [article, id]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await api.patch(`/author-api/articles/${id}/status`, { isArticleActive: newStatus });
      setArticle((prev) => ({ ...prev, ...res.data.payload }));
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed";
      toast.error(msg);
    }
  };

  const addComment = async ({ comment }) => {
    if (!comment?.trim()) return toast.error("Comment cannot be empty");
    try {
      const res = await api.put("/user-api/articles", { articleId: article._id, comment });
      setArticle(res.data.payload);
      reset();
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) return <p className="text-center py-10 text-slate-500">Loading article...</p>;
  if (error) return <p className="rounded-xl border border-red-200 bg-red-50 text-red-600 p-4">{error}</p>;
  if (!article) return null;

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">{article.category}</span>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${article.isArticleActive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
            {article.isArticleActive ? "Active" : "Deleted"}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">{article.title}</h1>
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-600 border-y border-slate-200 py-4">
          <div className="flex items-center gap-3">
            <img
              src={article.author?.profileImageUrl || "https://via.placeholder.com/40?text=A"}
              alt={article.author?.firstName || "Author"}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>✍️ {article.author?.firstName || "Author"}</span>
          </div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
        <div className="mt-6 text-slate-800 leading-8 whitespace-pre-line">{article.content}</div>

        {user?.role === "AUTHOR" && (
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => navigate("/edit-article", { state: article })}>
              Edit
            </button>
            <button className="px-4 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition" onClick={toggleArticleStatus}>
              {article.isArticleActive ? "Delete" : "Restore"}
            </button>
          </div>
        )}
      </div>

      {user?.role === "USER" && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Add a comment</h2>
          <form onSubmit={handleSubmit(addComment)} className="space-y-4">
            <textarea
              rows="4"
              {...register("comment")}
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Write your comment here..."
            />
            <button type="submit" className="px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-700 transition">
              Add comment
            </button>
          </form>
        </div>
      )}

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
        {(article.comments || []).length === 0 && <p className="text-slate-500">No comments yet.</p>}
        {(article.comments || []).map((comment, index) => (
          <div key={`${comment._id || comment.comment}-${index}`} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
            <p className="uppercase text-sm text-blue-600 font-bold mb-2">{comment.user?.email || "User"}</p>
            <p className="text-slate-700 leading-7">{comment.comment}</p>
          </div>
        ))}
      </section>

      <div className="text-sm text-slate-500 border-t border-slate-200 pt-5">Last updated: {formatDate(article.updatedAt)}</div>
    </article>
  );
}

export default ArticleByID;
