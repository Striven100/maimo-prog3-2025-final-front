'use client'
import { useShopContext } from "@/contexts/ShopContext"
import ItemCard from "@/components/EntityCard";

const SpeciesGrid = () => {
  const { species } = useShopContext()
  return (
    <section className="container mx-auto px-4 pb-16">
      <h2 className="font-serif text-2xl text-amber-200 mb-4">Especies</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {species.map(s => (
          <ItemCard
            key={s._id}
            _id={s._id}
            title={s.name}
            subtitle={s.description}
            href={`/species/${s._id}`}
          />
        ))}
      </div>
    </section>
  )
}

export default SpeciesGrid;
