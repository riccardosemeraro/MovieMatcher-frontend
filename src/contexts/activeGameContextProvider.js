import React, { createContext, useState, useContext } from 'react';

//creo il contesto
const ActiveGameContext = createContext();

//creo il provider
const ActiveGameContextProvider = ({ children }) => {

  const [value, setValue] = useState(false); 

  return (
    <ActiveGameContext.Provider value={{ value, setValue}}>
      {children}
    </ActiveGameContext.Provider>
  );
};

export { ActiveGameContext, ActiveGameContextProvider }; //esportiamo il provider e il contesto