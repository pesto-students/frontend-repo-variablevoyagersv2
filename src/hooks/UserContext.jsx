import {createContext, useEffect, useState} from "react";
import axios from "axios";
import {data} from "autoprefixer";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user,setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log('userData', userData);

        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  );
}