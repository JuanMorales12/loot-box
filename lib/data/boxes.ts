import { LootBox, Rarity } from '@/types';
import { ITEMS } from './items';

export const LOOT_BOXES: LootBox[] = [
  {
    id: 'box-1',
    name: 'Starter Box',
    description: 'Perfect for beginners! Mostly common items.',
    price: 50,
    image: '📦',
    availableItems: ITEMS,
    rarityChances: [
      { rarity: Rarity.COMMON, chance: 70 },
      { rarity: Rarity.RARE, chance: 20 },
      { rarity: Rarity.EPIC, chance: 8 },
      { rarity: Rarity.LEGENDARY, chance: 2 },
    ],
  },
  {
    id: 'box-2',
    name: 'Premium Box',
    description: 'Better odds for rare and epic items!',
    price: 150,
    image: '🎁',
    availableItems: ITEMS,
    rarityChances: [
      { rarity: Rarity.COMMON, chance: 40 },
      { rarity: Rarity.RARE, chance: 35 },
      { rarity: Rarity.EPIC, chance: 20 },
      { rarity: Rarity.LEGENDARY, chance: 5 },
    ],
  },
  {
    id: 'box-3',
    name: 'Legendary Box',
    description: 'The ultimate box! High chance for legendary items!',
    price: 500,
    image: '🏺',
    availableItems: ITEMS,
    rarityChances: [
      { rarity: Rarity.COMMON, chance: 10 },
      { rarity: Rarity.RARE, chance: 30 },
      { rarity: Rarity.EPIC, chance: 40 },
      { rarity: Rarity.LEGENDARY, chance: 20 },
    ],
  },
];

export function getBoxById(id: string): LootBox | undefined {
  return LOOT_BOXES.find(box => box.id === id);
}
