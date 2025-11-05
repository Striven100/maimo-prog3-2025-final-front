"use client";
import { useEffect, useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

export default function CharacterDetailContainer({ id }) {
  const { fetchCharacterById, fetchClassById, fetchSpeciesById } = useShopContext();
  const [state, setState] = useState({ loading: true, error: null, item: null, classData: null, speciesData: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState({ loading: true, error: null, item: null, classData: null, speciesData: null });
        const char = await fetchCharacterById(id);
        if (mounted) {
          const classId = typeof char.class === "string" ? char.class : char.class?._id;
          const speciesId = typeof char.species === "string" ? char.species : char.species?._id;
          
          let classData = null;
          let speciesData = null;
          
          if (classId) {
            try {
              classData = await fetchClassById(classId);
            } catch (err) {
              console.error("Error fetching class:", err);
            }
          }
          
          if (speciesId) {
            try {
              speciesData = await fetchSpeciesById(speciesId);
            } catch (err) {
              console.error("Error fetching species:", err);
            }
          }
          
          setState({ loading: false, error: null, item: char, classData, speciesData });
        }
      } catch {
        if (mounted) setState({ loading: false, error: "No se pudo cargar el personaje.", item: null, classData: null, speciesData: null });
      }
    })();
    return () => { mounted = false; };
  }, [id, fetchCharacterById, fetchClassById, fetchSpeciesById]);

  if (state.loading) return <div className="container mx-auto px-4 py-8 text-stone-300">Cargando…</div>;
  if (state.error || !state.item) return <div className="container mx-auto px-4 py-8 text-red-400">{state.error || "Personaje no encontrado."}</div>;

  const item = state.item;

  const combinedTraits = [];
  if (state.classData?.levelTraits) {
    combinedTraits.push(...state.classData.levelTraits.map(t => ({ ...t, source: "Clase" })));
  }
  if (state.speciesData?.levelTraits) {
    combinedTraits.push(...state.speciesData.levelTraits.map(t => ({ ...t, source: "Especie" })));
  }
  combinedTraits.sort((a, b) => (a.level ?? 0) - (b.level ?? 0));

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <button onClick={() => history.back()} className="text-sm text-amber-300 hover:text-amber-200 underline underline-offset-4">← Volver</button>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
        <div className="flex items-center space-x-4">
          {item.portrait && (
            <img
              src={item.portrait}
              alt={`Retrato de ${item.name}`}
              className="w-16 h-16 rounded-md border border-stone-800 object-cover"
            />
          )}
          <div>
            <h1 className="font-serif text-3xl text-amber-200">{item.name}</h1>
            <h3 className="font-serif text-1xl text-stone-200">{item.background}</h3>
            <p className="mt-2 text-stone-200">Nivel: {item.level}</p>
            <p className="mt-3 text-xs text-stone-400">Personaje • ID: {item._id}</p>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-md">
        <h2 className="font-serif text-xl text-amber-200">Clase y Especie</h2>
        {state.classData || state.speciesData ? (
          <div className="mt-3 space-y-6">
            {state.classData && (
              <div>
                <h3 className="font-serif text-lg text-amber-300">Clase: {state.classData.name}</h3>
                <p className="text-stone-200 mt-1">{state.classData.description}</p>
              </div>
            )}
            {state.speciesData && (
              <div>
                <h3 className="font-serif text-lg text-amber-300">Especie: {state.speciesData.name}</h3>
                <p className="text-stone-200 mt-1">{state.speciesData.description}</p>
              </div>
            )}
            {(state.classData?.proficiencies?.length > 0 || state.speciesData?.proficiencies?.length > 0) && (
              <div>
                <h3 className="font-serif text-xl text-amber-200">Competencias</h3>
                <ul className="list-disc pl-6 text-stone-200 space-y-1 mt-2">
                  {state.classData?.proficiencies?.map((p, i) => <li key={`class-${i}`}>{p}</li>)}
                  {state.speciesData?.proficiencies?.map((p, i) => <li key={`species-${i}`}>{p}</li>)}
                </ul>
              </div>
            )}
            {combinedTraits.length > 0 && (
              <div>
                <h3 className="font-serif text-xl text-amber-200">Rasgos por nivel</h3>
                <ul className="space-y-2 mt-2">
                  {combinedTraits.map((t, i) => (
                    <li key={i} className="rounded-lg border border-stone-800 bg-stone-900/70 p-3 text-stone-200">
                      <span className="font-semibold text-amber-300">Nivel {t.level}:</span> {t.trait} <span className="text-xs text-stone-400">({t.source})</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : <p className="text-stone-400 mt-2">No disponible.</p>}
      </div>
    </main>
  );
}