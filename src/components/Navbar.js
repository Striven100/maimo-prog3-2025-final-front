"use client";

import Link from "next/link";
import { useShopContext } from "@/contexts/ShopContext";

export default function Navbar() {
  const { cartQty } = useShopContext();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-950/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-zinc-100 dark:border-zinc-800">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            Modo Berserk
          </Link>
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            beta
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
          <li>
            <Link href="/about" className="hover:underline underline-offset-4">
              About
            </Link>
          </li>
          <li>
            <a href="#productos" className="hover:underline underline-offset-4">
              Productos
            </a>
          </li>
          <li>
            <a href="#productos" className="hover:underline underline-offset-4">
              Categorías
            </a>
          </li>
          <li>
            <Link href="/contact" className="hover:underline underline-offset-4">
              Contacto
            </Link>
          </li>
        </ul>

        <Link
          href="/checkout"
          className="inline-flex items-center gap-2 text-sm rounded-xl border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
        >
          <span className="i-lucide-shopping-cart" aria-hidden />
          <span>Carrito</span>
          <span className="ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 text-xs px-1">
            {cartQty()}
          </span>
        </Link>
      </nav>
    </header>
  );
}
