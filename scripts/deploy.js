const hre = require("hardhat");


async function main() {
  const Web3ModalDemo = await hre.ethers.getContractFactory("Web3modalDemo");
  const web3modalDemo = await Web3ModalDemo.deploy();
  await web3modalDemo.deployed();
  console.log(
    `web3modal Demo deployed to ${web3modalDemo.address}`
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
