import { NextRequest, NextResponse } from 'next/server';
import { getBoxById } from '@/lib/data/boxes';
import { LootBoxSystem } from '@/lib/lootbox-system';
import { OpenBoxResult } from '@/types';

/**
 * POST /api/boxes/open
 * Abre una caja y retorna el item ganado
 * Body: { boxId: string, userCoins: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { boxId, userCoins } = body;

    // Validar datos
    if (!boxId || typeof userCoins !== 'number') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid request. boxId and userCoins are required.',
        } as OpenBoxResult,
        { status: 400 }
      );
    }

    // Buscar la caja
    const box = getBoxById(boxId);

    if (!box) {
      return NextResponse.json(
        {
          success: false,
          message: 'Box not found',
        } as OpenBoxResult,
        { status: 404 }
      );
    }

    // Verificar que el usuario tenga suficientes monedas
    if (userCoins < box.price) {
      return NextResponse.json(
        {
          success: false,
          message: `Insufficient coins. You need ${box.price} coins but only have ${userCoins}.`,
        } as OpenBoxResult,
        { status: 400 }
      );
    }

    // Abrir la caja
    const item = LootBoxSystem.openBox(box);

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: 'Error opening box. Please try again.',
        } as OpenBoxResult,
        { status: 500 }
      );
    }

    // Calcular nuevas monedas
    const newCoins = userCoins - box.price;

    return NextResponse.json({
      success: true,
      item,
      newCoins,
      message: `You got a ${item.rarity} item: ${item.name}!`,
    } as OpenBoxResult);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as OpenBoxResult,
      { status: 500 }
    );
  }
}
