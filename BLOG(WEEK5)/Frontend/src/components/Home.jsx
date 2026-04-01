import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-4xl text-center">
        
        {/* Small Heading */}
        <p className="text-blue-600 tracking-widest text-sm font-semibold mb-4">
          BLOG APPLICATION
        </p>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Write, publish, and manage articles with a clean full-stack workflow.
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Register as a user or author, publish articles, manage your posts,
          and read content in a responsive and simple experience.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-full bg-slate-900 text-white font-medium hover:bg-slate-700 transition"
          >
            Get started
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-medium hover:bg-slate-100 transition"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;