require("dotenv").config();
const ethers = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = process.env.CONTRACT_ADDRESS;

  const abi = [
    "function buyTokens(address beneficiary) payable"
  ];

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  const beneficiary = wallet.address;
  const valueInEth = "0.01";
  const value = ethers.parseEther(valueInEth);

  const tx = await contract.buyTokens(beneficiary, { value });
  console.log("⛽ Giao dịch gửi đi:", tx.hash);

  const receipt = await tx.wait();
  console.log("✅ Xác nhận:", receipt.transactionHash);
}

main().catch(console.error);
