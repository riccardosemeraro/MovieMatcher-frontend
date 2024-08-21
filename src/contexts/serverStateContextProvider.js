import React, { createContext, useState, useContext } from 'react';

//creo il contesto
const ServerStateContext = createContext();

//creo il provider
const ServerStateContextProvider = ({ children }) => {

  const [value, setValue] = useState(false); 
  //vedere di implementare un localstorage, cookie o sessionstorage per salvare lo stato del server in caso di refresh della pagina

  return (
    <ServerStateContext.Provider value={{ value, setValue}}>
      {children}
    </ServerStateContext.Provider>
  );
};

export { ServerStateContextProvider, ServerStateContext }; //esportiamo il provider e il contesto