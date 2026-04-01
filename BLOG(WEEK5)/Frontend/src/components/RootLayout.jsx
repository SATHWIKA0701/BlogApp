import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../store/authStore";

function RootLayout() {
  const checkAuth = useAuth((state) => state.checkAuth);
  const loading = useAuth((state) => state.loading);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <p className="text-center mt-10 text-slate-600">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <main className="min-h-[calc(100vh-140px)] max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default RootLayout;
