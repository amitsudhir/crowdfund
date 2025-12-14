/**
 * Utility to clean up duplicate transaction entries from localStorage
 * Run this once to fix existing duplicate data
 */

/**
 * Clean duplicate donation entries for a user
 * @param {string} account - User's wallet address
 */
export const cleanupDuplicateDonations = (account) => {
  try {
    const key = `donations_${account.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    if (!stored) return;
    
    const donations = JSON.parse(stored);
    const cleaned = {};
    let totalRemoved = 0;
    
    Object.keys(donations).forEach(campaignId => {
      const txList = donations[campaignId];
      if (Array.isArray(txList)) {
        // Remove duplicates based on txHash AND amount+timestamp combination
        const uniqueTxs = [];
        const seenHashes = new Set();
        const seenCombinations = new Set();
        
        txList.forEach(tx => {
          const combination = `${tx.amount}-${tx.timestamp}`;
          
          if (!seenHashes.has(tx.txHash) && !seenCombinations.has(combination)) {
            seenHashes.add(tx.txHash);
            seenCombinations.add(combination);
            uniqueTxs.push(tx);
          } else {
            totalRemoved++;
          }
        });
        
        if (uniqueTxs.length > 0) {
          cleaned[campaignId] = uniqueTxs;
        }
        console.log(`Campaign ${campaignId}: Removed ${txList.length - uniqueTxs.length} duplicate donations`);
      }
    });
    
    localStorage.setItem(key, JSON.stringify(cleaned));
    console.log(`Cleaned duplicate donations for ${account} - Total removed: ${totalRemoved}`);
  } catch (error) {
    console.error("Error cleaning duplicate donations:", error);
  }
};

/**
 * Clean duplicate withdrawal entries for a user
 * @param {string} account - User's wallet address
 */
export const cleanupDuplicateWithdrawals = (account) => {
  try {
    const key = `withdrawals_${account.toLowerCase()}`;
    const stored = localStorage.getItem(key);
    if (!stored) return;
    
    const withdrawals = JSON.parse(stored);
    // Withdrawals are stored as single objects per campaign, so no duplicates possible
    console.log(`Withdrawal data for ${account} is already clean`);
  } catch (error) {
    console.error("Error cleaning duplicate withdrawals:", error);
  }
};

/**
 * Clean all duplicate transaction data for a user
 * @param {string} account - User's wallet address
 */
export const cleanupAllDuplicates = (account) => {
  console.log(`Cleaning up duplicate transaction data for ${account}...`);
  cleanupDuplicateDonations(account);
  cleanupDuplicateWithdrawals(account);
  console.log(`Cleanup completed for ${account}`);
};