'use client';

import { InventoryItem, RARITY_COLORS } from '@/types';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface InventoryProps {
  items: InventoryItem[];
}

export default function Inventory({ items }: InventoryProps) {
  // Ordenar por rareza (legendario primero) y luego por fecha
  const sortedItems = [...items].sort((a, b) => {
    const rarityOrder = ['legendary', 'epic', 'rare', 'common'];
    const rarityDiff = rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);

    if (rarityDiff !== 0) return rarityDiff;

    return new Date(b.obtainedAt).getTime() - new Date(a.obtainedAt).getTime();
  });

  // Calcular valor total del inventario
  const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  if (items.length === 0) {
    return (
      <div className="bg-slate-800/50 rounded-2xl p-12 text-center">
        <Package className="mx-auto mb-4 text-slate-600" size={64} />
        <p className="text-slate-500 text-lg">Your inventory is empty</p>
        <p className="text-slate-600 text-sm mt-2">Open some boxes to get items!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Estadísticas del inventario */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-500 text-sm mb-1">Total Items</p>
          <p className="text-white text-2xl font-bold">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-500 text-sm mb-1">Unique Items</p>
          <p className="text-white text-2xl font-bold">{items.length}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-500 text-sm mb-1">Total Value</p>
          <p className="text-amber-400 text-2xl font-bold flex items-center gap-1">
            <span className="text-lg">💰</span>
            {totalValue}
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-500 text-sm mb-1">Legendary Items</p>
          <p className="text-amber-400 text-2xl font-bold">
            {items.filter(item => item.rarity === 'legendary').reduce((sum, item) => sum + item.quantity, 0)}
          </p>
        </div>
      </div>

      {/* Grid de items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedItems.map((item, index) => {
          const colors = RARITY_COLORS[item.rarity];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`
                relative bg-gradient-to-br from-slate-800 to-slate-900
                rounded-xl p-4 border-2 ${colors.border}
                ${colors.glow} shadow-md
                hover:scale-105 transition-transform duration-200
              `}
            >
              {/* Badge de cantidad */}
              {item.quantity > 1 && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  x{item.quantity}
                </div>
              )}

              {/* Badge de rareza */}
              <div className={`
                inline-block px-2 py-1 rounded-md text-xs font-bold mb-2
                ${colors.bg} ${colors.text}
              `}>
                {item.rarity.toUpperCase()}
              </div>

              {/* Icono */}
              <div className="text-5xl text-center mb-2">
                {item.image}
              </div>

              {/* Nombre */}
              <h4 className="text-white font-semibold text-sm text-center mb-1">
                {item.name}
              </h4>

              {/* Valor */}
              <p className="text-amber-400 text-xs text-center flex items-center justify-center gap-1">
                <span>💰</span>
                <span>{item.value * item.quantity}</span>
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
