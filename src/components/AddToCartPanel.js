"use client";

import { useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

export default function AddToCartPanel({ id, name, price, image }) {
  const { addToCart } = useShopContext?.() ?? { addToCart: () => {} };
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    // Ajustá según la firma real de tu contexto
    addToCart?.({ id, name, price, image, qty });
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4">
      <div className="flex items-center gap-3">
        <label htmlFor="qty" className="text-sm text-zinc-700 dark:text-zinc-300">
          Cantidad
        </label>
        <div className="inline-flex items-center rounded-xl border border-zinc-200 dark:border-zinc-800">
          <button
            type="button"
            className="px-3 py-2 text-sm"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Disminuir"
          >
            −
          </button>
          <input
            id="qty"
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
            className="w-14 bg-transparent text-center outline-none text-sm"
          />
          <button
            type="button"
            className="px-3 py-2 text-sm"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleAdd}
        className="w-full rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-4 py-3 text-sm font-medium hover:opacity-90 transition"
      >
        Agregar al carrito
      </button>

      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        Envíos a todo el país. Cambios dentro de los 30 días.
      </p>
    </div>
  );
}
