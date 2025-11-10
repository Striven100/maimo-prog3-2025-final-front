export default function Page() {
  const portraits = Array.from({ length: 43 }, (_, i) => `/images/portrait/${i + 1}.jpg`);
  const features = [
    { title: "Clases", desc: "Explora progresiones por nivel y competencias.", href: "/classes" },
    { title: "Especies", desc: "Rasgos únicos y afinidades de cada linaje.", href: "/species" },
    { title: "Personajes", desc: "Crea fichas combinando clase y especie.", href: "/characters" },
  ];
  const faqs = [
    { q: "¿Necesito cuenta para crear personajes?", a: "No por ahora. La creación es abierta en esta versión." },
    { q: "¿Puedo editar mis fichas luego?", a: "Sí, podrás actualizar nombre, nivel, retrato y trasfondo." },
    { q: "¿Qué reglas usa?", a: "Estructura genérica compatible con sistemas d20." },
  ];
  const testimonials = [
    { name: "M. del Valle", text: "Armar fichas dejó de ser un caos de notas y fotos. Todo está ordenado.", role: "DM" },
    { name: "S. Pereyra", text: "El selector de retratos es genial para dar identidad a cada PJ.", role: "Jugadora" },
  ];

  return (
    <main className="container mx-auto px-4 py-12 space-y-16">
      <section className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-amber-200">RPG Compendium</h1>
        <p className="text-stone-300 mt-3 text-lg">Tu grimorio digital de Clases, Especies y Personajes.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/characters" className="rounded-xl bg-amber-600 px-6 py-3 text-stone-50 font-semibold hover:bg-amber-700 transition">Crear Personaje</a>
          <a href="/classes" className="rounded-xl border border-stone-800 bg-stone-900/70 px-6 py-3 text-amber-200 font-semibold hover:bg-stone-800 transition">Ver Clases</a>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {features.map(f => (
          <a key={f.title} href={f.href} className="rounded-xl border border-stone-800 bg-stone-900/70 p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-serif text-2xl text-amber-200">{f.title}</h3>
            <p className="text-stone-300 mt-2">{f.desc}</p>
            <span className="text-amber-300 mt-4 inline-block underline underline-offset-4">Ingresar →</span>
          </a>
        ))}
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-8">
          <h2 className="font-serif text-3xl text-amber-200">Cómo funciona</h2>
          <ol className="mt-4 space-y-3 text-stone-300">
            <li className="flex gap-3"><span className="h-7 w-7 shrink-0 rounded-full bg-amber-600 text-stone-50 grid place-content-center">1</span><div><strong>Explorá</strong> clases y especies para inspirarte.</div></li>
            <li className="flex gap-3"><span className="h-7 w-7 shrink-0 rounded-full bg-amber-600 text-stone-50 grid place-content-center">2</span><div><strong>Creá</strong> tu personaje eligiendo nivel, retrato y trasfondo.</div></li>
            <li className="flex gap-3"><span className="h-7 w-7 shrink-0 rounded-full bg-amber-600 text-stone-50 grid place-content-center">3</span><div><strong>Compará</strong> rasgos y competencias para definir tu estilo.</div></li>
          </ol>
          <div className="mt-6 flex gap-3">
            <a href="/characters" className="rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-stone-50 hover:bg-amber-700 transition">Empezar ahora</a>
            <a href="/species" className="rounded-xl border border-stone-800 bg-stone-900 px-5 py-2.5 text-sm font-semibold text-amber-200 hover:bg-stone-800 transition">Ver especies</a>
          </div>
        </div>
        <div className="rounded-2xl border border-stone-800 bg-stone-900/70 p-6">
          <h3 className="font-serif text-2xl text-amber-200 mb-4">Galería de retratos</h3>
          <div className="grid gap-2 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 max-h-[420px] overflow-y-auto pr-1">
            {portraits.map(src => (
              <div key={src} className="rounded-lg border border-stone-800 bg-stone-900 p-1">
                <img src={src} alt={src} loading="lazy" className="aspect-square w-full rounded-md object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-stone-800 bg-stone-900/70 p-8">
        <h2 className="font-serif text-3xl text-amber-200">Lo que dicen</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {testimonials.map(t => (
            <div key={t.name} className="rounded-xl border border-stone-800 bg-stone-900 p-6">
              <p className="text-stone-200">{t.text}</p>
              <p className="mt-3 text-sm text-stone-400">— {t.name}, {t.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-stone-800 bg-stone-900/70 p-8">
        <h2 className="font-serif text-3xl text-amber-200">Preguntas frecuentes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {faqs.map(f => (
            <div key={f.q} className="rounded-xl border border-stone-800 bg-stone-900 p-5">
              <h4 className="font-serif text-xl text-amber-200">{f.q}</h4>
              <p className="text-stone-300 mt-2">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="text-center">
        <h2 className="font-serif text-3xl text-amber-200">Listo para forjar tu leyenda</h2>
        <p className="text-stone-300 mt-2">Crea tu primer personaje y empieza la aventura.</p>
        <div className="mt-6">
          <a href="/characters" className="rounded-xl bg-amber-600 px-6 py-3 text-stone-50 font-semibold hover:bg-amber-700 transition">Crear Personaje</a>
        </div>
      </section>
    </main>
  );
}
