import React from "react";

const Privacy = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Privacy Policy</h1>
        <p style={styles.subtitle}>
          Last updated: January 2024
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
          <p style={styles.text}>
            RaiseX is a decentralized application. We do not collect personal information in the traditional sense.
            All data is stored on the blockchain and is publicly accessible. This includes wallet addresses,
            campaign information, and transaction history.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. How We Use Information</h2>
          <p style={styles.text}>
            The platform uses blockchain data to display campaigns, track donations, and facilitate refunds.
            No personal data is processed by our servers as the application runs entirely on the blockchain.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. Data Storage</h2>
          <p style={styles.text}>
            All campaign data, including images and proof documents, are stored on IPFS (InterPlanetary File System).
            Transaction data is stored on the Base blockchain. This data is permanent and cannot be deleted.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Third-Party Services</h2>
          <p style={styles.text}>
            RaiseX integrates with MetaMask and other Web3 wallets for blockchain interactions.
            Please review their respective privacy policies for information about how they handle your data.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Your Rights</h2>
          <p style={styles.text}>
            As a decentralized application, traditional data protection rights may not apply.
            However, you have full control over your wallet and can choose what information to share when creating campaigns.
          </p>
        </div>

        <div style={styles.placeholder}>
          <h3 style={styles.placeholderTitle}>Content Coming Soon</h3>
          <p style={styles.placeholderText}>
            Detailed privacy policy will be added here. This is a placeholder for the full privacy document
            that will cover all aspects of data handling in the RaiseX platform.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem 1rem",
    minHeight: "calc(100vh - 200px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 1rem 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  section: {
    background: "white",
    padding: "2rem",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 1rem 0",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#4b5563",
    margin: 0,
  },
  placeholder: {
    background: "rgba(102, 126, 234, 0.1)",
    padding: "2rem",
    borderRadius: "12px",
    textAlign: "center",
  },
  placeholderTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 1rem 0",
  },
  placeholderText: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
};

export default Privacy;