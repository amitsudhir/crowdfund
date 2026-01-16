import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CATEGORIES } from "../config/config";

const SearchBar = ({ searchTerm, onSearch, categoryFilter, onCategoryChange, account }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCreateCampaign = () => {
    if (!account) {
      toast.error("Please connect your wallet to create a campaign");
      return;
    }
    navigate('/create');
  };

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCategoryLabel = () => {
    return categoryFilter === "ALL" ? "All Categories" : categoryFilter;
  };

  return (
    <>
      <style>
        {`
          .dropdown-item:hover {
            background: #f3f4f6 !important;
          }
          .dropdown-item.active:hover {
            background: #5568d3 !important;
          }
        `}
      </style>
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
        
        <div style={styles.categoryFilter} ref={dropdownRef}>
          <button
            style={styles.categorySelect}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {getCategoryLabel()}
            <span style={styles.arrow}>{isDropdownOpen ? "▲" : "▼"}</span>
          </button>
          
          {isDropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div
                className={`dropdown-item ${categoryFilter === "ALL" ? "active" : ""}`}
                style={{
                  ...styles.dropdownItem,
                  ...(categoryFilter === "ALL" ? styles.dropdownItemActive : {}),
                }}
                onClick={() => handleCategorySelect("ALL")}
              >
                All Categories
              </div>
              {CATEGORIES.map((category) => (
                <div
                  key={category}
                  className={`dropdown-item ${categoryFilter === category ? "active" : ""}`}
                  style={{
                    ...styles.dropdownItem,
                    ...(categoryFilter === category ? styles.dropdownItemActive : {}),
                  }}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
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
    </>
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
    position: "relative",
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
    minWidth: "180px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
  },
  arrow: {
    fontSize: "0.7rem",
    color: "#6b7280",
  },
  dropdownMenu: {
    position: "absolute",
    top: "calc(100% + 0.5rem)",
    left: 0,
    right: 0,
    background: "white",
    border: "2px solid #e5e7eb",
    borderRadius: "15px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    zIndex: 1000,
    maxHeight: "300px",
    overflowY: "auto",
    padding: "0.5rem",
  },
  dropdownItem: {
    padding: "0.75rem 1rem",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#4b5563",
    cursor: "pointer",
    transition: "all 0.2s",
    marginBottom: "0.25rem",
  },
  dropdownItemActive: {
    background: "#667eea",
    color: "white",
    fontWeight: "600",
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
