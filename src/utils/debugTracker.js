/**
 * Debug utilities for checking transaction tracking data
 */

export const debugLocalStorage = (account) => {
  if (!account) {
    console.log("No account provided for debug");
    return;
  }

  console.log("=== DEBUG TRANSACTION TRACKING ===");
  console.log("Account:", account);
  
  // Check donations
  const donationsKey = `donations_${account.toLowerCase()}`;
  const donations = localStorage.getItem(donationsKey);
  console.log("Donations key:", donationsKey);
  console.log("Donations data:", donations ? JSON.parse(donations) : "No data");
  
  // Check withdrawals
  const withdrawalsKey = `withdrawals_${account.toLowerCase()}`;
  const withdrawals = localStorage.getItem(withdrawalsKey);
  console.log("Withdrawals key:", withdrawalsKey);
  console.log("Withdrawals data:", withdrawals ? JSON.parse(withdrawals) : "No data");
  
  // List all localStorage keys that might be related
  console.log("All localStorage keys:");
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('donation') || key.includes('withdrawal')) {
      console.log(`- ${key}: ${localStorage.getItem(key)}`);
    }
  }
  
  console.log("=== END DEBUG ===");
};

export const clearAllTrackingData = () => {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('donation') || key.includes('withdrawal')) {
      keys.push(key);
    }
  }
  
  keys.forEach(key => localStorage.removeItem(key));
  console.log(`Cleared ${keys.length} tracking data keys:`, keys);
};

export const addTestData = (account) => {
  if (!account) return;
  
  // Add test donation data
  const testDonation = {
    "1": [{
      txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      amount: "0.001",
      title: "Test Campaign",
      blockNumber: 12345,
      timestamp: Date.now() - 86400000, // 1 day ago
      blockExplorerUrl: "https://sepolia.basescan.org/tx/0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
      dateCreated: new Date(Date.now() - 86400000).toISOString()
    }]
  };
  
  // Add test withdrawal data
  const testWithdrawal = {
    "1": {
      txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      amount: "0.001",
      title: "Test Campaign",
      blockNumber: 12346,
      timestamp: Date.now() - 43200000, // 12 hours ago
      blockExplorerUrl: "https://sepolia.basescan.org/tx/0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
      dateCreated: new Date(Date.now() - 43200000).toISOString()
    }
  };
  
  localStorage.setItem(`donations_${account.toLowerCase()}`, JSON.stringify(testDonation));
  localStorage.setItem(`withdrawals_${account.toLowerCase()}`, JSON.stringify(testWithdrawal));
  
  console.log("Added test data for account:", account);
};