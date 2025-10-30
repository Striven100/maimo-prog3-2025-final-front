"use client";
import { createContext, useContext, useCallback, useMemo, useState } from "react";
import axios from "axios";

const ShopContext = createContext();
export const useShopContext = () => useContext(ShopContext);

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function ShopProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ===== CLASSES ===== */
  const fetchClasses = useCallback(async () => {
    const { data } = await axios.get(`${API}/classes`);
    return data.items || [];
  }, []);

  const fetchClassById = useCallback(async (id) => {
    const { data } = await axios.get(`${API}/classes/${id}`);
    return data.item;
  }, []);

  /* ===== SPECIES ===== */
  const fetchSpecies = useCallback(async () => {
    const { data } = await axios.get(`${API}/species`);
    return data.items || [];
  }, []);

  const fetchSpeciesById = useCallback(async (id) => {
    const { data } = await axios.get(`${API}/species/${id}`);
    return data.item;
  }, []);

  /* ===== CHARACTERS ===== */
  const fetchCharacters = useCallback(async () => {
    const { data } = await axios.get(`${API}/characters`);
    return data.items || [];
  }, []);

  const fetchCharacterById = useCallback(async (id) => {
    const { data } = await axios.get(`${API}/characters/${id}`);
    return data.item;
  }, []);

  const createCharacter = useCallback(async (payload) => {
    const { data } = await axios.post(`${API}/characters`, payload);
    return data.item;
  }, []);

  const value = useMemo(
    () => ({
      loading,
      error,
      fetchClasses,
      fetchClassById,
      fetchSpecies,
      fetchSpeciesById,
      fetchCharacters,
      fetchCharacterById,
      createCharacter,
      cartQty: 0,
    }),
    [
      loading,
      error,
      fetchClasses,
      fetchClassById,
      fetchSpecies,
      fetchSpeciesById,
      fetchCharacters,
      fetchCharacterById,
      createCharacter,
    ]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}
