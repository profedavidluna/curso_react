import React, { useEffect, useState, useMemo } from 'react';

function UserListMemo() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(''); // Estado para el filtro

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  // Usamos useMemo para memoizar la lista de usuarios filtrados
  // El cálculo (filtrar) solo se ejecutará si `users` o `filter` cambian
  const filteredUsers = useMemo(() => {
    console.log('Filtrando usuarios...'); // Mensaje para ver cuándo se ejecuta el cálculo
    return users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]); // Dependencias: users (datos de la API) y filter (estado del input) [21, 23]

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Usuarios (useMemo)</h1>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <ul>
        {/* Renderizamos la lista filtrada memoizada */}
        {filteredUsers.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserListMemo;