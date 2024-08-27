import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ConfettiState {
   isConfetti: boolean
   setConfetti: (value: boolean) => void
}

export const useConfettiStore = create<ConfettiState>()(
   devtools(
      persist(
         (set) => ({
            isConfetti: false,
            setConfetti: (isConfetti: boolean) => set({ isConfetti }),
         }),
         {
            name: 'confetti-storage',
         }
      ),
      { enabled: false }
   )
)
