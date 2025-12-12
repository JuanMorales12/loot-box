'use client';

import { LootBox } from '@/types';
import { motion } from 'framer-motion';

interface LootBoxCardProps {
  box: LootBox;
  onOpen: (box: LootBox) => void;
  disabled?: boolean;
  userCoins: number;
}

export default function LootBoxCard({ box, onOpen, disabled, userCoins }: LootBoxCardProps) {
  const canAfford = userCoins >= box.price;

  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        relative bg-gradient-to-br from-slate-800 to-slate-900
        rounded-2xl p-6 border-2 border-slate-700
        shadow-xl transition-all duration-300
        ${!disabled && canAfford ? 'hover:border-purple-500 hover:shadow-purple-500/30' : ''}
        ${disabled || !canAfford ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onClick={() => !disabled && canAfford && onOpen(box)}
    >
      {/* Indicador de no poder comprar */}
      {!canAfford && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Not enough coins
        </div>
      )}

      {/* Icono de la caja */}
      <div className="text-7xl mb-4 text-center animate-float">
        {box.image}
      </div>

      {/* Nombre */}
      <h3 className="text-2xl font-bold text-white mb-2 text-center">
        {box.name}
      </h3>

      {/* Descripción */}
      <p className="text-slate-400 text-sm mb-4 text-center min-h-[40px]">
        {box.description}
      </p>

      {/* Probabilidades */}
      <div className="bg-slate-950/50 rounded-lg p-3 mb-4">
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wide">Drop Rates:</p>
        <div className="space-y-1">
          {box.rarityChances.map((chance) => (
            <div key={chance.rarity} className="flex justify-between items-center">
              <span className="text-xs text-slate-300 capitalize">{chance.rarity}</span>
              <span className="text-xs font-semibold text-purple-400">{chance.chance}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Precio */}
      <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/20 to-amber-600/20 rounded-lg p-3">
        <span className="text-amber-300 font-semibold flex items-center gap-2">
          <span className="text-xl">💰</span>
          <span>{box.price} Coins</span>
        </span>
        <button
          disabled={disabled || !canAfford}
          className={`
            px-4 py-2 rounded-lg font-semibold text-sm transition-all
            ${
              disabled || !canAfford
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-500 active:scale-95'
            }
          `}
        >
          Open
        </button>
      </div>
    </motion.div>
  );
}
