import { Item, Rarity } from '@/types';

export const ITEMS: Item[] = [
  // COMMON ITEMS (60%)
  {
    id: 'item-1',
    name: 'Bronze Coin',
    description: 'A simple bronze coin',
    rarity: Rarity.COMMON,
    image: '🪙',
    value: 10,
  },
  {
    id: 'item-2',
    name: 'Wooden Shield',
    description: 'Basic protection equipment',
    rarity: Rarity.COMMON,
    image: '🛡️',
    value: 15,
  },
  {
    id: 'item-3',
    name: 'Iron Sword',
    description: 'A sturdy iron blade',
    rarity: Rarity.COMMON,
    image: '⚔️',
    value: 20,
  },
  {
    id: 'item-4',
    name: 'Health Potion',
    description: 'Restores minor health',
    rarity: Rarity.COMMON,
    image: '🧪',
    value: 12,
  },

  // RARE ITEMS (25%)
  {
    id: 'item-5',
    name: 'Silver Ring',
    description: 'A shiny silver ring with minor enchantments',
    rarity: Rarity.RARE,
    image: '💍',
    value: 50,
  },
  {
    id: 'item-6',
    name: 'Magic Scroll',
    description: 'Contains a powerful spell',
    rarity: Rarity.RARE,
    image: '📜',
    value: 60,
  },
  {
    id: 'item-7',
    name: 'Crystal Wand',
    description: 'Amplifies magical abilities',
    rarity: Rarity.RARE,
    image: '🪄',
    value: 75,
  },

  // EPIC ITEMS (10%)
  {
    id: 'item-8',
    name: 'Enchanted Armor',
    description: 'Legendary protection with mystical powers',
    rarity: Rarity.EPIC,
    image: '🦾',
    value: 150,
  },
  {
    id: 'item-9',
    name: 'Dragon Scale',
    description: 'A rare scale from an ancient dragon',
    rarity: Rarity.EPIC,
    image: '🐉',
    value: 200,
  },
  {
    id: 'item-10',
    name: 'Phoenix Feather',
    description: 'Grants resurrection abilities',
    rarity: Rarity.EPIC,
    image: '🪶',
    value: 180,
  },

  // LEGENDARY ITEMS (5%)
  {
    id: 'item-11',
    name: 'Crown of Kings',
    description: 'The ultimate symbol of power',
    rarity: Rarity.LEGENDARY,
    image: '👑',
    value: 500,
  },
  {
    id: 'item-12',
    name: 'Infinity Gem',
    description: 'Contains infinite cosmic power',
    rarity: Rarity.LEGENDARY,
    image: '💎',
    value: 750,
  },
  {
    id: 'item-13',
    name: 'Holy Grail',
    description: 'The most sought-after artifact',
    rarity: Rarity.LEGENDARY,
    image: '🏆',
    value: 1000,
  },
];

// Función para obtener items por rareza
export function getItemsByRarity(rarity: Rarity): Item[] {
  return ITEMS.filter(item => item.rarity === rarity);
}

// Función para obtener un item aleatorio de una rareza específica
export function getRandomItemByRarity(rarity: Rarity): Item | null {
  const items = getItemsByRarity(rarity);
  if (items.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}
