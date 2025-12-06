import React, { useState, useEffect } from "react";
import { getReadOnlyContract } from "../config/contract";
import CampaignCard from "./CampaignCard";
import CampaignDetail from "./CampaignDetail";
import SearchBar from "./SearchBar";
import ActivityFeed from "./ActivityFeed";

const CampaignList = ({ account, refreshTrigger }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCampaigns();
  }, [refreshTrigger]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      const { contract } = await getReadOnlyContract();
      const allCampaigns = await contract.getAllCampaigns();
      
      // Reverse to show newest first
      setCampaigns([...allCampaigns].reverse());
    } catch (error) {
      console.error("Failed to load campaigns:", error);
      // Don't show alert, just set empty campaigns
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredCampaigns = () => {
    const now = Math.floor(Date.now() / 1000);
    
    let filtered = campaigns;
    
    // Filter by status
    switch (filter) {
      case "ACTIVE":
        filtered = campaigns.filter(
          (c) =>
            Number(c.deadline) > now &&
            Number(c.raisedAmount) < Number(c.goalAmount)
        );
        break;
      case "FUNDED":
        filtered = campaigns.filter(
          (c) => Number(c.raisedAmount) >= Number(c.goalAmount)
        );
        break;
      case "EXPIRED":
        filtered = campaigns.filter(
          (c) =>
            Number(c.deadline) <= now &&
            Number(c.raisedAmount) < Number(c.goalAmount)
        );
        break;
      case "MY_CAMPAIGNS":
        filtered = campaigns.filter(
          (c) => account && c.owner.toLowerCase() === account.toLowerCase()
        );
        break;
      default:
        filtered = campaigns;
    }
    
    return filtered;
  };

  let filteredCampaigns = getFilteredCampaigns();
  
  // Apply search filter
  if (searchTerm) {
    filteredCampaigns = filteredCampaigns.filter((c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.creatorInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading campaigns...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      
      <div style={styles.mainContent} className="campaign-list-main-content">
        <div style={styles.campaignsSection}>
          <div style={styles.filters}>
        {["ALL", "ACTIVE", "FUNDED", "EXPIRED", "MY_CAMPAIGNS"].map((f) => (
          <button
            key={f}
            style={{
              ...styles.filterBtn,
              ...(filter === f ? styles.filterBtnActive : {}),
            }}
            onClick={() => setFilter(f)}
            disabled={f === "MY_CAMPAIGNS" && !account}
          >
            {f === "MY_CAMPAIGNS" ? "MY CAMPAIGNS" : f}
          </button>
        ))}
      </div>

      {filteredCampaigns.length === 0 ? (
        <div style={styles.empty}>
          <div style={styles.emptyIcon}>📭</div>
          <h3>No campaigns found</h3>
          {filter === "MY_CAMPAIGNS" ? (
            <p>You haven't created any campaigns yet. Click "Create Campaign" to start!</p>
          ) : (
            <p>Be the first to create a campaign!</p>
          )}
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id.toString()}
              campaign={campaign}
              onClick={() => setSelectedCampaign(campaign)}
            />
          ))}
        </div>
      )}

        </div>
        
        <div style={styles.sidebar} className="campaign-list-sidebar">
          <ActivityFeed />
        </div>
      </div>

      {selectedCampaign && (
        <CampaignDetail
          campaign={selectedCampaign}
          account={account}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={() => {
            setSelectedCampaign(null);
            loadCampaigns();
          }}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  mainContent: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "2rem",
    alignItems: "start",
  },
  campaignsSection: {
    minWidth: 0,
  },
  sidebar: {
    position: "sticky",
    top: "100px",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "0.75rem 1.5rem",
    border: "2px solid #e5e7eb",
    background: "white",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.95rem",
    color: "#6b7280",
    transition: "all 0.3s",
  },
  filterBtnActive: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderColor: "transparent",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "2rem",
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

// Add media query styles
const mediaQueryStyle = document.createElement('style');
mediaQueryStyle.textContent = `
  @media (max-width: 1024px) {
    .campaign-list-main-content {
      grid-template-columns: 1fr !important;
    }
    .campaign-list-sidebar {
      position: static !important;
    }
  }
`;
if (!document.querySelector('[data-campaign-list-styles]')) {
  mediaQueryStyle.setAttribute('data-campaign-list-styles', 'true');
  document.head.appendChild(mediaQueryStyle);
}

export default CampaignList;
