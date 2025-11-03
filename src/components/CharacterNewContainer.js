"use client";
import CharacterForm from "./CharacterForm";

export default function CharacterNewContainer() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl text-amber-200 mb-4">Nuevo Personaje</h1>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
        <CharacterForm />
      </div>
    </section>
  );
}
