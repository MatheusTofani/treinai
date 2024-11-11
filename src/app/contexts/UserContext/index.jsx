import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const UserContext = createContext();

// Componente que vai fornecer o valor do contexto
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null); // Inicialmente, sem usuário logado
  
  // Função para atualizar o userId
  const setUser = (id) => {
    setUserId(id);
  };

  return (
    <UserContext.Provider value={{ userId, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook customizado para usar o contexto em qualquer componente
export const useUser = () => {
  return useContext(UserContext);
};
