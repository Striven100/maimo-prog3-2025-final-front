"use client";
import Link from "next/link";
import { useShopContext } from "@/contexts/ShopContext";

export default function Navbar() {
  const { cartQty } = useShopContext();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800 bg-stone-950/90 backdrop-blur">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link className="font-serif text-amber-200 text-lg tracking-tight hover:text-amber-300 transition" href="/">RPG Compendium</Link>
          <div className="hidden sm:flex items-center gap-4">
            <Link href="/classes" className="text-sm text-stone-300 hover:text-amber-300 transition">Clases</Link>
            <Link href="/species" className="text-sm text-stone-300 hover:text-amber-300 transition">Especies</Link>
            <Link href="/characters" className="text-sm text-stone-300 hover:text-amber-300 transition">Personajes</Link>
          </div>
        </div>
        <div className="text-sm text-stone-400">{cartQty ? <>Items: {cartQty}</> : null}</div>
      </nav>
    </header>
  );
}
