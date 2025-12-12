import { Item, LootBox, Rarity } from '@/types';
import { getRandomItemByRarity } from './data/items';

/**
 * Sistema de probabilidades para abrir cajas
 * Usa un algoritmo de ruleta ponderada
 */
export class LootBoxSystem {
  /**
   * Selecciona una rareza basada en las probabilidades de la caja
   * @param box - La caja que se está abriendo
   * @returns La rareza seleccionada
   */
  private static selectRarity(box: LootBox): Rarity {
    // Generar número aleatorio entre 0 y 100
    const random = Math.random() * 100;

    // Acumular probabilidades
    let accumulated = 0;

    for (const rarityChance of box.rarityChances) {
      accumulated += rarityChance.chance;

      if (random <= accumulated) {
        return rarityChance.rarity;
      }
    }

    // Fallback (no debería llegar aquí si las probabilidades suman 100)
    return Rarity.COMMON;
  }

  /**
   * Abre una caja y retorna un item aleatorio
   * @param box - La caja a abrir
   * @returns El item ganado o null si hay error
   */
  static openBox(box: LootBox): Item | null {
    // 1. Seleccionar rareza basada en probabilidades
    const selectedRarity = this.selectRarity(box);

    // 2. Obtener item aleatorio de esa rareza
    const item = getRandomItemByRarity(selectedRarity);

    return item;
  }

  /**
   * Simula múltiples aperturas para testing/estadísticas
   * @param box - La caja a testear
   * @param iterations - Número de veces a abrir
   * @returns Estadísticas de los resultados
   */
  static simulateOpenings(box: LootBox, iterations: number = 1000) {
    const results: Record<Rarity, number> = {
      [Rarity.COMMON]: 0,
      [Rarity.RARE]: 0,
      [Rarity.EPIC]: 0,
      [Rarity.LEGENDARY]: 0,
    };

    for (let i = 0; i < iterations; i++) {
      const item = this.openBox(box);
      if (item) {
        results[item.rarity]++;
      }
    }

    // Convertir a porcentajes
    const percentages: Record<Rarity, number> = {
      [Rarity.COMMON]: (results[Rarity.COMMON] / iterations) * 100,
      [Rarity.RARE]: (results[Rarity.RARE] / iterations) * 100,
      [Rarity.EPIC]: (results[Rarity.EPIC] / iterations) * 100,
      [Rarity.LEGENDARY]: (results[Rarity.LEGENDARY] / iterations) * 100,
    };

    return {
      raw: results,
      percentages,
      iterations,
    };
  }
}
