export default function Page() {
  return (
    <main className="container mx-auto px-4 py-16 text-center">
      <h1 className="font-serif text-4xl text-amber-200">RPG Compendium</h1>
      <p className="text-stone-300 mt-3 text-lg">Consulta Clases, Especies y crea tus Personajes.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        <a href="/classes" className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 text-amber-200 text-lg font-semibold hover:bg-stone-800 hover:text-amber-300 transition">Clases →</a>
        <a href="/species" className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 text-amber-200 text-lg font-semibold hover:bg-stone-800 hover:text-amber-300 transition">Especies →</a>
        <a href="/characters" className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 text-amber-200 text-lg font-semibold hover:bg-stone-800 hover:text-amber-300 transition">Personajes →</a>
      </div>
    </main>
  );
}
