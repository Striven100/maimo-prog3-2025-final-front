import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:shadow-sm transition">
      {/* <div className="relative aspect-[4/3]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          priority={false}
        />
      </div> */}

      <div className="p-4">
        <h3 className="font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
          {product.name}
        </h3>
        <h4>Price: {product.price}</h4>
        {/* <p className="mt-1 text-zinc-600 dark:text-zinc-400">${product.price.toFixed(2)}</p> */}

        <div className="mt-4 flex gap-2">
          <Link
          href={`products/${product._id}`}
            className="flex-1 text-center rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-2 text-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition"
            type="button"
          >
            Ver
          </Link>
          <button
            className="flex-1 rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-3 py-2 text-sm hover:opacity-90 transition"
            type="button"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
