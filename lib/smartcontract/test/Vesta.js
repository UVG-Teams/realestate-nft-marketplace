const { expect } = require('chai');


describe("Vesta Contract", () => {
    const setup = async () => {
        const [owner] = await ethers.getSigners();
        const Vesta = await ethers.getContractFactory("Vesta");
        const deployed = await Vesta.deploy();
    
        return {
            owner,
            deployed,
        };
    };

    describe("Deployment", () => {
        it("Sets max supply to passed param", async () => {
          const maxSupply = 10000;
    
          const { deployed } = await setup({ maxSupply });
    
          const returnedMaxSupply = await deployed;
          expect(deployed).to.equal(returnedMaxSupply);
        });
    });
});