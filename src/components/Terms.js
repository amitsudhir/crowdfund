import React from "react";

const Terms = () => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Terms & Conditions</h1>
        <p style={styles.subtitle}>
          Last updated: January 2024
        </p>
      </div>

      <div style={styles.content}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>1. Acceptance of Terms</h2>
          <p style={styles.text}>
            By accessing and using RaiseX, you accept and agree to be bound by the terms and provision of this agreement.
            This is a decentralized application (dApp) running on blockchain technology.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>2. Description of Service</h2>
          <p style={styles.text}>
            RaiseX is a decentralized crowdfunding platform that allows users to create and support campaigns using blockchain technology.
            All transactions are processed through smart contracts on the Base blockchain.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>3. User Responsibilities</h2>
          <p style={styles.text}>
            Users are responsible for their own actions on the platform, including but not limited to:
            creating legitimate campaigns, providing accurate information, and using funds as described in their campaigns.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>4. Disclaimer</h2>
          <p style={styles.text}>
            RaiseX is provided "as is" without any warranties. Users interact with smart contracts at their own risk.
            The platform does not guarantee the success of any campaign or the proper use of funds by campaign creators.
          </p>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>5. Limitation of Liability</h2>
          <p style={styles.text}>
            The RaiseX platform and its developers shall not be liable for any direct, indirect, incidental, special,
            consequential, or punitive damages resulting from your use of the service.
          </p>
        </div>

        <div style={styles.placeholder}>
          <h3 style={styles.placeholderTitle}>Content Coming Soon</h3>
          <p style={styles.placeholderText}>
            Detailed terms and conditions will be added here. This is a placeholder for the full legal document
            that will cover all aspects of using the RaiseX platform.
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

export default Terms;