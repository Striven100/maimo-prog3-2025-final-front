"use client";
import { useEffect, useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

export default function CharacterForm() {
  const { fetchClasses, fetchSpecies, createCharacter } = useShopContext();
  const [classes, setClasses] = useState([]);
  const [species, setSpecies] = useState([]);
  const [form, setForm] = useState({ name: "", level: 1, classId: "", speciesId: "", background: "", portrait: "" });
  const [state, setState] = useState({ loading: false, error: null, created: null });
  const [pickerOpen, setPickerOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [cls, spc] = await Promise.all([fetchClasses(), fetchSpecies()]);
      if (mounted) { setClasses(cls); setSpecies(spc); }
    })();
    return () => { mounted = false; };
  }, [fetchClasses, fetchSpecies]);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setState({ loading: true, error: null, created: null });
      const created = await createCharacter({
        name: form.name,
        level: Number(form.level),
        classId: form.classId,
        speciesId: form.speciesId,
        background: form.background,
        portrait: form.portrait,
      });
      setState({ loading: false, error: null, created });
      setForm({ name: "", level: 1, classId: "", speciesId: "", background: "", portrait: "" });
      setPickerOpen(false);
    } catch {
      setState({ loading: false, error: "No se pudo crear el personaje.", created: null });
    }
  };

  const portraits = Array.from({ length: 43 }, (_, i) => `/images/portrait/${i + 1}.jpg`);
  const pick = (src) => { setForm(f => ({ ...f, portrait: src })); setPickerOpen(false); };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-stone-200">Nombre</label>
          <input name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-200">Nivel</label>
          <input name="level" type="number" min={1} max={20} value={form.level} onChange={onChange} className="mt-1 w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600" required />
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-200">Clase</label>
          <select name="classId" value={form.classId} onChange={onChange} className="mt-1 w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600" required>
            <option value="">Seleccionar...</option>
            {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-stone-200">Especie</label>
          <select name="speciesId" value={form.speciesId} onChange={onChange} className="mt-1 w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-600" required>
            <option value="">Seleccionar...</option>
            {species.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-stone-200">Retrato</label>
          <div className="mt-2 flex items-center gap-4">
            {form.portrait ? <img src={form.portrait} alt="Portrait" className="h-20 w-20 rounded-md ring-2 ring-amber-600 object-cover" /> : <div className="h-20 w-20 rounded-md border border-stone-700 bg-stone-800" />}
            <button type="button" onClick={() => setPickerOpen(true)} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-amber-700 transition">Elegir retrato</button>
            {form.portrait && <button type="button" onClick={() => setForm(f => ({ ...f, portrait: "" }))} className="rounded-md border border-stone-700 px-3 py-2 text-sm font-medium text-stone-200 hover:bg-stone-800 transition">Quitar</button>}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold text-stone-200">Trasfondo (opcional)</label>
          <textarea name="background" value={form.background} onChange={onChange} rows={4} className="mt-1 w-full rounded-md border border-stone-700 bg-stone-800 px-3 py-2 text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button disabled={state.loading} className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-50 hover:bg-amber-700 disabled:opacity-70 transition">
          {state.loading ? "Guardando..." : "Crear Personaje"}
        </button>
        {state.error && <p className="text-sm text-red-400">{state.error}</p>}
        {state.created && <p className="text-sm text-emerald-400">Creado: {state.created.name}</p>}
      </div>

      {pickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/80 p-4">
          <div className="w-full max-w-4xl rounded-xl border border-stone-800 bg-stone-900 p-4 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-serif text-xl text-amber-200">Elegir retrato</h3>
              <button onClick={() => setPickerOpen(false)} className="rounded-md border border-stone-700 px-3 py-1.5 text-sm text-stone-200 hover:bg-stone-800">Cerrar</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {portraits.map(src => (
                  <button key={src} type="button" onClick={() => pick(src)} className="group relative rounded-md overflow-hidden border border-stone-700 hover:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600">
                    <img src={src} alt={src} className="h-24 w-full object-cover" />
                    <span className="absolute inset-0 ring-0 group-hover:ring-2 ring-amber-600 pointer-events-none"></span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
