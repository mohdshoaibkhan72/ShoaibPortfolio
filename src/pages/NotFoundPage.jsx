import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-8xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-4">404</p>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
            Go Home
          </Link>
          <Link to="/projects" className="px-6 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
