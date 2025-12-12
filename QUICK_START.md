# ⚡ Quick Start Guide

Get your loot box system running in 5 minutes!

## 🚀 Installation

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

That's it! The app is now running. 🎉

---

## 📱 First Steps

### 1. Create Your User
- Enter a username
- Click "Start Playing"
- You'll get **500 coins** to start

### 2. Open Your First Box
- Click on "Starter Box" (costs 50 coins)
- Watch the animation
- See what item you got!

### 3. Check Your Inventory
- Click the "Inventory" tab
- View all your collected items
- See statistics (total items, value, etc.)

### 4. Try the Admin Panel
- Visit `http://localhost:3000/admin`
- View all items and boxes
- Run the probability simulator

---

## 🎮 How to Play

### Opening Boxes

**Starter Box** - 50 coins
- 70% Common
- 20% Rare
- 8% Epic
- 2% Legendary

**Premium Box** - 150 coins
- 40% Common
- 35% Rare
- 20% Epic
- 5% Legendary

**Legendary Box** - 500 coins
- 10% Common
- 30% Rare
- 40% Epic
- 20% Legendary

### Getting More Coins

Click "Coin Shop" tab and choose a package:
- 100 coins - $0.99
- 500 coins - $4.99 ⭐ Popular
- 1000 coins - $8.99
- 5000 coins - $39.99

(Note: This is demo mode, no real payment required)

---

## 🎯 What Can You Do?

### User Features
✅ Open loot boxes with different rarities
✅ Collect items in your inventory
✅ Buy more coins
✅ Track your collection statistics

### Admin Features
✅ View all available items
✅ See loot box configurations
✅ Run probability simulations
✅ Verify drop rates are fair

---

## 📂 Important Files to Know

### Main App
- `app/page.tsx` - Main loot box page
- `app/admin/page.tsx` - Admin dashboard

### Components
- `components/ui/LootBoxCard.tsx` - Box display
- `components/ui/ItemReveal.tsx` - Item reveal animation
- `components/ui/Inventory.tsx` - Inventory grid
- `components/ui/CoinShop.tsx` - Coin purchase UI

### Data & Logic
- `lib/data/items.ts` - All 13 items
- `lib/data/boxes.ts` - All 3 loot boxes
- `lib/lootbox-system.ts` - Probability engine

### API
- `app/api/boxes/route.ts` - Get all boxes
- `app/api/boxes/open/route.ts` - Open a box
- `app/api/shop/add-coins/route.ts` - Buy coins

---

## 🛠️ Customization

### Add a New Item

Edit `lib/data/items.ts`:

```typescript
{
  id: 'item-14',
  name: 'Your Item Name',
  description: 'Item description',
  rarity: Rarity.RARE,
  image: '🎯',  // Any emoji
  value: 100,
}
```

### Change Box Probabilities

Edit `lib/data/boxes.ts`:

```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 50 },
  { rarity: Rarity.RARE, chance: 30 },
  { rarity: Rarity.EPIC, chance: 15 },
  { rarity: Rarity.LEGENDARY, chance: 5 },
]
```

**Remember:** Chances must sum to 100%!

### Change Colors

Edit `types/index.ts`:

```typescript
[Rarity.COMMON]: {
  bg: 'bg-green-500',  // Change from gray
  text: 'text-green-100',
  glow: 'shadow-green-500/50',
  border: 'border-green-400',
}
```

---

## 🎨 Available Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
# Use a different port
PORT=3001 npm run dev
```

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Build errors?
```bash
# Check TypeScript errors
npm run build
```

### Styles not loading?
```bash
# Rebuild Tailwind
npm run dev
# Hard refresh browser (Ctrl+Shift+R)
```

---

## 📖 Learn More

### Documentation
- [README.md](README.md) - Full documentation
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md) - Detailed customization
- [NEXT_STEPS.md](NEXT_STEPS.md) - Production roadmap
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Technical overview

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)

---

## ❓ Common Questions

**Q: Can I use this commercially?**
A: Yes! MIT license allows commercial use.

**Q: How do I add real payments?**
A: See [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md#integration-with-payment-processors) for Stripe integration.

**Q: How do I deploy this?**
A: Easiest way is Vercel:
```bash
npm install -g vercel
vercel
```

**Q: Can I use a database?**
A: Yes! See [NEXT_STEPS.md](NEXT_STEPS.md#1-add-real-database) for Prisma setup.

**Q: Is the probability system fair?**
A: Yes! Test it in `/admin` with the simulator.

**Q: How do I change the starting coins?**
A: Edit `store/useUserStore.ts`, change `DEFAULT_COINS = 500`

---

## 🎯 Next Steps

1. ✅ Run the app (`npm run dev`)
2. ✅ Open a few boxes
3. ✅ Check the admin panel
4. ✅ Read the customization guide
5. ✅ Add your own items
6. ✅ Deploy to Vercel
7. ✅ Share with friends!

---

## 💡 Tips

### For Learning
- Read the code comments
- Experiment with probabilities
- Try modifying animations
- Add console.logs to understand flow

### For Development
- Use TypeScript strictly
- Test probabilities in admin panel
- Keep components small and focused
- Comment your customizations

### For Production
- Follow [NEXT_STEPS.md](NEXT_STEPS.md) checklist
- Add authentication first
- Then add database
- Finally add payments
- Test thoroughly before launch

---

## 🎉 Have Fun!

This is your playground to learn and experiment. Don't be afraid to:
- Break things (you can always re-clone)
- Try new features
- Modify the design
- Add your own twist

**Happy coding! 🚀**

---

**Need help?** Check the other documentation files or open an issue on GitHub.
