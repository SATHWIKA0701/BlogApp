import React from "react";
import { useForm } from "react-hook-form";

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Article form data:", data);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-[#e9e9e9] rounded-md shadow-sm px-6 py-10 sm:px-10 md:px-16">
        <h1 className="text-center text-3xl md:text-4xl font-semibold mb-10 underline underline-offset-4">
          Add Article
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto space-y-6"
        >
          <div>
            <input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters",
                },
              })}
              className="w-full bg-[#cfcfcf] px-5 py-4 text-lg outline-none rounded-sm"
            />
            {errors.title && (
              <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
            )}
          </div>

          <div>
            <select
              {...register("category", {
                required: "Category is required",
              })}
              className="w-full bg-[#cfcfcf] px-5 py-4 text-lg outline-none rounded-sm"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Health">Health</option>
              <option value="Sports">Sports</option>
              <option value="Business">Business</option>
              <option value="Lifestyle">Lifestyle</option>
            </select>
            {errors.category && (
              <p className="text-red-600 text-sm mt-2">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows="7"
              placeholder="Content"
              {...register("content", {
                required: "Content is required",
                minLength: {
                  value: 20,
                  message: "Content must be at least 20 characters",
                },
              })}
              className="w-full bg-[#cfcfcf] px-5 py-4 text-lg outline-none rounded-sm resize-none"
            />
            {errors.content && (
              <p className="text-red-600 text-sm mt-2">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              className="bg-sky-400 hover:bg-sky-500 text-black font-semibold text-2xl px-10 py-3 rounded-sm transition"
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;