"use client";
import { useEffect, useState } from "react";
import { useShopContext } from "@/contexts/ShopContext";

export default function CharacterForm() {
  const {
    fetchClasses,
    fetchSpecies,
    createCharacter,
  } = useShopContext();

  const [classes, setClasses] = useState([]);
  const [species, setSpecies] = useState([]);
  const [form, setForm] = useState({ name: "", level: 1, classId: "", speciesId: "", background: "" });
  const [state, setState] = useState({ loading: false, error: null, created: null });

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [cls, spc] = await Promise.all([fetchClasses(), fetchSpecies()]);
      if (mounted) {
        setClasses(cls);
        setSpecies(spc);
      }
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
      });
      setState({ loading: false, error: null, created });
      setForm({ name: "", level: 1, classId: "", speciesId: "", background: "" });
    } catch (err) {
      setState({ loading: false, error: "No se pudo crear el personaje.", created: null });
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-xl">
      <div>
        <label className="block text-sm font-medium">Nombre</label>
        <input name="name" value={form.name} onChange={onChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Nivel</label>
        <input name="level" type="number" min={1} max={20} value={form.level} onChange={onChange} className="w-full border rounded p-2" required />
      </div>
      <div>
        <label className="block text-sm font-medium">Clase</label>
        <select name="classId" value={form.classId} onChange={onChange} className="w-full border rounded p-2" required>
          <option value="">Seleccionar...</option>
          {classes.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Especie</label>
        <select name="speciesId" value={form.speciesId} onChange={onChange} className="w-full border rounded p-2" required>
          <option value="">Seleccionar...</option>
          {species.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">Trasfondo (opcional)</label>
        <textarea name="background" value={form.background} onChange={onChange} className="w-full border rounded p-2" rows={3} />
      </div>

      <button disabled={state.loading} className="px-4 py-2 rounded bg-indigo-600 text-white">
        {state.loading ? "Guardando..." : "Crear Personaje"}
      </button>

      {state.error && <p className="text-red-600">{state.error}</p>}
      {state.created && <p className="text-green-700">Personaje creado: {state.created.name}</p>}
    </form>
  );
}
