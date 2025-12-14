// Contract configuration - Auto-updated by deploy script
export const CONTRACT_ADDRESS = "0xD88E8A75c6e4bd2078681Ba90DBF9f3f0C3d5374"; // Fresh deployment with mandatory proof requirement

export const NETWORK_NAME = "Base Sepolia";

export const NETWORK_CONFIG = {
  chainId: "0x14a34", // Base Sepolia (84532 in hex)
  chainName: "Base Sepolia",
  rpcUrls: ["https://sepolia.base.org"],
  blockExplorerUrls: ["https://sepolia.basescan.org"],
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
};

export const CATEGORIES = [
  "Charity",
  "Education",
  "Medical",
  "Technology",
  "Environment",
  "Arts",
  "Community",
  "Other",
];

// Demo mode - hides dev panels, shows polished UI
// Set to true for hackathon demo or use ?demo=1 in URL
export const DEMO_MODE = false;

// Currency settings for India
export const CURRENCY = {
  symbol: "₹",
  name: "INR",
  ethToInr: 250000, // Approximate ETH to INR rate (update as needed)
};

// Helper function to convert ETH to INR
export const ethToInr = (ethAmount) => {
  const eth = parseFloat(ethAmount);
  return (eth * CURRENCY.ethToInr).toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  });
};

// Helper function to convert INR to ETH
export const inrToEth = (inrAmount) => {
  const inr = parseFloat(inrAmount);
  return (inr / CURRENCY.ethToInr).toFixed(6);
};
