// Enumeración de rareza de items
export enum Rarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

// Interface para un item individual
export interface Item {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  image: string;
  value: number; // Valor en coins
}

// Probabilidad de obtener cada rareza
export interface RarityChance {
  rarity: Rarity;
  chance: number; // Porcentaje (0-100)
}

// Interface para una caja/loot box
export interface LootBox {
  id: string;
  name: string;
  description: string;
  price: number; // Precio en coins
  image: string;
  availableItems: Item[]; // Items que puede contener
  rarityChances: RarityChance[]; // Probabilidades de rareza
}

// Item en el inventario del usuario
export interface InventoryItem extends Item {
  obtainedAt: string; // Timestamp
  quantity: number;
}

// Usuario del sistema
export interface User {
  id: string;
  username: string;
  coins: number; // Monedas virtuales
  inventory: InventoryItem[];
}

// Resultado de abrir una caja
export interface OpenBoxResult {
  success: boolean;
  item?: Item;
  newCoins?: number;
  message?: string;
}

// Configuración de colores para cada rareza
export const RARITY_COLORS: Record<Rarity, { bg: string; text: string; glow: string; border: string }> = {
  [Rarity.COMMON]: {
    bg: 'bg-gray-500',
    text: 'text-gray-100',
    glow: 'shadow-gray-500/50',
    border: 'border-gray-400',
  },
  [Rarity.RARE]: {
    bg: 'bg-blue-500',
    text: 'text-blue-100',
    glow: 'shadow-blue-500/50',
    border: 'border-blue-400',
  },
  [Rarity.EPIC]: {
    bg: 'bg-purple-500',
    text: 'text-purple-100',
    glow: 'shadow-purple-500/50',
    border: 'border-purple-400',
  },
  [Rarity.LEGENDARY]: {
    bg: 'bg-amber-500',
    text: 'text-amber-100',
    glow: 'shadow-amber-500/50',
    border: 'border-amber-400',
  },
};
