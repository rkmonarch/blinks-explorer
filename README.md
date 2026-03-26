# OnlyBlinks — Solana Blinks Explorer

A community-driven explorer and marketplace for discovering, sharing, and submitting [Solana Blinks](https://solana.com/docs/advanced/actions) — composable, shareable blockchain actions that can be embedded anywhere on the internet.

## What are Blinks?

Blinks (Blockchain Links) are Solana Actions wrapped in a shareable URL. They allow users to perform on-chain transactions — swaps, donations, mints, votes — directly from any website, social platform, or app without navigating to a dApp. OnlyBlinks provides a central hub to discover and share these links.

## Features

- **Browse Blinks** — Infinite-scroll explorer of community-submitted blinks
- **Tag Filtering** — Filter by categories: DeFi, NFTs, DAO, Swap, Donations, Games, and more
- **Search** — Full-text search across submitted blinks
- **Submit Blinks** — Submit your own blink URL with relevant tags
- **User Profiles** — Wallet-authenticated profiles with avatar, name, and bio
- **Blink Verification** — Checks against the Dialect Blinks registry
- **Sharing** — Generate shareable links for any blink via Solana Actions

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + shadcn/ui |
| State | Zustand |
| Data Fetching | TanStack React Query |
| Database | PostgreSQL + Prisma |
| Blockchain | Solana (Mainnet), @solana/wallet-adapter |
| Blinks | @dialectlabs/blinks |
| File Storage | Pinata (IPFS) |
| Package Manager | bun |

## Project Structure

```
blink-explorer/
├── src/
│   ├── app/
│   │   ├── api/                  # API routes
│   │   │   ├── create-blink/     # Submit a new blink
│   │   │   ├── get-blinks/       # Paginated blink feed
│   │   │   ├── get-blink/        # Single blink details
│   │   │   ├── search/           # Search blinks
│   │   │   ├── create-profile/   # Create user profile
│   │   │   ├── get-profile/      # Fetch user profile
│   │   │   ├── edit-profile/     # Update user profile
│   │   │   ├── already-exists/   # Duplicate URL check
│   │   │   ├── verify-username/  # Username availability
│   │   │   ├── group/            # Blink grouping
│   │   │   └── actions/share/    # Solana Actions endpoint
│   │   ├── [id]/page.tsx         # Blink detail page
│   │   ├── share/page.tsx        # Submit a blink
│   │   ├── actions.json/         # Solana Actions metadata
│   │   ├── layout.tsx            # Root layout + providers
│   │   └── page.tsx              # Home / explorer page
│   ├── components/
│   │   ├── Blinks.tsx            # Infinite scroll blink grid
│   │   ├── Navbar.tsx            # Navigation + search + wallet
│   │   ├── cards/BlinkCard.tsx   # Individual blink card
│   │   ├── modals/               # Create blink + profile modals
│   │   ├── providers/            # Wallet, Query, Toast providers
│   │   └── ui/                   # shadcn/ui base components
│   ├── hooks/                    # useBlinks, useBlink, useProfile
│   ├── store/                    # Zustand stores (blinks, search, user, create)
│   ├── types/                    # TypeScript interfaces
│   └── utils/                    # Prisma client, constants, helpers
├── prisma/
│   ├── schema.prisma             # Database schema
│   └── migrations/               # Migration history
└── public/                       # Static assets, fonts, OG image
```

## Database Schema

```prisma
model User {
  id         String   @id @default(uuid())
  address    String   @unique        // Solana wallet address
  username   String
  avatar     String?
  first_name String?
  last_name  String?
  bio        String?
  created_at DateTime @default(now())
  Blink      Blink[]
}

model Blink {
  id        String   @id @default(uuid())
  blink     String                   // Blink URL
  address   String                   // Submitter wallet address
  createdAt DateTime @default(now())
  rank      Int
  verified  Boolean?
  group     String?                  // Associated website/domain
  User      User     @relation(...)
  Tags      Tags[]
}

model Tags {
  id        String   @id @default(uuid())
  tag       String
  createdAt DateTime @default(now())
  blink_id  String
  Blink     Blink    @relation(...)
}
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (package manager)
- PostgreSQL database
- A Solana-compatible wallet browser extension (Phantom, Backpack, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/rkmonarch/blinks-explorer.git
cd blinks-explorer

# Install dependencies
bun install
```

### Environment Setup

Create a `.env` file in the root directory:

```env
# Database (required)
DATABASE_URL="postgresql://user:password@localhost:5432/blink_explorer"
DIRECT_URL="postgresql://user:password@localhost:5432/blink_explorer"

# Solana RPC (optional, defaults to mainnet)
NEXT_PUBLIC_RPC_URL="https://api.mainnet-beta.solana.com"

# Pinata IPFS (optional, for avatar uploads)
PINATA_API_KEY="your_pinata_api_key"
PINATA_API_SECRET="your_pinata_api_secret"
```

### Database Setup

```bash
# Generate Prisma client
bunx prisma generate

# Run migrations
bunx prisma migrate dev

# (Optional) Open Prisma Studio to inspect data
bunx prisma studio
```

### Run Locally

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun run start
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/create-blink` | Submit a new blink |
| `POST` | `/api/get-blinks` | Fetch paginated blinks (supports tag filter) |
| `GET` | `/api/get-blink` | Fetch a single blink by ID |
| `POST` | `/api/search` | Search blinks by URL |
| `POST` | `/api/create-profile` | Create a user profile |
| `GET` | `/api/get-profile` | Fetch a user profile by wallet address |
| `POST` | `/api/edit-profile` | Update profile fields |
| `GET` | `/api/already-exists` | Check if a blink URL is already submitted |
| `GET` | `/api/verify-username` | Check username availability |
| `POST` | `/api/group` | Manage blink groups |
| `POST` | `/api/actions/share` | Solana Actions endpoint for blink sharing |

## Supported Tags

`Blinkathon` `NFTs` `DeFi` `DAO` `Tokens` `Social` `Prediction Market` `Swap` `Donations` `Trade` `Airdrop` `Votes` `Memes` `Staking` `Token Gated` `Games`

## Deployment

The easiest way to deploy is via [Vercel](https://vercel.com):

1. Push your repository to GitHub
2. Import the project in Vercel
3. Add the environment variables from `.env`
4. Deploy

Make sure to run `bunx prisma migrate deploy` as part of your build step or CI pipeline when deploying to production.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

## License

MIT
