"use client";
import { useShopContext } from "@/contexts/ShopContext";
import EntityGrid from "./EntityGrid";

export default function ClassesContainer() {
  const { fetchClasses } = useShopContext();
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-amber-200 mb-2">Clases</h1>
      <p className="text-stone-300 mb-6">Profesiones y progresiones por nivel.</p>
      <EntityGrid loader={fetchClasses} kind="classes" />
    </section>
  );
}
