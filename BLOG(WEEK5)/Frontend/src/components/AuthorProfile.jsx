import { NavLink, Outlet } from "react-router";

function AuthorProfile() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm transition ${isActive ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <NavLink to="articles" className={linkClass}>Articles</NavLink>
        <NavLink to="write-article" className={linkClass}>Write Article</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AuthorProfile;
