const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying Crowdfund contract with mandatory proof requirement...");

  // Get the contract factory
  const Crowdfund = await ethers.getContractFactory("Crowdfund");

  // Deploy the contract
  const crowdfund = await Crowdfund.deploy();
  await crowdfund.waitForDeployment();

  const contractAddress = await crowdfund.getAddress();
  console.log("Crowdfund contract deployed to:", contractAddress);

  // Verify deployment
  console.log("Verifying deployment...");
  const campaignCount = await crowdfund.campaignCount();
  console.log("Initial campaign count:", campaignCount.toString());

  console.log("\nContract Details:");
  console.log("- Address:", contractAddress);
  console.log("- Network: Base Sepolia");
  console.log("- Features: Multi-campaign crowdfunding with mandatory proof requirement");
  console.log("- Proof System: IPFS-based fund utilization proofs required before withdrawal");

  console.log("\nIMPORTANT: Update your frontend config with the new contract address!");
  console.log("Update src/config/contract.js with:", contractAddress);

  return contractAddress;
}

main()
  .then(() => {
    console.log("\nDeployment completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Deployment failed:", error);
    process.exit(1);
  });