import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue); 
// Usa el hook useState internamente

  return [
    { value, onChange: e => setValue(e.target.value) }, // Devuelve un objeto de props para el input
    () => setValue(initialValue) // Devuelve una función para resetear el valor
  ];
};
