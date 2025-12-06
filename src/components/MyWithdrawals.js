import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getReadOnlyContract } from "../config/contract";
import { CURRENCY, ethToInr } from "../config/config";

const MyWithdrawals = ({ account }) => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (account) {
      loadWithdrawals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const loadWithdrawals = async () => {
    try {
      setLoading(true);
      const { contract } = await getReadOnlyContract();
      
      // Get all campaigns
      const allCampaigns = await contract.getAllCampaigns();
      
      // Filter campaigns owned by user that have been withdrawn
      const myWithdrawnCampaigns = allCampaigns.filter(
        (c) => 
          c.owner.toLowerCase() === account.toLowerCase() && 
          c.withdrawn === true
      );

      // If no withdrawn campaigns, return early
      if (myWithdrawnCampaigns.length === 0) {
        setWithdrawals([]);
        setLoading(false);
        return;
      }

      // Get withdrawal events - try multiple strategies
      const filter = contract.filters.FundsWithdrawn();
      let events = [];
      
      // Strategy 1: Try to get events from contract deployment
      try {
        console.log("Fetching withdrawal events from contract deployment...");
        events = await contract.queryFilter(filter, 0, "latest");
        console.log("Found events:", events.length);
      } catch (error) {
        console.log("Strategy 1 failed, trying recent blocks:", error);
        
        // Strategy 2: Try last 500,000 blocks (Base Sepolia is fast, this covers months)
        try {
          events = await contract.queryFilter(filter, -500000, "latest");
          console.log("Found events in recent blocks:", events.length);
        } catch (err) {
          console.log("Strategy 2 failed, trying smaller range:", err);
          
          // Strategy 3: Try last 50,000 blocks
          try {
            events = await contract.queryFilter(filter, -50000, "latest");
            console.log("Found events in smaller range:", events.length);
          } catch (err2) {
            console.log("All strategies failed, using campaign data:", err2);
          }
        }
      }
      
      // If we found events, process them
      if (events.length > 0) {
        const withdrawalData = events
          .filter((event) => 
            event.args.owner.toLowerCase() === account.toLowerCase()
          )
          .map((event) => {
            const campaign = allCampaigns.find(
              (c) => c.id.toString() === event.args.campaignId.toString()
            );
            return {
              campaignId: event.args.campaignId.toString(),
              campaignTitle: campaign?.title || "Unknown Campaign",
              amount: ethers.formatEther(event.args.amount),
              txHash: event.transactionHash,
            };
          })
          .reverse();

        setWithdrawals(withdrawalData);
      } else {
        // No events found, use campaign data as fallback
        const withdrawalData = myWithdrawnCampaigns.map((campaign) => ({
          campaignId: campaign.id.toString(),
          campaignTitle: campaign.title,
          amount: ethers.formatEther(campaign.raisedAmount),
          txHash: "N/A",
        }));

        setWithdrawals(withdrawalData);
      }
    } catch (error) {
      console.error("Failed to load withdrawals:", error);
      setWithdrawals([]);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>🔐</div>
          <h3>Connect Your Wallet</h3>
          <p>Please connect your wallet to view your withdrawal history</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loading}>
          <div style={styles.spinner}></div>
          <p>Loading withdrawal history...</p>
        </div>
      </div>
    );
  }

  const totalWithdrawn = withdrawals.reduce(
    (sum, w) => sum + parseFloat(w.amount),
    0
  );

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>💰 My Withdrawals</h2>
        <div style={styles.totalBox}>
          <div style={styles.totalLabel}>Total Withdrawn</div>
          <div style={styles.totalAmount}>
            {CURRENCY.symbol}{ethToInr(totalWithdrawn.toFixed(4))}
          </div>
          <div style={styles.totalEth}>{totalWithdrawn.toFixed(4)} ETH</div>
        </div>
      </div>

      {withdrawals.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No Withdrawals Yet</h3>
          <p>
            When your campaigns reach their goals, you can withdraw the funds here.
          </p>
        </div>
      ) : (
        <div style={styles.list}>
          {withdrawals.map((withdrawal, index) => (
            <div key={index} style={styles.card}>
              <div style={styles.cardHeader}>
                <div style={styles.campaignInfo}>
                  <div style={styles.campaignTitle}>
                    {withdrawal.campaignTitle}
                  </div>
                  <div style={styles.campaignId}>
                    Campaign #{withdrawal.campaignId}
                  </div>
                </div>
                <div style={styles.badge}>✅ Withdrawn</div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.amountSection}>
                  <div style={styles.amountLabel}>Amount Withdrawn</div>
                  <div style={styles.amount}>
                    {CURRENCY.symbol}{ethToInr(withdrawal.amount)}
                  </div>
                  <div style={styles.ethAmount}>{withdrawal.amount} ETH</div>
                </div>

                <div style={styles.details}>
                  {withdrawal.txHash !== "N/A" ? (
                    <>
                      <a
                        href={`https://sepolia.basescan.org/tx/${withdrawal.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={styles.viewTxButton}
                      >
                        🔗 View Transaction on BaseScan
                      </a>
                      <div style={styles.txHash}>
                        {withdrawal.txHash.slice(0, 20)}...{withdrawal.txHash.slice(-20)}
                      </div>
                    </>
                  ) : (
                    <div style={styles.historicalNote}>
                      ℹ️ Historical withdrawal - Transaction details not available in recent blocks
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1f2937",
    margin: 0,
  },
  totalBox: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    padding: "1.5rem 2rem",
    borderRadius: "15px",
    color: "white",
    textAlign: "right",
  },
  totalLabel: {
    fontSize: "0.9rem",
    opacity: 0.9,
    marginBottom: "0.5rem",
  },
  totalAmount: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.25rem",
  },
  totalEth: {
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  list: {
    display: "grid",
    gap: "1.5rem",
  },
  card: {
    background: "white",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    border: "2px solid #e5e7eb",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e5e7eb",
  },
  campaignInfo: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  campaignId: {
    fontSize: "0.9rem",
    color: "#6b7280",
  },
  badge: {
    background: "#d1fae5",
    color: "#065f46",
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  cardBody: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
  },
  amountSection: {
    background: "#f9fafb",
    padding: "1.5rem",
    borderRadius: "12px",
  },
  amountLabel: {
    fontSize: "0.9rem",
    color: "#6b7280",
    marginBottom: "0.5rem",
  },
  amount: {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#10b981",
    marginBottom: "0.25rem",
  },
  ethAmount: {
    fontSize: "1rem",
    color: "#6b7280",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    justifyContent: "center",
  },
  viewTxButton: {
    display: "block",
    padding: "1rem 1.5rem",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    textDecoration: "none",
    borderRadius: "12px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "transform 0.2s",
    cursor: "pointer",
  },
  txHash: {
    fontSize: "0.85rem",
    color: "#6b7280",
    wordBreak: "break-all",
    padding: "0.75rem",
    background: "#f9fafb",
    borderRadius: "8px",
    fontFamily: "monospace",
  },
  historicalNote: {
    padding: "1.5rem",
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: "12px",
    fontSize: "0.95rem",
    textAlign: "center",
    lineHeight: "1.6",
  },
  loading: {
    textAlign: "center",
    padding: "4rem 1rem",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #f3f4f6",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    margin: "0 auto 1rem",
  },
  empty: {
    textAlign: "center",
    padding: "4rem 1rem",
    color: "#6b7280",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
};

export default MyWithdrawals;
