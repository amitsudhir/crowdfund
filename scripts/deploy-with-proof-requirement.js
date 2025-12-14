const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying Crowdfund contract with mandatory proof requirement...");

  // Get the contract factory
  const Crowdfund = await ethers.getContractFactory("Crowdfund");

  // Deploy the contract
  const crowdfund = await Crowdfund.deploy();
  await crowdfund.waitForDeployment();

  const contractAddress = await crowdfund.getAddress();
  console.log("✅ Crowdfund contract deployed to:", contractAddress);

  // Verify deployment
  console.log("🔍 Verifying deployment...");
  const campaignCount = await crowdfund.campaignCount();
  console.log("📊 Initial campaign count:", campaignCount.toString());

  console.log("\n📋 Contract Details:");
  console.log("- Address:", contractAddress);
  console.log("- Network: Base Sepolia");
  console.log("- Features: Multi-campaign crowdfunding with mandatory proof requirement");
  console.log("- Proof System: IPFS-based fund utilization proofs required before withdrawal");

  console.log("\n⚠️  IMPORTANT: Update your frontend config with the new contract address!");
  console.log("Update src/config/contract.js with:", contractAddress);

  return contractAddress;
}

main()
  .then((address) => {
    console.log("\n🎉 Deployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });