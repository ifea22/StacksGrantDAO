# StacksGrantDAO - Testnet

A decentralized grant funding platform built on the Stacks blockchain.

## Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Deploy to Testnet
```bash
# Check contracts
npm run check

# Deploy contracts to testnet
npm run deploy
```

### 3. Update Contract Addresses
After deployment, update the contract addresses in:
- `frontend/src/config.ts`
- `frontend/.env.testnet`

### 4. Build & Run Frontend
```bash
# Build frontend
npm run build:frontend

# Or run in development mode
npm run dev:frontend
```

## Project Structure

```
├── contracts/              # Smart contracts
│   ├── dao-grants.clar     # Main DAO contract
│   └── ft-trait.clar       # Token trait
├── frontend/               # React frontend
│   └── src/
│       ├── config.ts       # Contract addresses
│       └── api/stacks.ts   # Stacks integration
├── tests/                  # Contract tests
└── settings/               # Testnet settings
    └── Testnet.toml
```

## Features

- Submit funding proposals
- Member voting system
- Proposal finalization with fund transfer
- React frontend with Stacks wallet integration

## Testing

```bash
npm test
```

## Configuration

Update your testnet private key in `settings/Testnet.toml`:
```toml
[accounts.deployer]
mnemonic = "your testnet mnemonic here"
```
