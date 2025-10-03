# Vault Rebalancing Server

A TypeScript server that automatically rebalances a vault by monitoring underlying profits in SUI tokens and converting them to BUCK tokens to increase the principal amount.

## Overview

This server runs as a scheduled job that:
1. Monitors underlying profits in SUI tokens
2. Claims and sells profitable SUI for BUCK tokens when profits are positive
3. Deposits the converted BUCK back into the vault to increase principal
4. Performs regular rebalancing operations

## Features

- **Automated Profit Monitoring**: Continuously checks for underlying profits in SUI
- **Smart Token Swapping**: Uses Cetus aggregator to find optimal routes for SUI → USDC → BUCK conversion
- **Slippage Protection**: Implements minimum amount checks to protect against unfavorable swaps
- **Scheduled Execution**: Runs every hour using cron jobs
- **Comprehensive Logging**: Detailed logging for monitoring and debugging
- **Dry Run Validation**: Validates transactions before execution

## Architecture

### Core Components

- **Server Class**: Main orchestrator that handles the rebalancing logic
- **Transaction Builder**: Constructs complex multi-step transactions
- **Price Feeds**: Integrates with Bucket Protocol for SUI price data
- **DEX Integration**: Uses Cetus aggregator for optimal swap routing

### Rebalancing Flow

1. **Profit Check**: Query underlying profits in SUI tokens
2. **Strategy Cap Borrowing**: Borrow strategy capability from shared object
3. **Profit Taking**: Extract profitable SUI from the vault
4. **Token Conversion**:
   - SUI → USDC (via Cetus aggregator)
   - USDC → BUCK (via Bucket PSM)
5. **Profit Skimming**: Collect accrued fee revenue
6. **Deposit**: Add converted BUCK back to vault
7. **Rebalancing**: Perform vault rebalancing operations
8. **Cleanup**: Return strategy capability

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd vault_server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

## Configuration

Create a `.env` file with the following variables:

```env
ADMIN_PRIVATE_KEY=your_sui_private_key_here
```

## Usage

```bash
# Build the project
npm run build

# Start the server
npm start
```

## Scheduling

The server runs automatically every hour using a cron job:
- **Schedule**: `0 0 */1 * * *` (every hour at minute 0)
- **Execution**: Automatic rebalancing based on profit conditions

## Key Operations

### Profit-Positive Scenario
When underlying profits > 0:
1. Extract SUI profits from vault
2. Swap SUI → USDC using Cetus aggregator
3. Convert USDC → BUCK via Bucket PSM
4. Deposit BUCK back to increase principal
5. Perform vault rebalancing

### No-Profit Scenario
When underlying profits ≤ 0:
1. Skip profit extraction and conversion
2. Skim base profits (fee revenue)
3. Perform standard vault rebalancing
