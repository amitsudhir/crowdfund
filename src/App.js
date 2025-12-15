import React, { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";
import CreateCampaign from "./components/CreateCampaign";
import Analytics from "./components/Analytics";
import MyDonations from "./components/MyDonations";
import MyWithdrawals from "./components/MyWithdrawals";
import MyCampaigns from "./components/MyCampaigns";
import SetupChecker from "./components/SetupChecker";

function App() {
  const [account, setAccount] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    checkWalletConnection();
    
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setAccount(null);
    } else {
      setAccount(accounts[0]);
    }
  };

  const checkWalletConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to check wallet connection:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask!");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      toast.success("Wallet connected successfully! 🎉");
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet: " + error.message);
    }
  };

  const handleCreateSuccess = () => {
    setShowCreateModal(false);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="App">
      <Navbar account={account} onConnect={connectWallet} />

      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.mainTitle}>
            Welcome to CrowdFund Platform 🚀
          </h1>
          <p style={styles.subtitle}>
            Create campaigns, support causes, and make a difference
          </p>
        </div>

        <div style={styles.tabs}>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "campaigns" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("campaigns")}
          >
            📋 All Campaigns
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "myCampaigns" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("myCampaigns")}
          >
            🎯 My Campaigns
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "donations" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("donations")}
          >
            💝 My Donations
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "withdrawals" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("withdrawals")}
          >
            💰 My Withdrawals
          </button>
          <button
            style={{
              ...styles.tab,
              ...(activeTab === "analytics" ? styles.tabActive : {}),
            }}
            onClick={() => setActiveTab("analytics")}
          >
            📊 Analytics
          </button>
          <button
            style={styles.createBtn}
            onClick={() => setShowCreateModal(true)}
          >
            ➕ Create Campaign
          </button>
        </div>

        <SetupChecker />
        
        {activeTab === "campaigns" && (
          <CampaignList account={account} refreshTrigger={refreshTrigger} />
        )}
        {activeTab === "myCampaigns" && <MyCampaigns account={account} />}
        {activeTab === "donations" && <MyDonations account={account} />}
        {activeTab === "withdrawals" && <MyWithdrawals account={account} />}
        {activeTab === "analytics" && <Analytics />}
      </div>

      {showCreateModal && (
        <CreateCampaign
          onSuccess={handleCreateSuccess}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    position: "relative",
    zIndex: 1,
  },
  header: {
    textAlign: "center",
    padding: "3rem 1rem 2rem",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "0 0 30px 30px",
    color: "#2d1b69",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  },
  mainTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    margin: "0 0 1rem 0",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "1.25rem",
    opacity: 0.8,
    margin: 0,
    color: "#4c1d95",
  },
  tabs: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem 0",
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  tab: {
    padding: "0.75rem 1.5rem",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    color: "#4c1d95",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
  },
  tabActive: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderColor: "transparent",
    transform: "translateY(-2px)",
    boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
  },
  createBtn: {
    marginLeft: "auto",
    padding: "0.75rem 1.5rem",
    border: "none",
    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    color: "white",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
    transition: "all 0.3s ease",
  },
};

export default App;