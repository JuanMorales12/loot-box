# 🎁 Loot Box / Mystery Box System

A complete web-based Loot Box system built with **React**, **Next.js 15**, **TypeScript**, and **Framer Motion**.

![Tech Stack](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

### 🎮 User Features
- **User System**: Create username and start with 500 coins
- **Loot Boxes**: 3 different box types with varying rarities
- **Animated Opening**: Beautiful animations when opening boxes
- **Inventory System**: Track all items you've collected
- **Coin Shop**: Purchase more coins to open boxes
- **Rarity System**: 4 levels (Common, Rare, Epic, Legendary)
- **Persistent Storage**: Your progress is saved in localStorage

### 🛠️ Admin Features
- **Dashboard**: View all items and loot boxes
- **Probability Simulator**: Test drop rates with 10,000 simulations
- **Statistics**: Visual representation of actual vs expected probabilities
- **Item Management**: View all available items organized by rarity

### 🎨 Technical Features
- **Server-Side API Routes**: RESTful APIs built with Next.js
- **Type Safety**: Full TypeScript implementation
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion for smooth transitions
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Tailwind CSS with gradient effects and glassmorphism

## 📁 Project Structure

```
loot-box/
├── app/
│   ├── api/
│   │   ├── boxes/
│   │   │   ├── route.ts          # GET /api/boxes - List all boxes
│   │   │   └── open/
│   │   │       └── route.ts      # POST /api/boxes/open - Open a box
│   │   └── shop/
│   │       └── add-coins/
│   │           └── route.ts      # POST /api/shop/add-coins - Buy coins
│   ├── admin/
│   │   └── page.tsx              # Admin dashboard
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   └── ui/
│       ├── LootBoxCard.tsx       # Loot box card component
│       ├── ItemReveal.tsx        # Item reveal modal with animations
│       ├── Inventory.tsx         # User inventory display
│       └── CoinShop.tsx          # Coin purchase interface
├── lib/
│   ├── data/
│   │   ├── items.ts              # Item database (13 items)
│   │   └── boxes.ts              # Loot box configurations
│   └── lootbox-system.ts         # Probability engine
├── store/
│   └── useUserStore.ts           # Zustand state management
└── types/
    └── index.ts                  # TypeScript type definitions
```

## 🎲 How It Works

### Probability System

The loot box system uses a **weighted random algorithm**:

1. Each box has configurable rarity chances (must sum to 100%)
2. When opening a box:
   - Generate random number (0-100)
   - Accumulate probabilities until random number is reached
   - Select an item from that rarity tier
3. Example for Starter Box:
   - 0-70: Common (70% chance)
   - 70-90: Rare (20% chance)
   - 90-98: Epic (8% chance)
   - 98-100: Legendary (2% chance)

### Loot Boxes

| Box | Price | Common | Rare | Epic | Legendary |
|-----|-------|--------|------|------|-----------|
| **Starter Box** | 50 coins | 70% | 20% | 8% | 2% |
| **Premium Box** | 150 coins | 40% | 35% | 20% | 5% |
| **Legendary Box** | 500 coins | 10% | 30% | 40% | 20% |

### Items (13 Total)

- **Common (4)**: Bronze Coin, Wooden Shield, Iron Sword, Health Potion
- **Rare (3)**: Silver Ring, Magic Scroll, Crystal Wand
- **Epic (3)**: Enchanted Armor, Dragon Scale, Phoenix Feather
- **Legendary (3)**: Crown of Kings, Infinity Gem, Holy Grail

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Usage

### For Users

1. **Enter Username**: Start by creating a username
2. **Explore Boxes**: View available loot boxes on the main page
3. **Open Boxes**: Click on a box to open it (if you have enough coins)
4. **View Inventory**: Check the Inventory tab to see collected items
5. **Buy Coins**: Visit the Coin Shop to purchase more coins

### For Admins

Visit `/admin` to access the admin dashboard where you can:
- View all available items
- See loot box configurations
- Run probability simulations
- Verify drop rates match expectations

## 🔧 Customization

### Adding New Items

Edit `lib/data/items.ts`:

```typescript
{
  id: 'item-14',
  name: 'New Item',
  description: 'Description here',
  rarity: Rarity.RARE,
  image: '🔮',
  value: 100,
}
```

### Creating New Boxes

Edit `lib/data/boxes.ts`:

```typescript
{
  id: 'box-4',
  name: 'Custom Box',
  description: 'Your custom box',
  price: 250,
  image: '🎁',
  availableItems: ITEMS,
  rarityChances: [
    { rarity: Rarity.COMMON, chance: 50 },
    { rarity: Rarity.RARE, chance: 30 },
    { rarity: Rarity.EPIC, chance: 15 },
    { rarity: Rarity.LEGENDARY, chance: 5 },
  ],
}
```

### Modifying Probabilities

Probabilities are configured per-box in `lib/data/boxes.ts`. The `rarityChances` array must sum to 100%.

## 🧪 Testing the Probability System

The admin panel includes a simulator that runs 10,000 box openings to verify:
- Actual drop rates match expected probabilities
- Random distribution is working correctly
- No bias in the RNG system

Example results for Starter Box (10,000 simulations):
- Common: ~70.01% (expected 70%)
- Rare: ~19.98% (expected 20%)
- Epic: ~8.03% (expected 8%)
- Legendary: ~1.98% (expected 2%)

## 💡 Key Learning Points

### 1. **Next.js 15 App Router**
- Server and client components
- API routes for backend logic
- File-based routing

### 2. **TypeScript**
- Type safety across entire application
- Interfaces for data structures
- Enums for constants

### 3. **State Management (Zustand)**
- Global state without Redux complexity
- Persistent storage middleware
- Clean, simple API

### 4. **Animations (Framer Motion)**
- Page transitions
- Modal animations
- Micro-interactions

### 5. **Probability & Algorithms**
- Weighted random selection
- Statistical simulation
- Fair RNG distribution

## 🔐 Security Notes

This is a **demo project**. For production:

1. **Add Authentication**: Implement proper user auth (NextAuth.js, Clerk, etc.)
2. **Database**: Use PostgreSQL/MongoDB instead of mock data
3. **Payment Processing**: Integrate Stripe/PayPal for real payments
4. **Server Validation**: Validate all user actions server-side
5. **Rate Limiting**: Prevent abuse of API endpoints
6. **Secure Secrets**: Use environment variables for sensitive data

## 📝 API Documentation

### GET `/api/boxes`
Returns all available loot boxes.

**Response:**
```json
{
  "success": true,
  "boxes": [...]
}
```

### POST `/api/boxes/open`
Opens a loot box and returns the won item.

**Request:**
```json
{
  "boxId": "box-1",
  "userCoins": 500
}
```

**Response:**
```json
{
  "success": true,
  "item": {...},
  "newCoins": 450,
  "message": "You got a rare item: Silver Ring!"
}
```

### POST `/api/shop/add-coins`
Simulates coin purchase.

**Request:**
```json
{
  "amount": 500
}
```

**Response:**
```json
{
  "success": true,
  "coinsAdded": 500,
  "message": "Successfully added 500 coins!"
}
```

## 🎨 Color System

Each rarity has associated colors:

- **Common**: Gray (#6b7280)
- **Rare**: Blue (#3b82f6)
- **Epic**: Purple (#a855f7)
- **Legendary**: Amber (#f59e0b)

## 📱 Responsive Design

- Mobile: Single column layout
- Tablet: 2-column grid
- Desktop: 3-4 column grid with sidebar

## 🤝 Contributing

This is an educational project. Feel free to:
- Fork the repository
- Add new features
- Improve animations
- Enhance UI/UX
- Add tests

## 📄 License

MIT License - Feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Next.js** - React framework
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS
- **Zustand** - State management
- **Lucide React** - Icon library

---

**Built with ❤️ using Next.js and TypeScript**

For questions or improvements, feel free to open an issue or submit a PR!
