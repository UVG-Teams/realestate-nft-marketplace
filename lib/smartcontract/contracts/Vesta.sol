// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import "./VestaDNA.sol";
 
contract Vesta is ERC721, ERC721Enumerable, VestaDNA {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Vesta", "V") {}

    function mint() public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);
    }

    function tokenURI(uint256 tokenId) 
        public
        view
        override
        returns(string memory) 
    {
        require(
            _exists(tokenId),
            "ERC721 Metadata: URI query for nonexistent token"
        );

        // uint256 metad = get_house_info();

        string memory jsonURI = Base64.encode(
            bytes(
                string(
                    // abi.encodePacked(
                    //     '{"name": "Vesta #',
                    //     tokenId.toString(),
                    //     '", "description": "Vesta are houses stored on chain to transfer property", "image": "',
                    //     "https://gateway.pinata.cloud/ipfs/Qmde74qhgr2xTtaxBxG9aSEcugbfCVZm2ddkjEjywrnuWW",
                    //     '"}'

                    // abi.encodePacked(
                    //     '{"name": "Vesta #',
                    //     metad.toString(),
                    //     '", "description": "Vesta are houses stored on chain to transfer property", "image": "',
                    //     "https://gateway.pinata.cloud/ipfs/Qmde74qhgr2xTtaxBxG9aSEcugbfCVZm2ddkjEjywrnuWW",
                    //     '"}'
                    // )
                    

                    abi.encodePacked(
                        '{"name":"', "Vesta :)",
                        '","description":"', "Vesta is a property tokenization platform, represented as NFTs that live on the blockchain for easy transfer of ownership.",
                        '","image":"', "https://gateway.pinata.cloud/ipfs/QmbX4BNVdhRZJrecshrewWn93StaPZ3ku49RfwuF6HxdxD",
                        '","attributes":[{"trait_type":"Typology","value":"', userI.typology, '"},{"trait_type": "Year built","value":"', userI.yearBuilt.toString(), '"},{"trait_type": "Square meters","value":"', userI.sqm.toString(), '"},{"trait_type": "Rooms","value":"', userI.rooms.toString(), '"},{"trait_type": "Bathrooms","value":"', userI.bathrooms.toString(), '"},{"trait_type": "Levels","value":"', userI.levels.toString(), '"},{"trait_type": "Parkings","value":"', userI.parkings.toString(), '"},{"trait_type": "location","value":"', userI.location, '"}]}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    // Enumerable methods to list the tokens a user owns (Overrides required by solidity)
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // States that in addition to being 721 it is enumerable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
