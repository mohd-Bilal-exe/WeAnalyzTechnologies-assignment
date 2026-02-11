import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { TicketData } from '../types/tickets';
import type { User } from '../types/Users';

interface TicketStore {
  ticketsData: TicketData | null;
  updateTickets: (newTicketsData: TicketData) => void;
  clearTickets: () => void;
  user: User | null;
}

const useZustand = create<TicketStore>()(
  persist(
    set => ({
      ticketsData: null,
      updateTickets: newTicketsData =>
        set(state => ({
          ticketsData: {
            ...state.ticketsData,
            ...newTicketsData,
          },
        })),
      user: null,
      updateUser: (newUser: User) =>
        set({
          user: newUser,
        }),
      clearTickets: () => set({ ticketsData: null }),
    }),
    {
      name: 'weAnalyzStorage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useZustand;
