import React, { useState, useEffect, useContext, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotepadContext = createContext();
const NotepadProvider = ({ children }) => {
  const [notepads, setNotepads] = useState([]);

  const findNotepads = async () => {
    const result = await AsyncStorage.getItem('notepads');
    if (result !== null) setNotepads(JSON.parse(result));
  };

  useEffect(() => {
    findNotepads();
  }, []);

  return (
    <NotepadContext.Provider value={{ notepads, setNotepads, findNotepads }}>
      {children}
    </NotepadContext.Provider>
  );
};

export const useNotepads = () => useContext(NotepadContext);

export default NotepadProvider;
