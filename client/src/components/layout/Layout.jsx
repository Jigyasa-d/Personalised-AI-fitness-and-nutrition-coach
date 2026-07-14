import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-transparent text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="ml-72 min-h-screen">

        {/* Sticky Navbar */}
        <div className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/40 border-b border-white/10">

          <div className="px-8 py-5">

            <Navbar />

          </div>

        </div>

        {/* Page Content */}

        <div className="px-8 py-8">

          {children}

        </div>

      </main>

    </div>
  );
}