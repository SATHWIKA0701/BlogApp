import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const Unauthorized = ({ delay = 3000 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/login";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(redirectTo, { replace: true });
    }, delay);

    return () => clearTimeout(timer);
  }, [navigate, redirectTo, delay]);

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-slate-50 rounded-3xl border border-slate-200 text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-slate-700 mb-2">You don’t have permission to access this page.</p>
      <p className="text-sm text-slate-500">Redirecting you now...</p>
    </div>
  );
};

export default Unauthorized;
