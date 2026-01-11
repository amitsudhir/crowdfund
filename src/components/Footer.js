import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.sections}>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>About RaiseX</h4>
            <p style={styles.sectionText}>
              RaiseX — Trust, Raised on Chain. A decentralized crowdfunding platform built on blockchain technology. 
              We enable transparent, secure, and trustless fundraising for causes that matter.
            </p>
          </div>
          
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Quick Links</h4>
            <div style={styles.links}>
              <Link to="/faq" style={styles.link}>FAQ</Link>
              <Link to="/terms" style={styles.link}>Terms & Conditions</Link>
              <Link to="/privacy" style={styles.link}>Privacy Policy</Link>
            </div>
          </div>
          
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Connect</h4>
            <div style={styles.socialLinks}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div style={styles.bottom}>
          <div style={styles.bottomText}>
            Built with blockchain technology — RaiseX
          </div>
          <div style={styles.bottomText}>
            © 2024 RaiseX. Decentralized and open source.
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
    color: "white",
    marginTop: "4rem",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 1rem 1rem",
  },
  sections: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: "600",
    margin: 0,
    color: "#f9fafb",
  },
  sectionText: {
    fontSize: "0.9rem",
    lineHeight: "1.6",
    color: "#d1d5db",
    margin: 0,
  },
  links: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  link: {
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.3s ease",
  },
  socialLinks: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#d1d5db",
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.3s ease",
  },
  bottom: {
    borderTop: "1px solid #374151",
    paddingTop: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
  },
  bottomText: {
    fontSize: "0.85rem",
    color: "#9ca3af",
  },
};

export default Footer;