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

    describe("Minting", () => {
        it('Mints a new token and assigns it to owner', async () => {
            const { owner, deployed } = await setup();

            await deployed.mint();

            const ownerOfMinted = await deployed.ownerOf(0)

            expect(ownerOfMinted).to.equal(owner.address)
        })

        it("Hasn't a limit supply", async () => {
            // const { deployed } = await setup();
            const { owner, deployed } = await setup();

            await Promise.all(new Array(11).fill().map(() => deployed.mint()))
            // await expect(deployed.mint()).to.be.revertedWith(
            //     "There are no PlatziPunks left :("
            // );
            expect(await deployed.balanceOf(owner.address)).to.equal(11);
        })
    })


    // tokenURI capaz de ser leido por cualquier marketplace
    describe("tokenURI", () => {
        it('Returns valid metadata', async () => {
            const { deployed } = await setup();

            await deployed.mint();

            const tokenURI = await deployed.tokenURI(0);
            const stringifiedTokenURI = await tokenURI.toString();
            const [, base64JSON] = stringifiedTokenURI.split('data:application/json;base64,');
            const strigifiedMetadata = await Buffer.from(base64JSON, 'base64').toString('ascii');

            const metadata = JSON.parse(strigifiedMetadata);
            expect(metadata).to.have.all.keys('name', 'description', 'image', 'attributes');

        })
    })
});