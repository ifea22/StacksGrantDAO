# StacksGrantDAO

A decentralized autonomous organization (DAO) for transparent grant funding on the Stacks blockchain. Community members can submit funding proposals, vote on them, and automatically execute approved grants through smart contracts.

## 🚀 Features

- **Decentralized Governance**: Community-driven proposal submission and voting
- **Smart Contract Automation**: Automatic fund distribution for approved proposals  
- **Real Wallet Integration**: Connect with Hiro Wallet, Leather, and other Stacks wallets
- **Live Blockchain Data**: Real-time proposal status and voting results
- **Member-Only Access**: Only DAO members can submit proposals and vote
- **Transparent Process**: All votes and decisions recorded on-chain
- **Time-Limited Voting**: 100-block voting period (~16.7 hours) per proposal

## 🏗 Quick Start

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Test Contracts
```bash
# Run contract tests
npm test

# Check contract syntax
npm run check
```

### 3. Deploy to Testnet
```bash
# Deploy contracts to testnet
npm run deploy
```

### 4. Configure Frontend
After deployment, update the contract addresses in:
- `frontend/src/config.ts`
- `frontend/.env.testnet`

### 5. Run the Application
```bash
# Development mode
npm run dev:frontend

# Production build
npm run build:frontend
```

## 📁 Project Structure

```
StacksGrantDAO/
├── contracts/                  # Smart contracts
│   ├── dao-grants.clar        # Main DAO governance contract
│   └── ft-trait.clar          # SIP-010 token trait definition
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ConnectWallet.tsx
│   │   │   └── ProposalCard.tsx
│   │   ├── pages/            # Application pages
│   │   │   ├── Proposals.tsx  # View and vote on proposals
│   │   │   ├── Submit.tsx     # Submit new proposals
│   │   │   └── Treasury.tsx   # Treasury information
│   │   ├── api/              # Blockchain integration
│   │   │   └── stacks.ts     # Contract interaction functions
│   │   ├── config.ts         # Contract addresses and settings
│   │   └── App.tsx           # Main application component
│   ├── .env.testnet          # Environment variables
│   └── package.json          # Frontend dependencies
├── tests/                     # Contract unit tests
│   └── dao-grants.test.ts    # Comprehensive test suite
├── deployments/              # Deployment configurations
│   ├── default.simnet-plan.yaml    # Local testing
│   └── default.testnet-plan.yaml   # Testnet deployment
├── settings/                 # Network configurations
│   └── Testnet.toml         # Testnet settings
├── package.json             # Root project scripts
└── README.md               # This file
```

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all contract tests
npm test

# Check contract syntax and types
npm run check

# Watch mode for development
npm run test:watch
```

## ⚙️ Configuration

### Smart Contract Deployment

1. **Set up your testnet wallet**:
   Update `settings/Testnet.toml`:
   ```toml
   [accounts.deployer]
   mnemonic = "your testnet mnemonic here"
   ```

2. **Get testnet STX**:
   - Visit the [Stacks Testnet Faucet](https://explorer.hiro.so/sandbox/faucet)
   - Request testnet STX for deployment fees

3. **Deploy contracts**:
   ```bash
   npm run deploy
   ```

### Frontend Configuration

After deploying contracts, update these files with your deployed contract addresses:

**`frontend/src/config.ts`**:
```typescript
export const DAO_CONTRACT = 'ST1234567890ABCDEF.dao-grants'
export const TOKEN_CONTRACT = 'ST1234567890ABCDEF.sip010-token'
```

**`frontend/.env.testnet`**:
```bash
VITE_DAO_CONTRACT=ST1234567890ABCDEF.dao-grants
VITE_TOKEN_CONTRACT=ST1234567890ABCDEF.sip010-token
```

## 🎯 How It Works

### 1. DAO Membership
- **Admin Control**: The contract deployer is the initial admin
- **Member Management**: Admin can add/remove DAO members
- **Exclusive Access**: Only members can submit proposals and vote

### 2. Proposal Lifecycle
```
Submit → Vote → Finalize → Execute
```

1. **Submit Proposal** (Members only)
   - Specify recipient address
   - Set funding amount  
   - Provide description
   - Proposal becomes active for 100 blocks

2. **Community Voting** (Members only)
   - Vote Yes or No on active proposals
   - One vote per member per proposal
   - No vote changes allowed

3. **Automatic Execution**
   - After voting period ends
   - If Yes votes > No votes
   - Anyone can trigger finalization
   - Funds automatically transfer to recipient

## 🖥 User Interface

### Wallet Integration
- **Stacks Connect**: Native integration with Stacks ecosystem wallets
- **Supported Wallets**: Hiro Wallet, Leather, Xverse
- **Real-time Balance**: Shows connected wallet balance and address

### Key Features
- **Live Data**: Real-time proposal status from blockchain
- **Visual Status**: Color-coded proposal cards (Active/Expired/Finalized)
- **Form Validation**: Smart input validation and error handling
- **Transaction Feedback**: Clear success/error messages
- **Loading States**: Progress indicators during blockchain operations
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Usage Guide

### For DAO Members

1. **Connect Your Wallet**
   - Click "Connect Wallet" 
   - Authenticate with your Stacks wallet
   - Ensure you have testnet STX for transaction fees

2. **Submit a Proposal**
   - Navigate to "Submit Proposal" tab
   - Fill in recipient address, amount, and description
   - Click "Submit Proposal" and confirm transaction
   - Wait for transaction confirmation

3. **Vote on Proposals**
   - Go to "Active Proposals" tab
   - Review proposal details
   - Click "Vote Yes" or "Vote No"
   - Confirm transaction in your wallet

4. **Finalize Approved Proposals**
   - After voting period ends (100 blocks)
   - If proposal has more Yes than No votes
   - Click "Finalize & Execute" button
   - Funds automatically transfer to recipient

### For DAO Administrators

1. **Add New Members**
   - Use the contract function `add-member`
   - Pass the new member's Stacks address
   - They can now submit proposals and vote

2. **Fund the Treasury**
   - Transfer SIP-010 tokens to the DAO contract address
   - These tokens will be distributed through approved proposals

3. **Monitor Activity**
   - View all proposals and voting activity
   - Check treasury balance
   - Manage membership as needed

## 🚦 Deployment Guide

### Prerequisites
- Node.js 18+ installed
- Clarinet CLI installed
- Stacks wallet with testnet STX
- Git for version control

### Step-by-Step Deployment

1. **Clone and Setup**
   ```bash
   git clone https://github.com/ifea22/StacksGrantDAO
   cd StacksGrantDAO
   npm run install:all
   ```

2. **Configure Deployment**
   ```bash
   # Edit settings/Testnet.toml with your mnemonic
   # Update deployment addresses in deployments/default.testnet-plan.yaml
   ```

3. **Deploy Contracts**
   ```bash
   npm run deploy
   ```

4. **Update Frontend Configuration**
   ```bash
   # Update frontend/src/config.ts with deployed contract addresses
   # Update frontend/.env.testnet with environment variables
   ```

5. **Build and Deploy Frontend**
   ```bash
   npm run build:frontend
   # Deploy the frontend/dist folder to your hosting platform
   ```

6. **Initialize DAO**
   ```bash
   # Add initial members using the add-member contract function
   # Fund the treasury with SIP-010 tokens
   # Test the complete flow
   ```

## 🔧 Available Scripts

```bash
# Install all dependencies
npm run install:all

# Contract development
npm run check          # Check contract syntax
npm test              # Run contract tests
npm run deploy        # Deploy to testnet

# Frontend development  
npm run dev:frontend    # Start development server
npm run build:frontend  # Build for production

# Full pipeline
npm start             # Check contracts, deploy, and build frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Stacks Documentation](https://docs.stacks.co/)
- [Clarinet Documentation](https://docs.hiro.so/stacks/clarinet/)
- [Stacks Connect](https://github.com/hirosystems/connect)
- [SIP-010 Token Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)

## ⚠️ Disclaimer

This is experimental software. Use at your own risk. Always test thoroughly on testnet before deploying to mainnet.
