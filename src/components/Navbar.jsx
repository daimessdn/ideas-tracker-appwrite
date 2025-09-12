import { useUser } from "../lib/context/user";

export default function Navbar() {
  const user = useUser();

  return (
    <nav className="border-b bg-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <a
          href="/"
          className="text-lg font-semibold text-gray-800 hover:text-gray-900"
        >
          Idea Tracker
        </a>

        {/* Navigation Right Side */}
        <div className="flex items-center gap-3">
          {user.current ? (
            <>
              <span className="text-sm font-medium text-gray-600">
                {user.current.email}
              </span>
              <button
                type="button"
                onClick={() => user.logout()}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
