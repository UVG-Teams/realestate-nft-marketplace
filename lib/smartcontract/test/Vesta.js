const { expect } = require('chai');


describe("Vesta Contract", () => {
    const setup = async () => {
        // owner and deployer
        const [owner] = await ethers.getSigners();
        // Smart contract declaration
        const Vesta = await ethers.getContractFactory("Vesta");
        // Deploy smart contract
        const deployed = await Vesta.deploy();
    
        return {
            owner,
            deployed,
        };
    };

    // Test cases
    describe("Deployment", () => {
        it("Does not set the maximum supply", async () => {
          const { deployed } = await setup();
    
          const returnedMaxSupply = await deployed.maxSupply;
          expect(undefined).to.equal(returnedMaxSupply);
        });
    });
});