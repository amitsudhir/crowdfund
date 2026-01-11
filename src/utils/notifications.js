// Browser notification utility for RaiseX
import { toast } from "react-toastify";

class NotificationManager {
  constructor() {
    this.permission = null;
    this.checkPermission();
  }

  // Check current notification permission
  checkPermission() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
    }
    return this.permission;
  }

  // Request notification permission
  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      this.permission = permission;
      return permission;
    }
    return 'denied';
  }

  // Show browser notification if permission granted, fallback to toast
  async showNotification(title, options = {}) {
    // Always show toast notification as primary method
    const toastOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    // Determine toast type based on title/options
    if (title.includes('successful') || title.includes('confirmed') || options.type === 'success') {
      toast.success(title, toastOptions);
    } else if (title.includes('failed') || title.includes('error') || options.type === 'error') {
      toast.error(title, toastOptions);
    } else if (title.includes('submitted') || title.includes('processing') || options.type === 'info') {
      toast.info(title, toastOptions);
    } else {
      toast(title, toastOptions);
    }

    // Also try browser notification if permission granted
    if (this.permission === 'granted' && 'Notification' in window) {
      try {
        const notification = new Notification(title, {
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          ...options
        });

        // Auto close browser notification after 5 seconds
        setTimeout(() => {
          notification.close();
        }, 5000);

        return notification;
      } catch (error) {
        console.log('Browser notification failed:', error);
      }
    }
  }

  // Transaction-specific notifications
  async notifyTransactionSubmitted(txHash) {
    return this.showNotification(
      `Transaction submitted! Hash: ${txHash.slice(0, 10)}...`,
      {
        type: 'info',
        body: 'Your transaction has been submitted to the blockchain. Waiting for confirmation...',
        tag: 'transaction-submitted'
      }
    );
  }

  async notifyTransactionConfirmed(type, details = {}) {
    const messages = {
      donation: 'Donation confirmed on blockchain!',
      withdrawal: 'Withdrawal confirmed on blockchain!',
      refund: 'Refund confirmed on blockchain!',
      campaign: 'Campaign created successfully!',
      proof: 'Proof uploaded successfully!'
    };

    return this.showNotification(
      messages[type] || 'Transaction confirmed!',
      {
        type: 'success',
        body: details.body || 'Your transaction has been successfully confirmed.',
        tag: `transaction-confirmed-${type}`
      }
    );
  }

  async notifyTransactionFailed(error, type = 'transaction') {
    let message = 'Transaction failed';
    
    if (error.includes('User rejected')) {
      message = 'Transaction cancelled by user';
    } else if (error.includes('insufficient funds')) {
      message = 'Insufficient funds for transaction';
    } else if (error.includes('gas')) {
      message = 'Gas estimation failed';
    }

    return this.showNotification(
      message,
      {
        type: 'error',
        body: error,
        tag: `transaction-failed-${type}`
      }
    );
  }

  // Connection notifications
  async notifyWalletConnected(address) {
    return this.showNotification(
      'Wallet connected successfully!',
      {
        type: 'success',
        body: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        tag: 'wallet-connected'
      }
    );
  }

  async notifyNetworkSwitch(networkName) {
    return this.showNotification(
      `Switched to ${networkName}`,
      {
        type: 'info',
        body: 'Network changed successfully',
        tag: 'network-switch'
      }
    );
  }
}

// Create singleton instance
const notificationManager = new NotificationManager();

export default notificationManager;

// Helper functions for easy use
export const requestNotificationPermission = () => notificationManager.requestPermission();
export const showNotification = (title, options) => notificationManager.showNotification(title, options);
export const notifyTransactionSubmitted = (txHash) => notificationManager.notifyTransactionSubmitted(txHash);
export const notifyTransactionConfirmed = (type, details) => notificationManager.notifyTransactionConfirmed(type, details);
export const notifyTransactionFailed = (error, type) => notificationManager.notifyTransactionFailed(error, type);
export const notifyWalletConnected = (address) => notificationManager.notifyWalletConnected(address);
export const notifyNetworkSwitch = (networkName) => notificationManager.notifyNetworkSwitch(networkName);