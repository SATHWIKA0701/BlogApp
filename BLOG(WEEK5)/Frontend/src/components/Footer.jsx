function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-600">
        <p>© {new Date().getFullYear()} MyBlog. Built with React, Vite, Express, and MongoDB.</p>
      </div>
    </footer>
  );
}

export default Footer;
