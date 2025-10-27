"use client";
import { useShopContext } from "@/contexts/ShopContext";
import EntityGrid from "./EntityGrid";

export default function SpeciesContainer() {
  const { fetchSpecies } = useShopContext();
  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Especies</h1>
      <EntityGrid loader={fetchSpecies} kind="species" />
    </section>
  );
}
