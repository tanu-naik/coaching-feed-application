import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">

      <div className="w-full max-w-4xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            🚀 Feed System Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">
            Real-time feed management with admin control & live updates
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* USER FEED CARD */}
          <Link href="/feed">
            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition transform cursor-pointer">

              <h2 className="text-2xl font-semibold mb-2 group-hover:text-green-400 transition">
                👥 User Feed
              </h2>

              <p className="text-zinc-400 text-sm">
                View real-time feeds, updates, and notifications instantly as they are posted.
              </p>

              <div className="mt-4 text-sm text-zinc-500">
                → Live socket updates enabled
              </div>
            </div>
          </Link>

          {/* ADMIN PANEL CARD */}
          <Link href="/admin">
            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg hover:scale-105 transition transform cursor-pointer">

              <h2 className="text-2xl font-semibold mb-2 group-hover:text-purple-400 transition">
                🛠️ Admin Panel
              </h2>

              <p className="text-zinc-400 text-sm">
                Create and publish feeds instantly with categories, priority, and live broadcast.
              </p>

              <div className="mt-4 text-sm text-zinc-500">
                → Control all feed content
              </div>
            </div>
          </Link>

        </div>

        {/* FOOTER */}
        <div className="text-center mt-10 text-xs text-zinc-500">
          Built with Next.js + Socket.IO + MongoDB
        </div>

      </div>
    </div>
  );
}