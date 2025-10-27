export default function Footer() {
    const year = new Date().getFullYear();
  
    return (
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © {year} SimpleShop. Todos los derechos reservados.
          </p>
  
          <nav aria-label="Footer" className="text-sm">
            <ul className="flex flex-wrap items-center gap-4 text-zinc-700 dark:text-zinc-300">
              <li><a href="/about" className="hover:underline underline-offset-4">About</a></li>
              <li><a href="/contact" className="hover:underline underline-offset-4">Contacto</a></li>
              <li><a href="/terms" className="hover:underline underline-offset-4">Términos</a></li>
              <li><a href="/privacy" className="hover:underline underline-offset-4">Privacidad</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    );
  }
  