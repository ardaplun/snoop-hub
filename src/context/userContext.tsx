import React, { createContext, ReactNode, useState, useCallback } from 'react'

export interface UserType {
  avatar_url: string;
  login: string;
  id: string;
}

export interface setUserType {
  items: Array<UserType>;
  total_count: string;
}

interface InitialUser {
  searchVal?: string
  setSearchVal: (value:string) => void
  users?: Array<UserType>
  totalCount?: string
  setUsers: (props:setUserType) => void
}

export const UserContext = createContext<InitialUser>({
  searchVal: '',
  setSearchVal: ()=>null,
  users: [],
  setUsers: () => null,
  totalCount: '',
});

export const UserContextProvider = ({children}:{children: ReactNode}) => {
  const [searchVal, setSearchVal] = useState<string>('');
  const [users, setUsers] = useState<Array<UserType>>([]);
  const [totalCount, setTotalCount] = useState<string>('');

  const doSetUsers = useCallback(({ items, total_count }: setUserType) => {
    setTotalCount(total_count.toString());
    setUsers(items);
  }, []);

  const doSetSearchVal = useCallback((value: string) => {
    setSearchVal(value);
  }, []);
 return (
   <UserContext.Provider value={{ searchVal, users, totalCount, setUsers: doSetUsers, setSearchVal: doSetSearchVal }}>
     {children}
   </UserContext.Provider>
 );
}

export default UserContextProvider;