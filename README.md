# PayPai Wallet

PayPai is a modern, secure cryptocurrency wallet built with Tauri, Next.js, and Rust. It provides a seamless desktop experience for managing digital assets.

Still in development—stay tuned for more updates! 🚀

## Features

- 🔐 Secure wallet management
- 💰 Multi-asset support
- 📊 Asset tracking and management
- 🔄 Transaction history
- 🌙 Dark/Light mode support
- 🔑 Secure key storage
- 📱 Responsive design

## Technology Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- React Query

### Backend
- Tauri 2.0
- Rust
- SQLite
- SQLx
- Tokio

## Project Structure

```
paypai/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/            # Pages & routing
│   │   │   ├── layout.tsx  # Root layout
│   │   │   ├── page.tsx    # Home page
│   │   │   ├── wallet/     # Wallet pages
│   │   │   ├── assets/     # Asset pages
│   │   │   ├── transactions/ # Transaction pages
│   │   │   └── settings/   # Settings pages
│   │   ├── components/     # React components
│   │   │   ├── ui/        # UI components
│   │   │   ├── wallet/    # Wallet components
│   │   │   └── transactions/ # Transaction components
│   │   ├── hooks/         # Custom hooks
│   │   │   ├── useWallet.ts
│   │   │   ├── useAssets.ts
│   │   │   └── useTransactions.ts
│   │   └── lib/          # Utilities
└── src-tauri/            # Rust backend
    ├── src/
    │   ├── main.rs      # Entry point
    │   ├── storage/     # Database management
    │   ├── wallet/      # Wallet management
    │   └── commands/    # Tauri commands
    └── Cargo.toml
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- Rust toolchain
- Tauri CLI
- SQLite

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/paypai.git
cd paypai
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install Tauri CLI
```bash
cargo install tauri-cli
```

4. Run the development environment
```bash
npm run tauri dev
```

## Development Guide

### Frontend Development

The frontend is built with Next.js and uses the following key technologies:

- **Routing**: Next.js App Router
- **State Management**: React Query
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons

### Backend Development

The Rust backend handles:

1. Wallet Management
   - Key generation and storage
   - Transaction signing
   - Address management

2. Data Storage
   - SQLite database
   - Encrypted key storage
   - Transaction history

3. Security
   - AES-GCM encryption
   - Secure key storage
   - Password hashing

## Security Features

- Encrypted key storage
- Secure password hashing
- Protected database access
- Secure RPC connections

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU License - see the LICENSE file for details.

## Acknowledgments

- [Tauri](https://tauri.app)
- [Next.js](https://nextjs.org)
- [shadcn/ui](https://ui.shadcn.com)
- [Solana](https://solana.com)