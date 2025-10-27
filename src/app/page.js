export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold">RPG Compendium</h1>
      <p className="text-zinc-600 mt-2">Consulta Clases, Especies y crea tus Personajes.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <a className="border rounded p-4 hover:shadow-sm" href="/classes">Clases →</a>
        <a className="border rounded p-4 hover:shadow-sm" href="/species">Especies →</a>
        <a className="border rounded p-4 hover:shadow-sm" href="/characters">Personajes →</a>
      </div>
    </main>
  );
}
