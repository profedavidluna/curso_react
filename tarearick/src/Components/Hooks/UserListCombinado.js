import React, { useEffect, useState, useMemo, useCallback } from 'react';

// Componente hijo memoizado
const UserDetailsMemoCallback = React.memo(({ user, onClickUser }) => {
  console.log(`Rendering UserDetailsMemoCallback for ${user.name}`); // Mensaje para ver cuándo se re-renderiza el hijo
  return (
    <li key={user.id} onClick={() => onClickUser(user)}>
      {user.name} ({user.email})
    </li>
  );
});



function UserListCombinado() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
  const [activeUserId, setActiveUserId] = useState(null);

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

  // useMemo para la lista filtrada (cálculo)
  const filteredUsers = useMemo(() => {
    console.log('Filtrando usuarios (combinado)...');
    return users.filter(user =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [users, filter]); // Dependencias: datos originales y criterio de filtro

  // useCallback para la función de manejo de clic (función)
  // Esta función usa `activeUserId` (estado del padre) y potencialmente data de `filteredUsers`
  const handleUserClick = useCallback((user) => {
    console.log('Usuario clickeado (combinado):', user.name);
    setActiveUserId(user.id);
    // Si la función usara `filteredUsers`, también debería estar en las dependencias
    // console.log('Lista filtrada en el momento del clic:', filteredUsers);
  }, [activeUserId /*, filteredUsers si se usara */]); // Dependencia: activeUserId

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Usuarios (Combinado useMemo y useCallback)</h1>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      <p>Usuario activo ID: {activeUserId}</p>
      <ul>
        {/* Pasamos la lista memoizada y la función memoizada al hijo memoizado */}
        {filteredUsers.map(user => (
          <UserDetailsMemoCallback key={user.id} user={user} onClickUser={handleUserClick} />
        ))}
      </ul>
    </div>
  );
}

export default UserListCombinado