'use client';

import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface CoinShopProps {
  onPurchase: (amount: number) => void;
}

const COIN_PACKAGES = [
  { amount: 100, price: 0.99, popular: false },
  { amount: 500, price: 4.99, popular: true },
  { amount: 1000, price: 8.99, popular: false },
  { amount: 5000, price: 39.99, popular: false },
];

export default function CoinShop({ onPurchase }: CoinShopProps) {
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <Coins className="text-amber-400" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-white">Coin Shop</h2>
          <p className="text-slate-400 text-sm">Purchase coins to open more boxes!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COIN_PACKAGES.map((pkg, index) => (
          <motion.div
            key={pkg.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              relative bg-gradient-to-br from-slate-900 to-slate-950
              rounded-xl p-6 border-2 cursor-pointer
              transition-all duration-300
              ${
                pkg.popular
                  ? 'border-amber-500 shadow-lg shadow-amber-500/30'
                  : 'border-slate-700 hover:border-purple-500'
              }
            `}
            onClick={() => onPurchase(pkg.amount)}
          >
            {/* Badge de popular */}
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
            )}

            {/* Cantidad de monedas */}
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">💰</div>
              <p className="text-3xl font-bold text-white">{pkg.amount}</p>
              <p className="text-slate-500 text-sm">Coins</p>
            </div>

            {/* Precio (simulado) */}
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-400">${pkg.price}</p>
              <p className="text-slate-600 text-xs mt-1">
                ${(pkg.price / pkg.amount).toFixed(3)} per coin
              </p>
            </div>

            {/* Botón de compra */}
            <button
              className={`
                w-full mt-4 py-3 rounded-lg font-semibold
                transition-all duration-200
                ${
                  pkg.popular
                    ? 'bg-amber-500 text-white hover:bg-amber-400'
                    : 'bg-purple-600 text-white hover:bg-purple-500'
                }
              `}
            >
              Get Coins
            </button>
          </motion.div>
        ))}
      </div>

      {/* Nota de demo */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <p className="text-blue-400 text-sm text-center">
          ℹ️ <strong>Demo Mode:</strong> This is a demonstration. In production, integrate with Stripe or PayPal for real payments.
        </p>
      </div>
    </div>
  );
}
