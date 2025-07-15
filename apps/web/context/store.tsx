'use client'
import {
   createContext,
   useState,
   useContext,
   ReactNode,
   Dispatch,
   SetStateAction,
   useMemo,
   memo,
} from 'react'

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

// Memoized GlobalProvider to prevent unnecessary re-renders
export const GlobalProvider = memo<Props>(({ children }) => {
   const [value, setValue] = useState('light')

   // Memoize context value to prevent recreation on every render
   const contextValue = useMemo(
      () => ({
         value,
         setValue,
      }),
      [value]
   )

   return (
      <GlobalContext.Provider value={contextValue}>
         {children}
      </GlobalContext.Provider>
   )
})

GlobalProvider.displayName = 'GlobalProvider'

export const useGlobalContext = () => useContext(GlobalContext)
