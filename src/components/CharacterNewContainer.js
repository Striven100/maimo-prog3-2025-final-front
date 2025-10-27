"use client";
import CharacterForm from "./CharacterForm";

export default function CharacterNewContainer() {
  return (
    <section className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Nuevo Personaje</h1>
      <CharacterForm />
    </section>
  );
}
