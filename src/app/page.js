export default function Page() {
  const portraits = Array.from({ length: 43 }, (_, i) => `/images/portrait/${i + 1}.jpg`);

  return (
    <main className="container mx-auto px-4 py-12">
      <section className="text-center mb-10">
        <h1 className="font-serif text-4xl text-amber-200">RPG Compendium</h1>
        <p className="text-stone-300 mt-3 text-lg">Consulta Clases, Especies y crea tus Personajes.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <a href="/classes" className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 text-amber-200 text-base font-semibold hover:bg-stone-800 hover:text-amber-300 transition text-center">Clases →</a>
          <a href="/species" className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 text-amber-200 text-base font-semibold hover:bg-stone-800 hover:text-amber-300 transition text-center">Especies →</a>
          <a href="/characters" className="rounded-xl border border-stone-800 bg-stone-900/70 p-5 text-amber-200 text-base font-semibold hover:bg-stone-800 hover:text-amber-300 transition text-center">Personajes →</a>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-amber-200 mb-4">Retratos</h2>
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9">
          {portraits.map((src) => (
            <div key={src} className="rounded-lg border border-stone-800 bg-stone-900/70 p-2">
              <img
                src={src}
                alt={src}
                loading="lazy"
                className="aspect-square w-full rounded-md object-cover border border-stone-800 hover:border-amber-600 transition"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
