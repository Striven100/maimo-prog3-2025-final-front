import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import AddToCartPanel from "@/components/AddToCartPanel";


async function getProduct({ params }) {
  const { id } = await params;
  const mock = [
    {
      id: "p1",
      name: "Camiseta Retro 90s",
      price: 34.9,
      image: "/images/dummy/remera-back.webp",
      images: [
        "/images/dummy/remera-back.webp",
        "/images/dummy/remera-back.webp",
        "/images/dummy/remera-back.webp",
       
      ],
      description:
        "Camiseta inspirada en los 90s. Algodón peinado, corte regular, liviana y respirable.",
      specs: {
        Material: "100% algodón peinado 30/1",
        Corte: "Regular fit",
        Origen: "Hecho en Argentina",
        Lavado: "Lavar con colores similares",
      },
    },
    {
      id: "p2",
      name: "Zapatillas Runner",
      price: 79.0,
      image: "/images/dummy/remera-back.webp",
      description:
        "Zapatillas livianas con buena amortiguación. Perfectas para caminar o correr.",
    },
    {
      id: "p3",
      name: "Gorra Vintage",
      price: 19.5,
      image: "/images/dummy/remera-back.webp",
      description: "Gorra curva estilo 90s. Ajustable y fresca.",
    },
    {
      id: "p4",
      name: "Buzo Oversize",
      price: 59.0,
      image: "/images/dummy/remera-back.webp",
      description: "Buzo amplio, suave y calentito.",
    },
  ];
  return mock.find((p) => p.id === id) ?? null;
}

async function getRelatedProducts(currentId) {
  const all = [
    { id: "p2", name: "Zapatillas Runner", price: 79.0, image: "/images/dummy/remera-back.webp" },
    { id: "p3", name: "Gorra Vintage", price: 19.5, image: "/images/dummy/remera-back.webp" },
    { id: "p4", name: "Buzo Oversize", price: 59.0, image: "/images/dummy/remera-back.webp" },
  ];
  return all.filter((p) => p.id !== currentId).slice(0, 3);
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-10 text-center">
            <h1 className="text-2xl font-semibold">Producto no encontrado</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Volvé a{" "}
              <Link href="/" className="underline underline-offset-4">
                la tienda
              </Link>
              .
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const related = await getRelatedProducts(product.id);
  const gallery = product.images?.length ? product.images : [product.image];

  return (
    <>
      <main className="container mx-auto px-4 py-8 md:py-10">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:underline underline-offset-4">
                Home
              </Link>
            </li>
            <li className="mx-1">/</li>
            <li>
              <Link href="/#productos" className="hover:underline underline-offset-4">
                Productos
              </Link>
            </li>
            <li className="mx-1">/</li>
            <li className="text-zinc-900 dark:text-zinc-100">{product.name}</li>
          </ol>
        </nav>

        {/* Layout principal */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Galería */}
          {/* <section>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
              <div className="relative aspect-square">
                <Image
                  src={gallery[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 50vw, 100vw"
                  priority
                />
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-3 gap-2 p-3">
                  {gallery.slice(1).map((img, idx) => (
                    <div
                      key={img + idx}
                      className="relative aspect-square overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 2}`}
                        fill
                        className="object-cover"
                        sizes="(min-width:1024px) 15vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section> */}

          {/* Info + CTA */}
          <section className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              {product.name}
            </h1>

            <p className="mt-3 text-2xl font-medium text-zinc-900 dark:text-zinc-100">
              ${product.price.toFixed(2)}
            </p>

            <p className="mt-4 text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {product.specs && (
              <div className="mt-6">
                <h2 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  Especificaciones
                </h2>
                <div className="mt-3 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-3 gap-4 p-4 text-sm">
                        <dt className="col-span-1 text-zinc-600 dark:text-zinc-400">{k}</dt>
                        <dd className="col-span-2 text-zinc-900 dark:text-zinc-100">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            <div className="mt-8">
              <AddToCartPanel
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            </div>
          </section>
        </div>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              También te puede interesar
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
