'use client'
import { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react'

type Props = {
   children: ReactNode
}

interface contextProps {
   value: string
   setValue: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<contextProps>({
   value: 'light',
   setValue: () => {},
})

export const GlobalProvider = ({ children }: Props) => {
   const [value, setValue] = useState('light')

   return (
      <GlobalContext.Provider
         value={{
            value,
            setValue,
         }}
      >
         {children}
      </GlobalContext.Provider>
   )
}

export const useGlobalContext = () => useContext(GlobalContext)
