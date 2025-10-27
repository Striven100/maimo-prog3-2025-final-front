'use client'

import { useShopContext } from "@/contexts/ShopContext"
import ProductCard from "@/components/ProductCard";


const ProductsGrid = () => {
    const {products} = useShopContext()

  return (
    <section id="productos" className="container mx-auto px-4 pb-16">
        <h2 className="sr-only">Productos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>
  )
}

export default ProductsGrid