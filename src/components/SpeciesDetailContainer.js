"use client";
import { useEffect, useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

export default function SpeciesDetailContainer({ id }) {
  const { fetchSpeciesById } = useShopContext();
  const [state, setState] = useState({ loading: true, error: null, item: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState({ loading: true, error: null, item: null });
        const sp = await fetchSpeciesById(id);
        if (mounted) setState({ loading: false, error: null, item: sp });
      } catch {
        if (mounted) setState({ loading: false, error: "No se pudo cargar la especie.", item: null });
      }
    })();
    return () => { mounted = false; };
  }, [id, fetchSpeciesById]);

  if (state.loading) return <div className="container mx-auto px-4 py-8 text-stone-300">Cargando…</div>;
  if (state.error || !state.item) return <div className="container mx-auto px-4 py-8 text-red-400">{state.error || "Especie no encontrada."}</div>;

  const item = state.item;

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <button onClick={() => history.back()} className="text-sm text-amber-300 hover:text-amber-200 underline underline-offset-4">← Volver</button>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
        <h1 className="font-serif text-3xl text-amber-200">{item.name}</h1>
        <p className="mt-2 text-stone-200">{item.description}</p>
        <p className="mt-3 text-xs text-stone-400">Especie • ID: {item._id}</p>
      </div>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md space-y-6">
        {item.proficiencies?.length > 0 && (
          <div>
            <h3 className="font-serif text-xl text-amber-200">Competencias</h3>
            <ul className="list-disc pl-6 text-stone-200 space-y-1 mt-2">{item.proficiencies.map((p, i) => <li key={i}>{p}</li>)}</ul>
          </div>
        )}
        {item.levelTraits?.length > 0 && (
          <div>
            <h3 className="font-serif text-xl text-amber-200">Rasgos por nivel</h3>
            <ul className="space-y-2 mt-2">
              {[...item.levelTraits].sort((a, b) => (a.level ?? 0) - (b.level ?? 0)).map((t, i) => (
                <li key={i} className="rounded-lg border border-stone-800 bg-stone-900/70 p-3 text-stone-200">
                  <span className="font-semibold text-amber-300">Nivel {t.level}:</span> {t.trait}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}