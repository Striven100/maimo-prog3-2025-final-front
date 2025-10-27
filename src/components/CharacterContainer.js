"use client";
import { useShopContext } from "@/contexts/ShopContext";
import { useEffect, useState } from "react";

export default function CharactersContainer() {
  const { fetchCharacters } = useShopContext();
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState({ loading: true, error: null });
        const data = await fetchCharacters();
        if (mounted) setItems(data);
      } catch {
        if (mounted) setState({ loading: false, error: "Error al cargar." });
      } finally {
        if (mounted) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => { mounted = false; };
  }, [fetchCharacters]);

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Personajes</h1>
        <a href="/characters/new" className="text-indigo-600">+ Nuevo</a>
      </div>

      {state.loading && <p>Cargando...</p>}
      {state.error && <p className="text-red-600">{state.error}</p>}
      {!state.loading && !items?.length && <p>Sin personajes aún.</p>}

      <ul className="space-y-2">
        {items.map((c) => (
          <li key={c._id} className="border rounded-md p-3">
            <div className="font-semibold">{c.name} (Nivel {c.level})</div>
            <div className="text-sm text-zinc-500">
              Clase: {c.class?.name || "-"} • Especie: {c.species?.name || "-"}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
