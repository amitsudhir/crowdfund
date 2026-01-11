import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getReadOnlyContract } from "../config/contract";
import { CURRENCY, ethToInr } from "../config/config";

const ActivityFeed = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
    const interval = setInterval(loadActivities, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadActivities = async () => {
    try {
      const { contract, provider } = await getReadOnlyContract();
      
      // Get recent donation events
      const filter = contract.filters.DonationReceived();
      const events = await contract.queryFilter(filter, -1000); // Last 1000 blocks
      
      const recentActivities = events.slice(-10).reverse().map((event) => ({
        type: "donation",
        campaignId: event.args.campaignId.toString(),
        donor: event.args.donor,
        amount: ethers.formatEther(event.args.amount),
        timestamp: Date.now(), // Approximate
      }));

      setActivities(recentActivities);
    } catch (error) {
      console.error("Failed to load activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const shortenAddress = (addr) => {
    return addr.slice(0, 6) + "..." + addr.slice(-4);
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Recent Activity</h3>
      
      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : activities.length === 0 ? (
        <div style={styles.empty}>No recent activity</div>
      ) : (
        <div style={styles.list}>
          {activities.map((activity, index) => (
            <div key={index} style={styles.activityItem}>
              <div style={styles.activityContent}>
                <div style={styles.activityText}>
                  <strong>{shortenAddress(activity.donor)}</strong> donated{" "}
                  <strong>{CURRENCY.symbol}{ethToInr(activity.amount)}</strong> to
                  Campaign #{activity.campaignId}
                </div>
                <div style={styles.activityTime}>Just now</div>
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
    background: "white",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "1rem",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  activityItem: {
    display: "flex",
    gap: "1rem",
    padding: "0.75rem",
    background: "#f9fafb",
    borderRadius: "10px",
    alignItems: "center",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: "0.95rem",
    color: "#1f2937",
    marginBottom: "0.25rem",
  },
  activityTime: {
    fontSize: "0.8rem",
    color: "#9ca3af",
  },
  loading: {
    textAlign: "center",
    padding: "2rem",
    color: "#6b7280",
  },
  empty: {
    textAlign: "center",
    padding: "2rem",
    color: "#9ca3af",
  },
};

export default ActivityFeed;
