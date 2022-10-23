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

        it(“Doesn’t have a limit supply", async () => {
            const { owner, deployed } = await setup();

            await Promise.all(new Array(11).fill().map(() => deployed.mint()))

            expect(await deployed.balanceOf(owner.address)).to.equal(11);
        })

        it("Increment the balance by 1 every mint", async () => {
            const { owner, deployed } = await setup();

            expect(await deployed.balanceOf(owner.address)).to.equal(0);

            await Promise.all(new Array(8).fill().map(() => deployed.mint()))

            expect(await deployed.balanceOf(owner.address)).to.equal(8);
        });

        it("Transfer tokens between accounts", async () => {
            // const { owner, deployed } = await setup();
            const Vesta = await ethers.getContractFactory("Vesta");
            const deployed = await Vesta.deploy();
            const [owner, addr1, addr2] = await ethers.getSigners();

            await deployed.mint()
            await deployed.mint()
            expect(await deployed.balanceOf(owner.address)).to.equal(2);
        
            await deployed.transferFrom(owner.address, addr1.address, 0);
            expect(await deployed.balanceOf(owner.address)).to.equal(1);
            expect(await deployed.balanceOf(addr1.address)).to.equal(1);
        
            await deployed.connect(addr1).transferFrom(addr1.address, addr2.address, 0);
            expect(await deployed.balanceOf(addr1.address)).to.equal(0);
            expect(await deployed.balanceOf(addr2.address)).to.equal(1);
        });
    })

    describe("Token URI", () => {
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