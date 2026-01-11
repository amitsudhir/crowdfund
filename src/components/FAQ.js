import React, { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Where is the donated money stored?",
      answer: "All donated funds are stored directly in the smart contract on the Base blockchain. The funds are held securely in the contract until the campaign owner withdraws them or donors request refunds if the campaign fails to meet its goals."
    },
    {
      question: "Can campaign owners misuse funds?",
      answer: "Campaign owners can withdraw funds once their campaign reaches its goal, but they must provide proof of utilization. The blockchain ensures transparency - all transactions are publicly visible and verifiable. However, donors should still evaluate campaigns carefully before contributing."
    },
    {
      question: "What happens if a campaign fails?",
      answer: "If a campaign doesn't reach its funding goal by the deadline, donors can request refunds directly from the smart contract. The refund process is automated and doesn't require approval from the campaign owner or any central authority."
    },
    {
      question: "How are refunds handled?",
      answer: "Refunds are processed automatically through the smart contract. If a campaign fails to reach its goal, donors can call the refund function to get their money back. The process is trustless and doesn't require manual intervention."
    },
    {
      question: "How is proof of utilisation stored?",
      answer: "Campaign owners must upload proof of how they used the funds (receipts, photos, documents) to IPFS (InterPlanetary File System). The IPFS hash is then stored on the blockchain, ensuring the proof is permanent and tamper-proof."
    },
    {
      question: "Is there any central authority?",
      answer: "No, RaiseX is completely decentralized. There's no central authority that can freeze funds, censor campaigns, or interfere with transactions. Everything is governed by smart contracts on the blockchain, ensuring trustless operation."
    },
    {
      question: "Which blockchain is used?",
      answer: "RaiseX operates on Base Sepolia (testnet) for development and testing. Base is an Ethereum Layer 2 solution that offers fast transactions and low fees while maintaining the security of Ethereum."
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Frequently Asked Questions</h1>
        <p style={styles.subtitle}>
          Everything you need to know about RaiseX and decentralized crowdfunding
        </p>
      </div>

      <div style={styles.faqContainer}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <button
              style={{
                ...styles.question,
                ...(openIndex === index ? styles.questionActive : {}),
              }}
              onClick={() => toggleAccordion(index)}
            >
              <span>{faq.question}</span>
              <span style={{
                ...styles.icon,
                transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
              }}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div style={styles.answer}>
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.contact}>
        <h3 style={styles.contactTitle}>Still have questions?</h3>
        <p style={styles.contactText}>
          RaiseX is an open-source project. You can explore the code, contribute, or ask questions in our community.
        </p>
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
    fontSize: "1.2rem",
    color: "#6b7280",
    margin: 0,
  },
  faqContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "3rem",
  },
  faqItem: {
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  question: {
    width: "100%",
    padding: "1.5rem",
    background: "none",
    border: "none",
    textAlign: "left",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1f2937",
    transition: "background-color 0.3s ease",
  },
  questionActive: {
    background: "#f9fafb",
  },
  icon: {
    fontSize: "0.8rem",
    color: "#667eea",
    transition: "transform 0.3s ease",
  },
  answer: {
    padding: "0 1.5rem 1.5rem",
    borderTop: "1px solid #e5e7eb",
    background: "#f9fafb",
  },
  contact: {
    textAlign: "center",
    padding: "2rem",
    background: "rgba(102, 126, 234, 0.1)",
    borderRadius: "12px",
  },
  contactTitle: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1f2937",
    margin: "0 0 1rem 0",
  },
  contactText: {
    fontSize: "1rem",
    color: "#6b7280",
    margin: 0,
  },
};

export default FAQ;