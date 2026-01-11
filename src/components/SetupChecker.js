import React from "react";

const SetupChecker = ({ account }) => {
  // Only show message if no wallet is connected
  if (account) {
    return null;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.title}>Connect Your Wallet</h3>
        <p style={styles.subtitle}>
          Please connect your wallet to start using RaiseX
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "0 1rem",
  },
  card: {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "25px",
    padding: "3rem 2rem",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    margin: "0 0 1rem 0",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#4c1d95",
    margin: "0 0 1.5rem 0",
    opacity: 0.8,
  },
  helpText: {
    fontSize: "0.95rem",
    color: "#6b46c1",
    margin: 0,
    opacity: 0.7,
  },
};

export default SetupChecker;
