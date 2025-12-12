'use client';

import { Item, RARITY_COLORS } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

interface ItemRevealProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ItemReveal({ item, isOpen, onClose }: ItemRevealProps) {
  if (!item) return null;

  const colors = RARITY_COLORS[item.rarity];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', duration: 0.7 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Partículas brillantes */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`absolute -inset-10 ${colors.bg} opacity-20 blur-3xl rounded-full`}
            />

            {/* Card del item */}
            <div className={`
              relative bg-gradient-to-br from-slate-900 to-slate-950
              border-4 ${colors.border} rounded-3xl p-8 w-96
              shadow-2xl ${colors.glow} shadow-lg
            `}>
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {/* Badge de rareza */}
              <div className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
                ${colors.bg} ${colors.text}
              `}>
                <Sparkles size={16} />
                <span className="font-bold uppercase text-sm tracking-wider">
                  {item.rarity}
                </span>
              </div>

              {/* Icono del item con animación */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-9xl text-center mb-6"
              >
                {item.image}
              </motion.div>

              {/* Nombre del item */}
              <h2 className="text-3xl font-bold text-white text-center mb-3">
                {item.name}
              </h2>

              {/* Descripción */}
              <p className="text-slate-400 text-center mb-6">
                {item.description}
              </p>

              {/* Valor */}
              <div className="bg-slate-800/50 rounded-xl p-4 text-center">
                <p className="text-slate-500 text-sm mb-1">Item Value</p>
                <p className="text-amber-400 font-bold text-2xl flex items-center justify-center gap-2">
                  <span>💰</span>
                  <span>{item.value}</span>
                  <span className="text-base">coins</span>
                </p>
              </div>

              {/* Botón de aceptar */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className={`
                  w-full mt-6 py-4 rounded-xl font-bold text-lg
                  ${colors.bg} ${colors.text}
                  hover:opacity-90 transition-all
                `}
              >
                Awesome! 🎉
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
