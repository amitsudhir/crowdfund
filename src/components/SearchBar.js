import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES } from "../config/config";

const SearchBar = ({ searchTerm, onSearch, categoryFilter, onCategoryChange, account }) => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    if (!account) {
      toast.error("Please connect your wallet to create a campaign");
      return;
    }
    navigate('/create');
  };

  return (
    <div style={styles.container}>
      <div style={styles.searchRow}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search campaigns by title, category, or creator..."
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            style={styles.input}
          />
          {searchTerm && (
            <button style={styles.clearBtn} onClick={() => onSearch("")}>
              X
            </button>
          )}
        </div>
        
        <div style={styles.categoryFilter}>
          <select
            style={styles.categorySelect}
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="ALL">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div style={styles.createButtonContainer}>
        <button 
          style={{
            ...styles.createBtn,
            ...(account ? {} : styles.createBtnDisabled),
          }}
          onClick={handleCreateCampaign}
        >
          Create Campaign {!account && "(Connect Wallet)"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "2rem",
  },
  searchRow: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "1.5rem",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "25px",
    padding: "0.75rem 1.5rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    flex: 1,
    minWidth: "300px",
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "1rem",
    background: "transparent",
  },
  clearBtn: {
    background: "none",
    border: "none",
    fontSize: "1.25rem",
    cursor: "pointer",
    color: "#9ca3af",
    padding: "0.25rem",
  },
  categoryFilter: {
    display: "flex",
    alignItems: "center",
  },
  categorySelect: {
    padding: "0.75rem 1rem",
    border: "2px solid #e5e7eb",
    borderRadius: "25px",
    background: "white",
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#6b7280",
    cursor: "pointer",
    minWidth: "150px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
  },
  createButtonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  createBtn: {
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "25px",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
    whiteSpace: "nowrap",
  },
  createBtnDisabled: {
    background: "#d1d5db",
    color: "#9ca3af",
    cursor: "not-allowed",
    boxShadow: "none",
  },
};

export default SearchBar;
