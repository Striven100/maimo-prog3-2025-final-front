"use client";
import Link from "next/link";

export default function EntityCard({ entity, kind }) {
  const title = entity?.name || "Sin nombre";
  const subtitle = kind === "classes" ? "Clase" : kind === "species" ? "Especie" : "Personaje";
  const href = `/details/${entity?._id}`;

  return (
    <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 shadow-md hover:shadow-lg transition">
      <h3 className="font-serif text-xl text-amber-200">{title}</h3>
      <p className="text-xs uppercase tracking-wider text-stone-400 mt-1">{subtitle}</p>
      {kind === "characters" && (
        <div className="text-sm text-stone-300 mt-3 space-y-1">
          <p>Nivel: {entity?.level || "-"}</p>
          <p>Clase: {entity?.class?.name || "-"}</p>
          <p>Especie: {entity?.species?.name || "-"}</p>
        </div>
      )}
      <Link className="inline-block mt-4 text-amber-300 hover:text-amber-200 underline underline-offset-4" href={href}>Ver detalle →</Link>
    </div>
  );
}
