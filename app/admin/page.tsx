'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LOOT_BOXES } from '@/lib/data/boxes';
import { ITEMS } from '@/lib/data/items';
import { LootBoxSystem } from '@/lib/lootbox-system';
import { RARITY_COLORS, Rarity } from '@/types';
import { Settings, BarChart3, Box, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimulationResults {
  raw: Record<Rarity, number>;
  percentages: Record<Rarity, number>;
  iterations: number;
}

export default function AdminPage() {
  const [selectedBoxId, setSelectedBoxId] = useState(LOOT_BOXES[0].id);
  const [simulations, setSimulations] = useState<SimulationResults | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const selectedBox = LOOT_BOXES.find(b => b.id === selectedBoxId);

  const runSimulation = () => {
    if (!selectedBox) return;

    setIsSimulating(true);

    // Simular en un setTimeout para no bloquear la UI
    setTimeout(() => {
      const results = LootBoxSystem.simulateOpenings(selectedBox, 10000);
      setSimulations(results);
      setIsSimulating(false);
    }, 100);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4">
              <Settings size={40} className="text-white" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
                <p className="text-red-100">Manage loot boxes, items, and view statistics</p>
              </div>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Panel izquierdo: Items disponibles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-slate-700"
          >
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Available Items</h2>
            </div>

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {Object.values(Rarity).map((rarity) => {
                const itemsOfRarity = ITEMS.filter(item => item.rarity === rarity);
                const colors = RARITY_COLORS[rarity];

                return (
                  <div key={rarity} className="space-y-2">
                    <h3 className={`
                      text-sm font-bold uppercase tracking-wide px-3 py-1 rounded-md inline-block
                      ${colors.bg} ${colors.text}
                    `}>
                      {rarity} ({itemsOfRarity.length})
                    </h3>

                    <div className="grid grid-cols-2 gap-2">
                      {itemsOfRarity.map((item) => (
                        <div
                          key={item.id}
                          className={`
                            bg-slate-900 rounded-lg p-3 border-2 ${colors.border}
                            ${colors.glow} shadow-sm
                          `}
                        >
                          <div className="text-3xl text-center mb-1">{item.image}</div>
                          <p className="text-white text-xs font-semibold text-center mb-1">
                            {item.name}
                          </p>
                          <p className="text-amber-400 text-xs text-center flex items-center justify-center gap-1">
                            <span>💰</span>
                            {item.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Panel derecho: Simulador y estadísticas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Selector de caja */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-slate-700">
              <div className="flex items-center gap-3 mb-6">
                <Box className="text-blue-400" size={28} />
                <h2 className="text-2xl font-bold text-white">Loot Boxes</h2>
              </div>

              <div className="space-y-3">
                {LOOT_BOXES.map((box) => (
                  <button
                    key={box.id}
                    onClick={() => setSelectedBoxId(box.id)}
                    className={`
                      w-full text-left p-4 rounded-xl transition-all
                      ${
                        selectedBoxId === box.id
                          ? 'bg-purple-600 border-2 border-purple-400'
                          : 'bg-slate-900 border-2 border-slate-700 hover:border-purple-500'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{box.image}</span>
                        <div>
                          <p className="text-white font-semibold">{box.name}</p>
                          <p className="text-slate-400 text-sm">{box.description}</p>
                        </div>
                      </div>
                      <div className="text-amber-400 font-bold">
                        💰 {box.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulador */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border-2 border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <BarChart3 className="text-green-400" size={28} />
                  <h2 className="text-2xl font-bold text-white">Probability Simulator</h2>
                </div>
                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className={`
                    px-4 py-2 rounded-lg font-semibold transition-all
                    ${
                      isSimulating
                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-500'
                    }
                  `}
                >
                  {isSimulating ? 'Simulating...' : 'Run 10,000 Simulations'}
                </button>
              </div>

              {selectedBox && (
                <div className="space-y-4">
                  <div className="bg-slate-950/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Expected Drop Rates:</h3>
                    <div className="space-y-2">
                      {selectedBox.rarityChances.map((chance) => {
                        const colors = RARITY_COLORS[chance.rarity];
                        return (
                          <div key={chance.rarity} className="flex items-center justify-between">
                            <span className={`
                              capitalize px-3 py-1 rounded-md text-sm font-semibold
                              ${colors.bg} ${colors.text}
                            `}>
                              {chance.rarity}
                            </span>
                            <span className="text-white font-bold">{chance.chance}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {simulations && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-950/50 rounded-lg p-4"
                    >
                      <h3 className="text-white font-semibold mb-3">
                        Actual Results (10,000 openings):
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(simulations.percentages).map(([rarity, percentage]) => {
                          const colors = RARITY_COLORS[rarity as Rarity];
                          const expected = selectedBox.rarityChances.find(
                            c => c.rarity === rarity
                          )?.chance || 0;
                          const diff = (percentage as number) - expected;

                          return (
                            <div key={rarity} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className={`
                                  capitalize px-3 py-1 rounded-md text-sm font-semibold
                                  ${colors.bg} ${colors.text}
                                `}>
                                  {rarity}
                                </span>
                                <div className="text-right">
                                  <span className="text-white font-bold">
                                    {(percentage as number).toFixed(2)}%
                                  </span>
                                  <span className={`
                                    ml-2 text-xs
                                    ${diff > 0 ? 'text-green-400' : diff < 0 ? 'text-red-400' : 'text-slate-500'}
                                  `}>
                                    ({diff > 0 ? '+' : ''}{diff.toFixed(2)}%)
                                  </span>
                                </div>
                              </div>
                              <div className="bg-slate-900 rounded-full h-2 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 1, ease: 'easeOut' }}
                                  className={`h-full ${colors.bg}`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <p className="text-slate-400 text-sm">
                          Total simulations: <strong className="text-white">{simulations.iterations.toLocaleString()}</strong>
                        </p>
                        <p className="text-slate-500 text-xs mt-1">
                          The results should closely match the expected drop rates. Small variations are normal.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Link de vuelta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all"
          >
            ← Back to Loot Boxes
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
