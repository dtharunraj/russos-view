import React from "react";
import { Search, ShoppingCart, X, LogIn, UserPlus, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Header({
  search,
  setSearch,
  cartCount,
  selectedCategory,
  setSelectedCategory,
  categories,
  onOpenCart,
}) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("rv_user") || "null");

  const logout = () => {
    localStorage.removeItem("rv_token");
    localStorage.removeItem("rv_user");
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/95 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 md:px-8">
        <button
          className="flex shrink-0 items-center gap-2"
          onClick={() => {
            setSelectedCategory("All");
            navigate("/");
          }}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 text-xl font-black text-black">
            T
          </span>
          <span className="text-left">
            <span className="block text-lg font-black tracking-widest">
              RUSSO'S
            </span>
            <span className="block text-[10px] font-bold tracking-[0.35em] text-emerald-400">
              VIEW
            </span>
          </span>
        </button>

        <div className="hidden flex-1 md:block">
          <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-4">
            <Search size={18} className="text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search collectibles..."
              className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-gray-500"
            />
            {search && (
              <button onClick={() => setSearch("")} aria-label="Clear search">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hidden items-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-sm font-semibold hover:border-emerald-400 sm:flex"
              >
                <LogIn size={16} /> Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="flex items-center gap-2 rounded-xl bg-emerald-400 px-3 py-2.5 text-sm font-bold text-black hover:bg-emerald-300"
              >
                <UserPlus size={16} />
                <span className="hidden sm:inline">Sign Up</span>
                <span className="sm:hidden">Join</span>
              </button>
            </>
          ) : (
            <>
              <span className="hidden max-w-24 truncate text-sm text-emerald-300 md:inline">
                Hi, {user.name}
              </span>
              <button
                onClick={logout}
                aria-label="Log out"
                title="Log out"
                className="rounded-xl border border-white/10 p-2.5 hover:border-red-400 hover:text-red-400"
              >
                <LogOut size={18} />
              </button>
            </>
          )}

          <button
            onClick={onOpenCart}
            className="relative rounded-xl border border-white/10 p-3 transition hover:border-emerald-400"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-400 px-1 text-xs font-black text-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-3 md:hidden">
        <div className="flex items-center rounded-xl border border-white/10 bg-white/5 px-3">
          <Search size={17} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collectibles..."
            className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-500"
          />
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 md:px-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              navigate("/");
            }}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${
              selectedCategory === category
                ? "bg-emerald-400 text-black"
                : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;