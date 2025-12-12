# 🎬 Demo Video Script

## Introduction (0:00 - 0:15)
"Hi! I'm going to show you a complete Loot Box / Mystery Box system built with Next.js, React, and TypeScript."

## User Registration (0:15 - 0:30)
1. Show landing page with username prompt
2. Enter username (e.g., "DemoUser")
3. Highlight "You'll start with 500 coins"
4. Click "Start Playing"

## Main Interface Tour (0:30 - 1:00)
1. **Header Section**
   - Point to username display
   - Highlight coin balance (500 coins)
   - Show the purple gradient header

2. **Navigation Tabs**
   - Show "Loot Boxes" tab (active)
   - Point to "Inventory" tab
   - Point to "Coin Shop" tab

## Loot Boxes Overview (1:00 - 1:30)
1. **Starter Box ($50)**
   - Show the box card with emoji
   - Highlight drop rates:
     - Common: 70%
     - Rare: 20%
     - Epic: 8%
     - Legendary: 2%
   - Point to price (50 coins)

2. **Premium Box ($150)**
   - Better odds for rare items
   - Show improved drop rates

3. **Legendary Box ($500)**
   - Best odds for legendary items
   - Highlight 20% legendary chance

## Opening a Box (1:30 - 2:00)
1. Click on "Starter Box"
2. **Animation plays:**
   - Box card scales down
   - Screen fades to dark
   - Item reveal modal appears
   - Shows rarity badge with color
   - Item floats with animation
   - Particles/glow effects

3. **Item Details**
   - Show item name (e.g., "Silver Ring")
   - Rarity badge (RARE)
   - Description
   - Value in coins
   - Click "Awesome! 🎉"

4. **Balance Update**
   - Point to updated coin balance (450 coins)

## Opening Multiple Boxes (2:00 - 2:30)
1. Open 2-3 more boxes rapidly
2. Show different rarities:
   - Common item (gray)
   - Epic item (purple)
   - Try for a Legendary

## Inventory Tab (2:30 - 3:00)
1. Click "Inventory" tab
2. **Statistics Dashboard:**
   - Total Items count
   - Unique Items count
   - Total Value
   - Legendary Items count

3. **Item Grid:**
   - Show collected items
   - Point to quantity badges (x2, x3, etc.)
   - Highlight rarity borders and colors
   - Show items sorted by rarity

## Coin Shop (3:00 - 3:20)
1. Click "Coin Shop" tab
2. Show coin packages:
   - 100 coins - $0.99
   - 500 coins - $4.99 (POPULAR)
   - 1000 coins - $8.99
   - 5000 coins - $39.99

3. Click a package to purchase
4. Show coin balance increase
5. Point to "Demo Mode" notice

## Admin Dashboard (3:20 - 4:00)
1. Navigate to `/admin` in URL
2. **Left Panel - Available Items:**
   - Show all items organized by rarity
   - Scroll through Common, Rare, Epic, Legendary sections
   - Show item count per rarity

3. **Right Panel - Loot Box Management:**
   - Select different boxes
   - Show their configurations

4. **Probability Simulator:**
   - Click "Run 10,000 Simulations"
   - Show simulation running
   - **Results appear:**
     - Expected vs Actual drop rates
     - Visual progress bars
     - Percentage differences
     - Verify accuracy (should be within ±1%)

## Technical Highlights (4:00 - 4:30)
Show code snippets (optional):

1. **Probability System** (`lib/lootbox-system.ts`)
   ```typescript
   private static selectRarity(box: LootBox): Rarity {
     const random = Math.random() * 100;
     // Weighted random selection...
   }
   ```

2. **API Route** (`app/api/boxes/open/route.ts`)
   - Server-side validation
   - Coin checking
   - Item generation

3. **Framer Motion Animations**
   ```typescript
   <motion.div
     initial={{ scale: 0, rotate: -180 }}
     animate={{ scale: 1, rotate: 0 }}
   />
   ```

## Features Summary (4:30 - 5:00)
Quick bullet points on screen:

✅ **User Features:**
- Username system with persistent storage
- 3 loot box types
- Animated item reveals
- Inventory management
- Coin shop

✅ **Admin Features:**
- Dashboard for all items
- Box configuration viewer
- Probability simulator
- Statistics and analytics

✅ **Technical:**
- Next.js 15 App Router
- TypeScript for type safety
- Zustand state management
- Framer Motion animations
- Tailwind CSS styling
- RESTful API routes

## Conclusion (5:00 - 5:15)
"This is a complete, production-ready loot box system. It's fully customizable, scalable, and ready to integrate with payment processors like Stripe. Check out the README for setup instructions and customization guides!"

---

## Recording Tips

### Camera Movements
- **Slow pans** for overview sections
- **Quick cuts** for rapid box openings
- **Zoom in** on important details (drop rates, animations)

### Highlighting
- Use cursor circles or highlights for important elements
- Arrow annotations for UI components
- Text overlays for statistics

### Timing
- Keep animations at normal speed (don't speed up)
- Pause slightly after important reveals
- Let the viewer appreciate the animations

### Audio
- Clear, enthusiastic narration
- Background music (low volume, upbeat)
- Sound effects for box openings (optional)

### Editing
- Add title cards for each section
- Include code snippets as overlays
- Use transitions between major sections
- End with a call-to-action slide

---

## B-Roll Suggestions

- File structure in VS Code
- Terminal showing `npm run dev`
- Browser DevTools showing API calls
- Mobile responsive view
- Different screen sizes side-by-side
- README file scrolling
- GitHub repository (if applicable)
