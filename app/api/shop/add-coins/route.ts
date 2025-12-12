import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/shop/add-coins
 * Simula la compra de monedas (en producción integrarías Stripe/PayPal)
 * Body: { amount: number }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = body;

    // Validar
    if (!amount || amount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid amount',
        },
        { status: 400 }
      );
    }

    // En producción, aquí procesarías el pago real
    // Por ahora, simplemente retornamos success

    return NextResponse.json({
      success: true,
      coinsAdded: amount,
      message: `Successfully added ${amount} coins!`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing purchase',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
