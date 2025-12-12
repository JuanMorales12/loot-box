# 🎨 Customization Guide

This guide will help you customize the Loot Box system to fit your needs.

## Table of Contents
- [Adding New Items](#adding-new-items)
- [Creating New Loot Boxes](#creating-new-loot-boxes)
- [Modifying Probabilities](#modifying-probabilities)
- [Changing Colors and Themes](#changing-colors-and-themes)
- [Adding New Rarities](#adding-new-rarities)
- [Customizing Animations](#customizing-animations)
- [Integration with Payment Processors](#integration-with-payment-processors)

---

## Adding New Items

### Step 1: Define the Item

Edit `lib/data/items.ts`:

```typescript
{
  id: 'item-14',                    // Unique ID
  name: 'Mystic Sword',              // Display name
  description: 'A blade of legends',  // Description
  rarity: Rarity.EPIC,               // Rarity level
  image: '⚔️',                       // Emoji or image URL
  value: 200,                        // Value in coins
}
```

### Step 2: Add to ITEMS Array

```typescript
export const ITEMS: Item[] = [
  // ... existing items
  {
    id: 'item-14',
    name: 'Mystic Sword',
    description: 'A blade of legends',
    rarity: Rarity.EPIC,
    image: '⚔️',
    value: 200,
  },
];
```

### Using Custom Images

Instead of emojis, you can use image URLs:

```typescript
{
  id: 'item-15',
  name: 'Golden Shield',
  description: 'Ultimate protection',
  rarity: Rarity.LEGENDARY,
  image: '/images/items/golden-shield.png',  // Place in public/images/items/
  value: 500,
}
```

Then update the component to use `<img>` tags:

```typescript
// In components where items are displayed
{typeof item.image === 'string' && item.image.startsWith('/') ? (
  <img src={item.image} alt={item.name} className="w-16 h-16" />
) : (
  <div className="text-6xl">{item.image}</div>
)}
```

---

## Creating New Loot Boxes

### Step 1: Define the Box

Edit `lib/data/boxes.ts`:

```typescript
{
  id: 'box-4',
  name: 'Cosmic Box',
  description: 'Items from the cosmos!',
  price: 300,
  image: '🌌',
  availableItems: ITEMS,  // Or a filtered subset
  rarityChances: [
    { rarity: Rarity.COMMON, chance: 30 },
    { rarity: Rarity.RARE, chance: 40 },
    { rarity: Rarity.EPIC, chance: 25 },
    { rarity: Rarity.LEGENDARY, chance: 5 },
  ],
}
```

### Step 2: Add to LOOT_BOXES Array

```typescript
export const LOOT_BOXES: LootBox[] = [
  // ... existing boxes
  {
    id: 'box-4',
    // ... configuration
  },
];
```

### Creating Specialized Boxes

You can create boxes with only specific items:

```typescript
// Create a weapon-only box
const WEAPON_ITEMS = ITEMS.filter(item =>
  item.name.includes('Sword') ||
  item.name.includes('Shield') ||
  item.name.includes('Wand')
);

{
  id: 'box-weapons',
  name: 'Weapon Crate',
  description: 'Only weapons inside!',
  price: 200,
  image: '🗡️',
  availableItems: WEAPON_ITEMS,
  rarityChances: [
    { rarity: Rarity.COMMON, chance: 50 },
    { rarity: Rarity.RARE, chance: 30 },
    { rarity: Rarity.EPIC, chance: 15 },
    { rarity: Rarity.LEGENDARY, chance: 5 },
  ],
}
```

---

## Modifying Probabilities

### Understanding Probability Configuration

Probabilities must **sum to 100%**:

```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 40 },     // 40%
  { rarity: Rarity.RARE, chance: 35 },       // 35%
  { rarity: Rarity.EPIC, chance: 20 },       // 20%
  { rarity: Rarity.LEGENDARY, chance: 5 },   // 5%
]  // Total: 100%
```

### Example Configurations

**High Risk, High Reward:**
```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 80 },
  { rarity: Rarity.RARE, chance: 10 },
  { rarity: Rarity.EPIC, chance: 5 },
  { rarity: Rarity.LEGENDARY, chance: 5 },
]
```

**Balanced:**
```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 25 },
  { rarity: Rarity.RARE, chance: 25 },
  { rarity: Rarity.EPIC, chance: 25 },
  { rarity: Rarity.LEGENDARY, chance: 25 },
]
```

**Guaranteed Legendary (for special events):**
```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 0 },
  { rarity: Rarity.RARE, chance: 0 },
  { rarity: Rarity.EPIC, chance: 0 },
  { rarity: Rarity.LEGENDARY, chance: 100 },
]
```

### Testing Probabilities

Use the admin simulator to verify:

1. Go to `/admin`
2. Select your box
3. Click "Run 10,000 Simulations"
4. Verify results match expected percentages (±1% is normal)

---

## Changing Colors and Themes

### Modifying Rarity Colors

Edit `types/index.ts`:

```typescript
export const RARITY_COLORS: Record<Rarity, { bg: string; text: string; glow: string; border: string }> = {
  [Rarity.COMMON]: {
    bg: 'bg-green-500',        // Change from gray to green
    text: 'text-green-100',
    glow: 'shadow-green-500/50',
    border: 'border-green-400',
  },
  // ... other rarities
};
```

### Changing App Theme

Edit `app/globals.css`:

```css
:root {
  --background: #1a1a2e;      /* Dark blue instead of slate */
  --foreground: #eee;
  --accent: #0f3460;          /* Custom accent color */
}
```

Update Tailwind config in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#6366f1',       // Custom primary color
      secondary: '#8b5cf6',     // Custom secondary
    },
  },
}
```

---

## Adding New Rarities

### Step 1: Update Enum

Edit `types/index.ts`:

```typescript
export enum Rarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
  MYTHIC = 'mythic',          // New rarity
  DIVINE = 'divine',          // New rarity
}
```

### Step 2: Add Colors

```typescript
export const RARITY_COLORS: Record<Rarity, ...> = {
  // ... existing rarities
  [Rarity.MYTHIC]: {
    bg: 'bg-pink-500',
    text: 'text-pink-100',
    glow: 'shadow-pink-500/50',
    border: 'border-pink-400',
  },
  [Rarity.DIVINE]: {
    bg: 'bg-cyan-500',
    text: 'text-cyan-100',
    glow: 'shadow-cyan-500/50',
    border: 'border-cyan-400',
  },
};
```

### Step 3: Create Items with New Rarities

```typescript
{
  id: 'item-mythic-1',
  name: 'Orb of Eternity',
  description: 'Grants eternal power',
  rarity: Rarity.MYTHIC,
  image: '🔮',
  value: 2000,
}
```

### Step 4: Add to Box Probabilities

```typescript
rarityChances: [
  { rarity: Rarity.COMMON, chance: 50 },
  { rarity: Rarity.RARE, chance: 25 },
  { rarity: Rarity.EPIC, chance: 15 },
  { rarity: Rarity.LEGENDARY, chance: 8 },
  { rarity: Rarity.MYTHIC, chance: 1.5 },
  { rarity: Rarity.DIVINE, chance: 0.5 },
]  // Total: 100%
```

---

## Customizing Animations

### Modifying Box Opening Animation

Edit `components/ui/ItemReveal.tsx`:

```typescript
// Faster animation
<motion.div
  initial={{ scale: 0, rotate: -180 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: 'spring', duration: 0.3 }}  // Changed from 0.7
/>

// Different animation style
<motion.div
  initial={{ y: -1000, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: 'spring', bounce: 0.4 }}
/>
```

### Adding Particle Effects

Install a particle library:

```bash
npm install @tsparticles/react @tsparticles/slim
```

Add to `ItemReveal.tsx`:

```typescript
import Particles from "@tsparticles/react";

// In component
<Particles
  options={{
    particles: {
      color: { value: colors.bg },
      number: { value: 50 },
      move: { enable: true },
    },
  }}
/>
```

### Custom Hover Effects

Edit `components/ui/LootBoxCard.tsx`:

```typescript
<motion.div
  whileHover={{
    scale: 1.1,              // Bigger scale
    rotate: 5,               // Add rotation
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'  // Bigger shadow
  }}
/>
```

---

## Integration with Payment Processors

### Stripe Integration

#### Step 1: Install Stripe

```bash
npm install stripe @stripe/stripe-js
```

#### Step 2: Create Stripe API Route

Create `app/api/shop/create-checkout/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(request: NextRequest) {
  const { amount, coins } = await request.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${coins} Coins`,
          },
          unit_amount: amount * 100, // Stripe uses cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?coins=${coins}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
  });

  return NextResponse.json({ sessionId: session.id });
}
```

#### Step 3: Update CoinShop Component

```typescript
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const handlePurchase = async (amount: number, price: number) => {
  const response = await fetch('/api/shop/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: price, coins: amount }),
  });

  const { sessionId } = await response.json();
  const stripe = await stripePromise;

  await stripe?.redirectToCheckout({ sessionId });
};
```

### PayPal Integration

#### Step 1: Install PayPal SDK

```bash
npm install @paypal/react-paypal-js
```

#### Step 2: Wrap App with PayPalScriptProvider

Edit `app/layout.tsx`:

```typescript
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PayPalScriptProvider options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
        }}>
          {children}
        </PayPalScriptProvider>
      </body>
    </html>
  );
}
```

#### Step 3: Add PayPal Button

```typescript
import { PayPalButtons } from "@paypal/react-paypal-js";

<PayPalButtons
  createOrder={(data, actions) => {
    return actions.order.create({
      purchase_units: [{
        amount: { value: price.toString() }
      }]
    });
  }}
  onApprove={(data, actions) => {
    return actions.order!.capture().then(() => {
      addCoins(amount);
    });
  }}
/>
```

---

## Advanced Customizations

### Adding User Authentication

Use **NextAuth.js**:

```bash
npm install next-auth
```

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### Adding Database (PostgreSQL + Prisma)

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

Create schema in `prisma/schema.prisma`:

```prisma
model User {
  id        String   @id @default(uuid())
  username  String   @unique
  coins     Int      @default(500)
  inventory Json
  createdAt DateTime @default(now())
}

model BoxOpening {
  id        String   @id @default(uuid())
  userId    String
  boxId     String
  itemId    String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

### Adding Analytics

Track box openings:

```typescript
// In app/api/boxes/open/route.ts
import { track } from '@/lib/analytics';

track('box_opened', {
  boxId,
  itemReceived: item.id,
  rarity: item.rarity,
  userId: user.id,
});
```

---

## Need Help?

- Check the [README.md](README.md) for general information
- Review the code comments for detailed explanations
- Open an issue on GitHub
- Contact support

Happy customizing! 🎨
