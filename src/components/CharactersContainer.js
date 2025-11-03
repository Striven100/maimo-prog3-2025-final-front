"use client";
import { useShopContext } from "@/contexts/ShopContext";
import EntityGrid from "./EntityGrid";

export default function CharactersContainer() {
  const { fetchCharacters } = useShopContext();

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl text-amber-200">Personajes</h1>
          <p className="text-stone-300">Tus combinaciones de clase y especie.</p>
        </div>
        <a href="/characters/new" className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-amber-700 transition">+ Nuevo</a>
      </div>
      <EntityGrid loader={fetchCharacters} kind="characters" />
    </section>
  );
}
