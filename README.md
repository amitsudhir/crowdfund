# 🚀 Crowdfund DApp

A decentralized crowdfunding platform where users can create campaigns and contribute using crypto.

---

## ⚡ Quick Setup

### 1. Clone the Repository
```bash
git clone https://github.com/amitsudhir/crowdfund.git
cd crowdfund
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

---

## 🌐 Smart Contract (Deployed on Base Sepolia)

**CampaignFactory Contract Address:** `0xf86eFF9d6B0e471776828C826A0D61107D737A09`

---

## 📁 Project Structure

```
crowdfund/
│
├── /contracts           # Solidity smart contracts
├── /pages               # Next.js pages
├── /components          # UI components
├── /context             # Blockchain & wallet context
├── /public              # Assets
└── package.json
```

---

## 📊 Pre-Seeded Test Campaigns

| Campaign          | Funding Status |
| ----------------- | -------------- |
| Community Center  | 80% funded     |
| Medical Equipment | 10% funded     |
| Coding Bootcamp   | 40% funded     |

---

## 🚀 Deploy to Vercel

1. Push updates to `main`
```bash
git add .
git commit -m "update"
git push origin main
```

2. Login to **Vercel → Import GitHub Repo → Deploy**

---

## 🛠 Tech Stack

- Solidity  
- Hardhat  
- Base Sepolia Testnet  
- Next.js  
- Wagmi / Viem  
- MetaMask  

---

## 📌 Notes

- Switch wallet network to **Base Sepolia** before interacting.
- Use Base Sepolia faucet if you need test ETH.

---

### 🎉 You're all set!

Clone → Install → Run → Deploy. Everything is pre-configured.
