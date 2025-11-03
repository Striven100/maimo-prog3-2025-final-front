"use client";
import { useEffect, useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

function Section({ title, children }) {
  if (!children) return null;
  return (
    <section className="space-y-2">
      <h2 className="font-serif text-xl text-amber-200">{title}</h2>
      {children}
    </section>
  );
}

function Traits({ list }) {
  if (!list?.length) return null;
  const ordered = [...list].sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  return (
    <ul className="space-y-2">
      {ordered.map((t, i) => (
        <li key={i} className="rounded-lg border border-stone-800 bg-stone-900/70 p-3 text-stone-200">
          <span className="font-semibold text-amber-300">Nivel {t.level}:</span> {t.trait}
        </li>
      ))}
    </ul>
  );
}

function Proficiencies({ list }) {
  if (!list?.length) return null;
  return <ul className="list-disc pl-6 text-stone-200 space-y-1">{list.map((p, i) => <li key={i}>{p}</li>)}</ul>;
}

export default function DetailContainer({ id }) {
  const { fetchClassById, fetchSpeciesById, fetchCharacterById } = useShopContext();
  const [state, setState] = useState({ loading: true, error: null, item: null, kind: null, classData: null, speciesData: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState({ loading: true, error: null, item: null, kind: null, classData: null, speciesData: null });
        try {
          const cls = await fetchClassById(id);
          if (mounted && cls) { setState({ loading: false, error: null, item: cls, kind: "classes", classData: null, speciesData: null }); return; }
        } catch {}
        try {
          const sp = await fetchSpeciesById(id);
          if (mounted && sp) { setState({ loading: false, error: null, item: sp, kind: "species", classData: null, speciesData: null }); return; }
        } catch {}
        try {
          const char = await fetchCharacterById(id);
          if (mounted && char) {
            let classData = typeof char.class === "string" ? await fetchClassById(char.class) : char.class;
            let speciesData = typeof char.species === "string" ? await fetchSpeciesById(char.species) : char.species;
            setState({ loading: false, error: null, item: char, kind: "characters", classData, speciesData });
            return;
          }
        } catch {}
        if (mounted) setState({ loading: false, error: "No encontrado.", item: null, kind: null, classData: null, speciesData: null });
      } catch {
        if (mounted) setState({ loading: false, error: "No se pudo cargar el detalle.", item: null, kind: null, classData: null, speciesData: null });
      }
    })();
    return () => { mounted = false; };
  }, [id, fetchClassById, fetchSpeciesById, fetchCharacterById]);

  if (state.loading) return <div className="container mx-auto px-4 py-8 text-stone-300">Cargando…</div>;
  if (state.error || !state.item) return <div className="container mx-auto px-4 py-8 text-red-400">{state.error || "No encontrado."}</div>;

  const item = state.item;
  const tipo = state.kind === "classes" ? "Clase" : state.kind === "species" ? "Especie" : "Personaje";

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <button onClick={() => history.back()} className="text-sm text-amber-300 hover:text-amber-200 underline underline-offset-4">← Volver</button>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
        <h1 className="font-serif text-3xl text-amber-200">{item.name}</h1>
        <p className="mt-2 text-stone-200">{state.kind === "characters" ? <>Nivel: {item.level}</> : item.description}</p>
        <p className="mt-3 text-xs text-stone-400">{tipo} • ID: {item._id}</p>
      </div>
      {state.kind === "characters" ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
            <h2 className="font-serif text-xl text-amber-200">Clase: {state.classData?.name ?? "—"}</h2>
            {state.classData ? (
              <div className="mt-3 space-y-6">
                <p className="text-stone-200">{state.classData.description}</p>
                <Section title="Competencias"><Proficiencies list={state.classData.proficiencies} /></Section>
                <Section title="Rasgos por nivel"><Traits list={state.classData.levelTraits} /></Section>
              </div>
            ) : <p className="text-stone-400 mt-2">No disponible.</p>}
          </div>
          <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
            <h2 className="font-serif text-xl text-amber-200">Especie: {state.speciesData?.name ?? "—"}</h2>
            {state.speciesData ? (
              <div className="mt-3 space-y-6">
                <p className="text-stone-200">{state.speciesData.description}</p>
                <Section title="Competencias"><Proficiencies list={state.speciesData.proficiencies} /></Section>
                <Section title="Rasgos por nivel"><Traits list={state.speciesData.levelTraits} /></Section>
              </div>
            ) : <p className="text-stone-400 mt-2">No disponible.</p>}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md space-y-6">
          <Section title="Competencias"><Proficiencies list={item.proficiencies} /></Section>
          <Section title="Rasgos por nivel"><Traits list={item.levelTraits} /></Section>
        </div>
      )}
    </main>
  );
}
