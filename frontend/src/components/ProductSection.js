
import React from "react";
import { ArrowDownRight, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";

function ProductSection({
  products = [],
  loading,
  search = "",
  selectedCategory = "All",
  onAddToCart,
}) {
  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase().trim();

    const matchesSearch = `${product.name || ""} ${
      product.category || ""
    } ${product.description || ""}`
      .toLowerCase()
      .includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getImageSrc = (image) => {
    if (!image) return "";

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("data:")
    ) {
      return image;
    }

    return image.startsWith("/")
      ? image
      : `/images/${image}`;
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050806] text-white">

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden border-b border-emerald-400/10">

        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#06291c] via-[#050806] to-black" />

        <div className="absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

        <div className="absolute -right-20 bottom-0 -z-10 h-96 w-96 rounded-full bg-green-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28 lg:py-32">

          {/* LEFT CONTENT */}
          <div className="animate-hero-reveal">

            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300 sm:text-xs">
                The Multiverse Collection
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              DOOMSDAY
              <span className="mt-3 block bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-600 bg-clip-text text-transparent">
                IS COMING.
              </span>
            </h1>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-12 bg-emerald-400" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 sm:text-sm">
                18 December 2026
              </p>
            </div>

            <p className="mt-7 max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
              Enter a universe on the brink of destruction.
              Discover legendary artifacts, iconic collectibles,
              and the gear inspired by Earth's mightiest heroes.
              Every relic holds power. Every choice shapes destiny.
              The multiverse awaits. ☠️🟢
            </p>

            <div className="mt-9 flex flex-wrap gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById("collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-3 rounded-xl bg-emerald-400 px-6 py-4 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-emerald-500/10 transition duration-300 hover:-translate-y-1 hover:bg-emerald-300 hover:shadow-emerald-400/20 sm:text-sm"
              >
                Explore Collection
                <ArrowDownRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"
                />
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3">
                <ShieldCheck className="text-emerald-400" size={22} />
                <div>
                  <p className="text-xs font-bold text-white">
                    Collector's Universe
                  </p>
                  <p className="mt-1 text-[10px] text-gray-500">
                    Find your next collectible
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT BRAND DESIGN */}
          <div className="relative mx-auto flex aspect-square w-full max-w-md items-center justify-center">

            <div className="absolute inset-4 rounded-full border border-emerald-400/10" />

            <div className="absolute inset-10 animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-emerald-400/20" />

            <div className="absolute inset-16 rounded-full border border-emerald-400/20 shadow-[0_0_80px_rgba(16,185,129,0.08)]" />

            <div className="absolute h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl sm:h-64 sm:w-64" />

            <div className="relative text-center">

              <Sparkles
                size={24}
                className="mx-auto mb-5 animate-pulse text-emerald-300"
              />

              <p className="text-8xl font-black tracking-tighter text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.2)] sm:text-9xl">
                RV
              </p>

              <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.5em] text-gray-400 sm:text-xs">
                Russo's View
              </p>

              <p className="mt-2 text-[9px] uppercase tracking-[0.3em] text-emerald-500/70">
                Collect Your Universe
              </p>

            </div>

            <span className="absolute right-5 top-12 h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
            <span className="absolute bottom-16 left-8 h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />

          </div>

        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section
        id="collection"
        className="mx-auto max-w-7xl px-4 py-16 sm:px-8 md:py-24"
      >

        <div className="mb-10 flex flex-col justify-between gap-5 border-b border-white/[0.08] pb-8 sm:flex-row sm:items-end">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-emerald-400" />
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-emerald-400 sm:text-xs">
                Curated for collectors
              </p>
            </div>

            <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
              THE COLLECTION
              <span className="text-emerald-400">.</span>
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-gray-500">
              Discover your favourites. Find the gear that belongs
              in your universe.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:self-auto">
            <ShoppingBag size={18} className="text-emerald-400" />
            <div>
              <p className="text-lg font-black text-white">
                {filteredProducts.length.toString().padStart(2, "0")}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-gray-500">
                Items found
              </p>
            </div>
          </div>

        </div>

        {/* LOADING STATE */}
        {loading ? (

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0b100d]"
              >
                <div className="aspect-square animate-pulse bg-white/[0.05]" />
                <div className="space-y-3 p-4">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/[0.08]" />
                  <div className="h-3 w-1/2 animate-pulse rounded bg-white/[0.05]" />
                  <div className="h-8 animate-pulse rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>

        ) : filteredProducts.length === 0 ? (

          /* EMPTY STATE */
          <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-20 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07]">
              <ShoppingBag size={30} className="text-emerald-400" />
            </div>

            <h3 className="text-xl font-black sm:text-2xl">
              No Collectibles Found
            </h3>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
              No items match your current search or category.
              Try another search to explore the collection.
            </p>

          </div>

        ) : (

          /* PRODUCT GRID */
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

            {filteredProducts.map((product) => (

              <article
                key={product._id || product.id || product.name}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0e0b] transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-400/40 hover:shadow-[0_15px_50px_rgba(16,185,129,0.07)]"
              >

                {/* PRODUCT IMAGE */}
                <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-[#111a14] via-[#0b100d] to-[#080a09] p-5">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.07),transparent_70%)]" />

                  {product.image ? (
                    <img
                      src={getImageSrc(product.image)}
                      alt={product.name || "Collectible"}
                      loading="lazy"
                      className="relative z-10 h-full w-full object-contain transition duration-500 ease-out group-hover:scale-110"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";

                        const fallback =
                          event.currentTarget.parentElement?.querySelector(
                            ".image-fallback"
                          );

                        if (fallback) {
                          fallback.classList.remove("hidden");
                        }
                      }}
                    />
                  ) : null}

                  <div
                    className={`image-fallback absolute inset-0 flex items-center justify-center ${
                      product.image ? "hidden" : ""
                    }`}
                  >
                    <ShoppingBag
                      size={44}
                      strokeWidth={1}
                      className="text-emerald-400/40"
                    />
                  </div>

                  {/* CATEGORY LABEL */}
                  <span className="absolute left-3 top-3 z-20 max-w-[calc(100%-24px)] truncate rounded-full border border-white/10 bg-black/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                    {product.category || "Collectible"}
                  </span>

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-3 sm:p-4">

                  <h3 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-gray-100 transition-colors group-hover:text-emerald-300 sm:text-base">
                    {product.name || "Unnamed Collectible"}
                  </h3>

                  <p className="mt-2 line-clamp-2 min-h-10 text-[11px] leading-5 text-gray-500 sm:text-xs">
                    {product.description ||
                      "A collectible worthy of your universe."}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] pt-4">

                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-gray-600">
                        Price
                      </p>

                      <p className="text-base font-black text-emerald-400 sm:text-lg">
                        ₹
                        {Number(product.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart?.(product)}
                      disabled={Number(product.stock ?? 1) <= 0}
                      aria-label={`Add ${product.name || "product"} to cart`}
                      className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-400 px-3 py-2.5 text-[10px] font-black uppercase tracking-wide text-black transition duration-300 hover:bg-emerald-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-800 disabled:text-gray-500 sm:text-xs"
                    >
                      {Number(product.stock ?? 1) <= 0 ? (
                        "Sold Out"
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          Add
                        </>
                      )}
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

        {/* BOTTOM BRAND STRIP */}
        {!loading && filteredProducts.length > 0 && (
          <div className="mt-12 flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald-400/10 bg-emerald-400/[0.03] px-5 py-6 text-center sm:flex-row sm:text-left">

            <p className="text-xs leading-6 text-gray-400 sm:text-sm">
              <span className="font-bold text-emerald-400">
                Russo's View
              </span>{" "}
              — Your universe. Your collection. Your legacy.
            </p>

            <button
              onClick={() =>
                document
                  .getElementById("collection")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 transition hover:text-emerald-300"
            >
              Explore Again
              <ArrowDownRight size={16} />
            </button>

          </div>
        )}

      </section>

      {/* FOOTER */}
      <footer className="relative overflow-hidden border-t border-emerald-400/10 bg-black px-5 py-9 text-center">

        <p className="text-xl font-black tracking-tight text-emerald-400">
          RUSSO'S VIEW
        </p>

        <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.3em] text-gray-600">
          Collect Your Universe
        </p>

        <div className="mx-auto my-5 h-px max-w-xs bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

        <p className="text-[10px] text-gray-600">
          © {new Date().getFullYear()} Russo's View. All rights reserved.
        </p>

      </footer>

    </main>
  );
}

export default ProductSection;
