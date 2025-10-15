import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface MenuState {
   active: boolean
   setActive: (_value: boolean) => void
}

export const useMenuStore = create<MenuState>()(
   devtools(
      (set) => ({
         active: false,
         setActive: (active: boolean) => set({ active }),
      }),
      { enabled: false }
   )
)
