async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Coinflip = await ethers.getContractFactory("Coinflip");
    const coinflip = await Coinflip.deploy();

    console.log("Coinflip deployed to:", coinflip.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });