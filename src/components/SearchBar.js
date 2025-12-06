import React from "react";

const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <div style={styles.container}>
      <div style={styles.searchBox}>
        <span style={styles.icon}>🔍</span>
        <input
          type="text"
          placeholder="Search campaigns by title, category, or creator..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={styles.input}
        />
        {searchTerm && (
          <button style={styles.clearBtn} onClick={() => onSearch("")}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginBottom: "2rem",
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
  },
  icon: {
    fontSize: "1.25rem",
    marginRight: "0.75rem",
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
};

export default SearchBar;
