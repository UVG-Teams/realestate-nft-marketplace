const deploy = async () => {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contract with the account: ", deployer.address);

    const Vesta = await ethers.getContractFactory("Vesta");
    const deployed = await Vesta.deploy();

    console.log("Vesta is deployed at: ", deployed.address);
}

deploy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1) // exit(1) indica el error
    });