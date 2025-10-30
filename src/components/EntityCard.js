"use client";
import Link from "next/link";

export default function EntityCard({ entity, kind }) {
  const title = entity?.name || "Sin nombre";
  const subtitle =
    kind === "classes"
      ? "Clase"
      : kind === "species"
      ? "Especie"
      : "Personaje";

  const href =
    kind === "characters"
      ? null
      : `/${kind}/${entity?._id}`;

  return (
    <div className="border rounded-md p-4 hover:shadow-sm transition">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-zinc-500">{subtitle}</p>
      {href ? (
        <Link className="text-indigo-600 text-sm mt-2 inline-block" href={href}>
          Ver detalle →
        </Link>
      ) : null}
    </div>
  );
}
