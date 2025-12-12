import { NextResponse } from 'next/server';
import { LOOT_BOXES } from '@/lib/data/boxes';

/**
 * GET /api/boxes
 * Obtiene todas las cajas disponibles
 */
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      boxes: LOOT_BOXES,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching boxes',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
