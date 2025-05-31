
import React, { useEffect, useState, useCallback } from 'react';

// Componente hijo memoizado - solo se re-renderiza si sus props cambian superficialmente
const UserDetails = React.memo(({ user, onClickUser }) => {
  console.log(`Rendering UserDetails for ${user.name}`); // Mensaje para ver cuándo se re-renderiza el hijo
  return (
    <li key={user.id} onClick={() => onClickUser(user)}>
      {user.name} ({user.email})
    </li>
  );
});


function UserListCallback() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null); // Para demostrar el clic

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

  // Usamos useCallback para memoizar la función handleUserClick
  // Esta función solo se recreará si `activeUserId` cambia
  const handleUserClick = useCallback((user) => {
    console.log('Usuario clickeado:', user.name);
    setActiveUserId(user.id); // Cambia un estado en el padre
  }, [activeUserId]); // Dependencia: activeUserId. Si no usara activeUserId, podría ser []

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p>Error al cargar usuarios: {error.message}</p>;

  return (
    <div>
      <h1>Lista de Usuarios (useCallback)</h1>
      <p>Usuario activo ID: {activeUserId}</p> {/* Mostrar estado del padre */}
      <ul>
        {/* Pasamos la función memoizada handleUserClick al componente hijo memoizado */}
        {users.map(user => (
          <UserDetails key={user.id} user={user} onClickUser={handleUserClick} />
        ))}
      </ul>
    </div>
  );
}

export default UserListCallback