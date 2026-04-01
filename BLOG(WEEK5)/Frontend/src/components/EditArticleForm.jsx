import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import api from "../lib/api";
import { toast } from "react-hot-toast";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (!article) return;
    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  const updateArticle = async (data) => {
    if (!article?._id) return toast.error("Article data not found. Open edit from article page.");
    try {
      data.articleId = article._id;
      const res = await api.put("/author-api/articles", data);
      toast.success("Article updated successfully");
      navigate(`/article/${article._id}`, { state: res.data.payload });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update article");
    }
  };

  if (!article) {
    return <div className="rounded-2xl border border-amber-200 bg-amber-50 text-amber-700 p-5">Open an article first, then choose edit.</div>;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Edit Article</h2>
      <form onSubmit={handleSubmit(updateArticle)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" {...register("title", { required: "Title required" })} />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
          <select className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" {...register("category", { required: "Category required" })}>
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
          <textarea rows="14" className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200" {...register("content", { required: "Content required" })} />
          {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content.message}</p>}
        </div>
        <button className="w-full rounded-full bg-slate-900 text-white py-3 font-medium hover:bg-slate-700 transition">Update Article</button>
      </form>
    </div>
  );
}

export default EditArticle;
