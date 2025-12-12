'use client';

import { useEffect, useState } from 'react';
import { useUserStore } from '@/store/useUserStore';
import { LootBox, Item } from '@/types';
import LootBoxCard from '@/components/ui/LootBoxCard';
import ItemReveal from '@/components/ui/ItemReveal';
import Inventory from '@/components/ui/Inventory';
import CoinShop from '@/components/ui/CoinShop';
import { motion } from 'framer-motion';
import { Package, Coins, Store, User } from 'lucide-react';

export default function Home() {
  const { user, initUser, subtractCoins, addCoins, addItemToInventory } = useUserStore();
  const [boxes, setBoxes] = useState<LootBox[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealedItem, setRevealedItem] = useState<Item | null>(null);
  const [showReveal, setShowReveal] = useState(false);
  const [activeTab, setActiveTab] = useState<'boxes' | 'inventory' | 'shop'>('boxes');
  const [username, setUsername] = useState('');
  const [showUsernamePrompt, setShowUsernamePrompt] = useState(false);

  // Cargar cajas disponibles
  useEffect(() => {
    fetch('/api/boxes')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBoxes(data.boxes);
        }
      })
      .catch(err => console.error('Error loading boxes:', err));
  }, []);

  // Verificar si hay usuario
  useEffect(() => {
    if (!user) {
      setShowUsernamePrompt(true);
    }
  }, [user]);

  const handleCreateUser = () => {
    if (username.trim()) {
      initUser(username.trim());
      setShowUsernamePrompt(false);
    }
  };

  const handleOpenBox = async (box: LootBox) => {
    if (!user || loading) return;

    setLoading(true);

    try {
      const response = await fetch('/api/boxes/open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          boxId: box.id,
          userCoins: user.coins,
        }),
      });

      const data = await response.json();

      if (data.success && data.item) {
        // Actualizar monedas
        subtractCoins(box.price);

        // Agregar item al inventario
        addItemToInventory(data.item);

        // Mostrar item ganado con animación
        setTimeout(() => {
          setRevealedItem(data.item);
          setShowReveal(true);
        }, 300);
      } else {
        alert(data.message || 'Error opening box');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to open box');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseCoins = async (amount: number) => {
    if (!user) return;

    try {
      const response = await fetch('/api/shop/add-coins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (data.success) {
        addCoins(amount);
        alert(`Successfully purchased ${amount} coins!`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to purchase coins');
    }
  };

  // Prompt de username
  if (showUsernamePrompt) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-2 border-slate-700 max-w-md w-full"
        >
          <div className="text-6xl text-center mb-6">🎁</div>
          <h1 className="text-3xl font-bold text-white text-center mb-2">
            Welcome to Loot Box!
          </h1>
          <p className="text-slate-400 text-center mb-6">
            Enter your username to start opening mystery boxes!
          </p>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCreateUser()}
            placeholder="Enter username..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 mb-4"
            autoFocus
          />

          <button
            onClick={handleCreateUser}
            disabled={!username.trim()}
            className="w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed transition-all"
          >
            Start Playing
          </button>

          <p className="text-slate-600 text-sm text-center mt-4">
            You&apos;ll start with 500 coins!
          </p>
        </motion.div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center gap-3">
                  <Package size={40} />
                  Loot Box System
                </h1>
                <p className="text-purple-100 flex items-center gap-2">
                  <User size={16} />
                  Welcome, <strong>{user.username}</strong>!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                <p className="text-purple-100 text-sm mb-1">Your Balance</p>
                <p className="text-3xl font-bold text-white flex items-center gap-2">
                  <Coins className="text-amber-300" size={28} />
                  {user.coins}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'boxes' as const, label: 'Loot Boxes', icon: Package },
            { id: 'inventory' as const, label: 'Inventory', icon: Package },
            { id: 'shop' as const, label: 'Coin Shop', icon: Store },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all
                ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }
              `}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'boxes' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {boxes.map((box, index) => (
                <motion.div
                  key={box.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LootBoxCard
                    box={box}
                    onOpen={handleOpenBox}
                    disabled={loading}
                    userCoins={user.coins}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'inventory' && (
            <Inventory items={user.inventory} />
          )}

          {activeTab === 'shop' && (
            <CoinShop onPurchase={handlePurchaseCoins} />
          )}
        </motion.div>
      </div>

      {/* Item Reveal Modal */}
      <ItemReveal
        item={revealedItem}
        isOpen={showReveal}
        onClose={() => {
          setShowReveal(false);
          setTimeout(() => setRevealedItem(null), 300);
        }}
      />
    </div>
  );
}
