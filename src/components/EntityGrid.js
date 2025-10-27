"use client";
import { useEffect, useState } from "react";
import EntityCard from "./EntityCard";

export default function EntityGrid({ loader, kind }) {
  const [items, setItems] = useState([]);
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setState({ loading: true, error: null });
        const data = await loader();
        if (mounted) setItems(data);
      } catch (err) {
        if (mounted) setState({ loading: false, error: "Error al cargar." });
      } finally {
        if (mounted) setState((s) => ({ ...s, loading: false }));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [loader]);

  if (state.loading) return <p className="p-4">Cargando...</p>;
  if (state.error) return <p className="p-4 text-red-600">{state.error}</p>;
  if (!items?.length) return <p className="p-4">Sin resultados.</p>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <EntityCard key={it._id} entity={it} kind={kind} />
      ))}
    </div>
  );
}
