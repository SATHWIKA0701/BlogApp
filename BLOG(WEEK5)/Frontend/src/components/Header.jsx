import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../store/authStore";

function Header() {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  const getProfilePath = () => {
    if (!user) return "/";
    return user.role === "AUTHOR" ? "/author-profile" : "/user-profile";
  };

  const navItemClass = ({ isActive }) =>
    `px-3 py-2 rounded-full text-sm transition ${isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900">
          MyBlog
        </NavLink>

        <button
          className="md:hidden px-3 py-2 rounded-lg border border-slate-300 text-sm"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav className={`${open ? "flex" : "hidden"} md:flex flex-col md:flex-row md:items-center gap-2 absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 border-slate-200 px-4 py-4 md:p-0`}>
          <NavLink to="/" end className={navItemClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink to="/register" className={navItemClass} onClick={() => setOpen(false)}>
                Register
              </NavLink>
              <NavLink to="/login" className={navItemClass} onClick={() => setOpen(false)}>
                Login
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <>
              <NavLink to={getProfilePath()} className={navItemClass} onClick={() => setOpen(false)}>
                Profile
              </NavLink>
              <button
                className="px-3 py-2 rounded-full text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
              {user && (
                <div className="md:ml-2 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100">
                  <img
                    src={user.profileImageUrl || "https://via.placeholder.com/40?text=U"}
                    alt={user.firstName || "user"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-slate-800">{user.firstName}</span>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
