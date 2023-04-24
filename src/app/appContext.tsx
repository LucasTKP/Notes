import {createContext} from 'react';
import { DataUser, ContextUser } from '../types/interfaces' 
const AppContext = createContext<ContextUser>({
  dataUser:undefined,
  setDataUser: () => {}
})

  interface AllContextType{
    dataUser: DataUser,
    setDataUser:(dataUser: DataUser) => void;
  };

 export default AppContext;