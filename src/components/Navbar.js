"use client";
import Link from "next/link";
import { useShopContext } from "@/contexts/ShopContext";

export default function Navbar() {
  const { cartQty } = useShopContext(); // lo conservo por compatibilidad

  return (
    <header className="sticky top-0 z-50 bg-white/80 border-b border-zinc-100 backdrop-blur">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link className="font-semibold" href="/">RPG Compendium</Link>
          <Link href="/classes" className="text-sm text-zinc-600 hover:text-zinc-900">Clases</Link>
          <Link href="/species" className="text-sm text-zinc-600 hover:text-zinc-900">Especies</Link>
          <Link href="/characters" className="text-sm text-zinc-600 hover:text-zinc-900">Personajes</Link>
        </div>
        <div className="text-sm text-zinc-500">
          {cartQty ? <>Items: {cartQty}</> : null}
        </div>
      </nav>
    </header>
  );
}
