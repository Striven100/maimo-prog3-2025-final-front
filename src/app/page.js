import Image from "next/image";
import ProductsGrid from "@/components/ProductsGrid";

const products = [
  {
    id: "p1",
    name: "Camiseta Retro 90s",
    price: 34.9,
    image: "/images/dummy/remera-back.webp",
  },
  {
    id: "p2",
    name: "Remera Homer Pez",
    price: 79.0,
    image: "/images/dummy/remera-simpsons.webp",
  },
  {
    id: "p3",
    name: "Remera Predator Enojado",
    price: 19.5,
    image: "/images/dummy/remera-predator.webp",
  },
  {
    id: "p4",
    name: "Remera Rick & Morty",
    price: 59.0,
    image: "/images/dummy/remera-rick.webp",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 text-center">
            Prog3 2025 ecommerce
            </h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-center max-w-2xl">
              Welcome to the machine  
            </p>
            <div className="mt-6">
              <a
                href="#productos"
                className="inline-flex items-center rounded-xl px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
              >
                Ver productos
              </a>
            </div>
          </div>
        </div>
      </section>
      <ProductsGrid />
    </>
  );
}
