import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, InventoryItem, Item } from '@/types';

interface UserStore {
  user: User | null;

  // Acciones
  initUser: (username: string) => void;
  addCoins: (amount: number) => void;
  subtractCoins: (amount: number) => boolean;
  addItemToInventory: (item: Item) => void;
  clearInventory: () => void;
  resetUser: () => void;
}

const DEFAULT_COINS = 500; // Monedas iniciales

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,

      initUser: (username: string) => {
        set({
          user: {
            id: `user-${Date.now()}`,
            username,
            coins: DEFAULT_COINS,
            inventory: [],
          },
        });
      },

      addCoins: (amount: number) => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              coins: state.user.coins + amount,
            },
          };
        });
      },

      subtractCoins: (amount: number) => {
        const state = get();
        if (!state.user || state.user.coins < amount) {
          return false; // No tiene suficientes monedas
        }

        set({
          user: {
            ...state.user,
            coins: state.user.coins - amount,
          },
        });

        return true;
      },

      addItemToInventory: (item: Item) => {
        set((state) => {
          if (!state.user) return state;

          const existingItemIndex = state.user.inventory.findIndex(
            (invItem) => invItem.id === item.id
          );

          let newInventory: InventoryItem[];

          if (existingItemIndex >= 0) {
            // Item ya existe, incrementar cantidad
            newInventory = [...state.user.inventory];
            newInventory[existingItemIndex] = {
              ...newInventory[existingItemIndex],
              quantity: newInventory[existingItemIndex].quantity + 1,
            };
          } else {
            // Nuevo item
            newInventory = [
              ...state.user.inventory,
              {
                ...item,
                obtainedAt: new Date().toISOString(),
                quantity: 1,
              },
            ];
          }

          return {
            user: {
              ...state.user,
              inventory: newInventory,
            },
          };
        });
      },

      clearInventory: () => {
        set((state) => {
          if (!state.user) return state;

          return {
            user: {
              ...state.user,
              inventory: [],
            },
          };
        });
      },

      resetUser: () => {
        set({ user: null });
      },
    }),
    {
      name: 'lootbox-user-storage', // Clave en localStorage
    }
  )
);
