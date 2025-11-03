export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-800 bg-stone-950">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-stone-300">© {year} RPG Compendium. Todos los derechos reservados.</p>
        <nav aria-label="Footer" className="text-sm">
          <ul className="flex flex-wrap items-center gap-4 text-stone-300">
            <li><a href="/about" className="hover:text-amber-300 transition">About</a></li>
            <li><a href="/contact" className="hover:text-amber-300 transition">Contacto</a></li>
            <li><a href="/terms" className="hover:text-amber-300 transition">Términos</a></li>
            <li><a href="/privacy" className="hover:text-amber-300 transition">Privacidad</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
