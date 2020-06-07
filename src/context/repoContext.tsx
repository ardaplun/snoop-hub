import React, { createContext, ReactNode, useState, useCallback } from 'react'

export interface RepoType {
  id: string;
  name: string;
  clone_url: string;
  downloads_url: string;
  description: string;
  language: string;
  updated_at: string;
}

interface InitialRepo {
  repos?: Array<RepoType>
  setRepos: (repos:Array<RepoType>) => void
}

export const RepoContext = createContext<InitialRepo>({repos:[], setRepos:()=>null});

export const RepoContextProvider = ({children}:{children: ReactNode}) => {
  const [repos, setRepos] = useState<Array<RepoType>>([]);

  let doSetRepos = useCallback((repos:Array<RepoType>) => {
    setRepos(repos)
  },[])

 return (
    <RepoContext.Provider value={{repos, setRepos: doSetRepos}}>
      {children}
    </RepoContext.Provider>
  )
}

export default RepoContextProvider