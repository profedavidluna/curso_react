import React, { useState, useEffect } from 'react'; // Importar useEffect

async function fetchInitialPeople() {
  console.log('Fetching initial people data...');
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, name: 'Charlie', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    { id: 3, name: 'Bob', age: 35 },
  ];
}

function UserList() {
  const [filter, setFilter] = useState('');
  const [people, setPeople] = useState([]);

  console.log('Rendering PeopleListWithApiCallProperly...');

  // Usar useEffect para la llamada a la API
  useEffect(() => {
    fetchInitialPeople().then(data => {
      setPeople(data);
      console.log('People data fetched and set.'); // Para ver cuándo se actualiza el estado
    });

    // El array de dependencias vacío [] asegura que el efecto solo se ejecute una vez (en el montaje)
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    // Este cambio de estado provoca un re-render, PERO el efecto de la API no se re-ejecuta
  };

  // Aquí podrías usar useMemo para filtrar la lista `people` si el filtrado fuera costoso
  const filteredPeople = React.useMemo(() => {
    console.log('Filtering people...');
    return people.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [people, filter]); // Depende de la lista de personas y el texto del filtro

  return (
    <div>
      <h2>Lista de Personas (Llamada API Correcta con useEffect)</h2>
      <input
        type="text"
        placeholder="Escribe algo para filtrar"
        value={filter}
        onChange={handleFilterChange}
      />
      <ul>
        {filteredPeople.map(person => ( // Usar la lista filtrada
          <li key={person.id}>{person.name} ({person.age})</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;