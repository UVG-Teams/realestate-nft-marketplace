// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Base64.sol";
import "./VestaDNA.sol";


/// @title Vesta
/// @author Gian Luca Rivera
/// @notice Provides the necessary functions to generate an NFT with metadata
/// @dev Inherits ERC721, ERC721Enumerable from OpenZeppelin and VestaDNA.sol
contract Vesta is ERC721, ERC721Enumerable, VestaDNA {
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Vesta", "V") {}

    /// @notice Function in charge of creating a new token, new tokenId
    /// @return unique token identification 
    function mint() public returns(uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        return tokenId;
    }

    /// @notice Convierte un bool a string
    /// @param _b booleano
    /// @return Yes or No
    /// @dev Inherits ERC721, ERC721Enumerable from OpenZeppelin and VestaDNA.sol
    function boolToString(bool _b) public pure returns (string memory) {
        return (_b ? 'Yes' : 'No');
    }

    /// @notice Returns a url in standard Data URL with the metadata that makes up the NFT encoded in base64
    /// @param tokenId unique token identification
    /// @return Data URL (data:application/json;base64,...)
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

        (string memory a, string memory aa, uint256 b, uint256 c, uint256 d, uint256 e, uint256 f, uint256 g, bool h, bool i, string memory j) = get_house(tokenId);

        string memory jsonURI = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name":"', "Vesta #", 
                        tokenId.toString(),
                        '","description":"', "Vesta is a property tokenization platform, represented as NFTs that live on the blockchain for easy transfer of ownership.",
                        '","image":"', a,
                        '","attributes":[{"trait_type":"Typology","value":"', aa, '"},{"trait_type": "Year built","value":"', b.toString(), '"},{"trait_type": "Square meters","value":"', c.toString(), '"},{"trait_type": "Rooms","value":"', d.toString(), '"},{"trait_type": "Bathrooms","value":"', e.toString(), '"},{"trait_type": "Levels","value":"', f.toString(), '"},{"trait_type": "Parkings","value":"', g.toString(), '"},{"trait_type": "Yard","value":"',  boolToString(h), '"},{"trait_type": "Pool","value":"',  boolToString(i), '"},{"trait_type": "Location","value":"', j, '"}]}'
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", jsonURI));
    }

    /// @notice Enumerable methods to list the tokens a user owns (Overrides required by solidity), transfer a token
    /// @param from  origin
    /// @param to destination
    /// @param tokenId unique token identification
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @notice States that in addition to being 721 it is enumerable
    /// @param interfaceId unique interface identification
    /// @return override support interface
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
