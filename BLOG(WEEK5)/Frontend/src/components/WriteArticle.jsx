import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../lib/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";

function WriteArticle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitArticle = async (articleObj) => {
    if (!currentUser?._id) return toast.error("Author not found");
    setLoading(true);
    articleObj.author = currentUser._id;
    try {
      await api.post("/author-api/articles", articleObj);
      toast.success("Article published successfully!");
      reset();
      navigate("/author-profile/articles");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Write New Article</h2>
      <form onSubmit={handleSubmit(submitArticle)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input type="text" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="Enter article title" {...register("title", { required: "Title is required", minLength: { value: 5, message: "Title must be at least 5 characters" } })} />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" {...register("category", { required: "Category is required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>
          {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea rows="8" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" placeholder="Write your article content..." {...register("content", { required: "Content is required", minLength: { value: 50, message: "Content must be at least 50 characters" } })} />
          {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>}
        </div>

        <button className="w-full rounded-full bg-slate-900 text-white py-3 font-medium hover:bg-slate-700 transition" type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>
      </form>
    </div>
  );
}

export default WriteArticle;
