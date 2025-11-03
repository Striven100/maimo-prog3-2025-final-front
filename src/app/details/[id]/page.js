import { use } from 'react'; // Importa use de React
import DetailContainer from "@/components/DetailContainer";

export default function Page({ params }) {
  const { id } = use(params); // Unwrap params con use()

  if (!id) {
    return <div>Error: ID no encontrado.</div>;
  }

  return <DetailContainer id={id} />;
}