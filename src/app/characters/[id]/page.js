import { use } from 'react';
import CharacterDetailContainer from "@/components/CharacterDetailContainer";

export default function Page({ params }) {
  const { id } = use(params);

  if (!id) {
    return <div className="container mx-auto px-4 py-8 text-red-400">Error: ID no encontrado.</div>;
  }

  return <CharacterDetailContainer id={id} />;
}